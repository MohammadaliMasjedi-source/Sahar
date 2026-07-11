#!/usr/bin/env python3
"""
Sahar - draft TTS audio generator (tools/generate-draft-audio.py)

Generates MACHINE-VOICE DRAFT narration (the spoken `prompt` line) for every
Tier-1 card pack and the language-course pack in content/, using Microsoft
Edge neural TTS (the `edge-tts` package, v7+).

HONEST CONTRACT (read this before changing defaults):
  - These are DRAFT machine voices, not the real Mo/Neda recordings the
    project actually wants (see audio/RECORDING-MANIFEST.md).
  - fa is voiced with an Iranian-Persian neural voice (fa-IR-*). That is
    NOT the same accent as Dari (Afghan Persian). This is a deliberate,
    flagged compromise -- there is no Dari neural voice available today.
    The pack-level `audioNote` says so explicitly in fa/en/de.
  - IDEMPOTENT: a file that already exists on disk is never touched unless
    --force is passed. Mo's or Neda's real recordings win by simply
    existing at the same path -- this script will just skip them.
  - Mo's voice decision (Dilara vs Farid vs his own voice) is PENDING.
    Switching the draft voice is one command: --voice fa=fa-IR-FaridNeural
    --force (re-synthesizes every fa file with the new voice).

Usage:
  python tools/generate-draft-audio.py                       # generate all missing (fa, en, de)
  python tools/generate-draft-audio.py --dry-run              # preview the plan, write nothing
  python tools/generate-draft-audio.py --only-missing         # explicit (this is also the default)
  python tools/generate-draft-audio.py --force                # regenerate every file (e.g. after a voice switch)
  python tools/generate-draft-audio.py --voice fa=fa-IR-FaridNeural --force
  python tools/generate-draft-audio.py --langs fa              # fa only (see sw.js precache note)
  python tools/generate-draft-audio.py --packs t1-literacy-first-letters.json

Requires: pip install edge-tts   (already installed on this machine, v7.2.8)
"""
import argparse
import asyncio
import json
import sys
from pathlib import Path

# Windows terminals are often cp1252 and can't print fa/de text directly;
# never let a console-encoding quirk crash a generation run.
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

try:
    import edge_tts
except ImportError:
    print("ERROR: the 'edge-tts' python package is not installed. Run: pip install edge-tts", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / 'content'
AUDIO_DIR = ROOT / 'audio'

# Mo's voice decision is PENDING (Dilara vs Farid vs his own voice). Dilara is
# today's DRAFT default. Override per-language with --voice lang=VoiceName.
DEFAULT_VOICES = {
    'fa': 'fa-IR-DilaraNeural',   # Iranian Persian -- honestly NOT Dari, flagged in audioNote
    'en': 'en-US-AnaNeural',      # "Cartoon/Conversation, Cute" -- warm, child-appropriate
    'de': 'de-DE-KatjaNeural',    # standard warm German neural voice
}

# language-course pack l1/l2 codes -> the 2-letter voice-table key above
LC_LANG_MAP = {'fa-AF': 'fa', 'fa-IR': 'fa', 'fa': 'fa', 'en': 'en', 'de': 'de'}

RATE = '-15%'  # child-directed pace: noticeably slower than default adult TTS rate

TIER1_PACK_FILES = [
    'tier1-demo.json',
    't1-literacy-first-letters.json',
    't1-literacy-first-words.json',
    't1-numeracy-counting-0-20.json',
    't1-numeracy-shapes-patterns.json',
    't1-science-living-things.json',
    't1-science-day-and-night.json',
    't1-thinking-what-is-a-question.json',
    't1-thinking-fact-vs-guess.json',
    't1-life-healthy-and-safe.json',
]
LC_PACK_FILES = ['lc-fa-en-first-words.json']

# The one honest, standard audioNote text stamped onto every pack once its
# audio has moved from "placeholder" (nothing) to "draft" (machine voice
# exists). Deliberately names the fa accent mismatch -- never hidden.
AUDIO_NOTE_DRAFT = {
    'fa': 'این صداها یک صدای رایانه‌ای موقت هستند (گویش فارسی ایران، نه دری) '
          '— نه صدای واقعی یک انسان. صدای واقعی سحر یا ندا به زبان دری بعداً اضافه می‌شود.',
    'en': 'These voices are a temporary computer-generated (machine) voice, using an '
          'Iranian-Persian accent for fa — not Dari, and not a real human voice. '
          'Real Dari recordings, ideally in Sahar’s or Neda’s own voice, are still coming.',
    'de': 'Diese Stimmen sind vorübergehend eine computergenerierte Stimme mit '
          'iranisch-persischem Akzent (fa) — nicht Dari und keine echte menschliche Stimme. '
          'Echte Dari-Aufnahmen, idealerweise mit Sahars oder Nedas eigener Stimme, folgen noch.',
}


def parse_voice_overrides(pairs):
    voices = dict(DEFAULT_VOICES)
    for pair in pairs or []:
        if '=' not in pair:
            print(f"WARN: ignoring malformed --voice {pair!r} (expected lang=VoiceName)", file=sys.stderr)
            continue
        lang, name = pair.split('=', 1)
        voices[lang.strip()] = name.strip()
    return voices


def derive_ref(pack_id, card_id, lang):
    return f'audio/{pack_id}.{card_id}.{lang}.mp3'


async def synth(text, voice, out_path: Path, dry_run, force, stats):
    """Synthesize `text` with `voice` to out_path unless it already exists
    (idempotent -- never overwrites a real recording or a prior draft
    without --force)."""
    if out_path.exists() and not force:
        stats['skipped'] += 1
        print(f'  skip (exists)   {out_path.relative_to(ROOT).as_posix()}')
        return True
    if dry_run:
        stats['would_generate'] += 1
        preview = text[:44] + ('...' if len(text) > 44 else '')
        print(f'  WOULD GENERATE  {out_path.relative_to(ROOT).as_posix()}  [{voice}]  "{preview}"')
        return True
    out_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        communicate = edge_tts.Communicate(text, voice, rate=RATE)
        await communicate.save(str(out_path))
        size = out_path.stat().st_size
        if size == 0:
            raise RuntimeError('zero-byte output from edge-tts')
        stats['generated'] += 1
        stats['bytes'] += size
        print(f'  OK              {out_path.relative_to(ROOT).as_posix()}  ({size} bytes)  [{voice}]')
        return True
    except Exception as e:  # noqa: BLE001 - report and continue, never crash the whole batch
        stats['errors'] += 1
        print(f'  ERROR           {out_path.relative_to(ROOT).as_posix()}: {e}', file=sys.stderr)
        if out_path.exists():
            out_path.unlink()  # never leave a partial/zero-byte file behind
        return False


async def process_tier1_pack(path: Path, voices, langs_filter, force, dry_run, stats):
    pack = json.loads(path.read_text(encoding='utf-8'))
    pack_id = pack['packId']
    declared_langs = pack.get('lang', [])
    langs = [l for l in declared_langs if not langs_filter or l in langs_filter]
    changed = False
    print(f'\n=== {path.name} ({pack_id}) - {len(pack.get("cards", []))} cards x {langs} ===')

    for card in pack.get('cards', []):
        card_id = card['id']
        card.setdefault('audio', {})
        for lang in langs:
            text = (card.get('prompt') or {}).get(lang)
            if not text:
                continue
            existing_ref = card['audio'].get(lang)
            ref = existing_ref or derive_ref(pack_id, card_id, lang)
            out_path = ROOT / ref
            ok = await synth(text, voices.get(lang, voices.get(lang[:2], 'en-US-AnaNeural')), out_path, dry_run, force, stats)
            if ok and not existing_ref and (dry_run or out_path.exists()):
                card['audio'][lang] = ref
                changed = True

        # Honest state flip: once every declared language has a file on disk
        # (or we're in --dry-run planning it), this card is a machine DRAFT,
        # not a "pending" lie. Never flips in dry-run (nothing was written).
        if not dry_run:
            all_have_files = bool(langs) and all(
                card['audio'].get(l) and (ROOT / card['audio'][l]).exists() for l in langs
            )
            if all_have_files:
                if card.get('audioPending'):
                    card.pop('audioPending', None)
                    changed = True
                if not card.get('audioDraft'):
                    card['audioDraft'] = True
                    changed = True

    # Pack-level honesty stamp: once every card in the pack is a draft, the
    # pack's own audioStatus/audioNote should say so (not "placeholder", which
    # would now be a lie -- there IS audio, just not human audio yet).
    if not dry_run and pack.get('cards'):
        all_cards_draft = all(c.get('audioDraft') is True for c in pack['cards'])
        if all_cards_draft and pack.get('audioStatus') != 'draft':
            pack['audioStatus'] = 'draft'
            pack['audioNote'] = dict(AUDIO_NOTE_DRAFT)
            changed = True

    if changed and not dry_run:
        path.write_text(json.dumps(pack, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        print(f'  updated {path.name} (audio refs / audioDraft / audioStatus written)')


async def process_lc_pack(path: Path, voices, langs_filter, force, dry_run, stats):
    pack = json.loads(path.read_text(encoding='utf-8'))
    l1_lang = LC_LANG_MAP.get(pack.get('l1'), 'fa')
    l2_lang = LC_LANG_MAP.get(pack.get('l2'), 'en')
    print(f'\n=== {path.name} ({pack.get("packId")}) - {len(pack.get("items", []))} items ===')
    changed = False

    for item in pack.get('items', []):
        for side, lang in (('l1', l1_lang), ('l2', l2_lang)):
            if langs_filter and lang not in langs_filter:
                continue
            entry = item.get(side)
            if not entry or not entry.get('audio') or not entry.get('text'):
                continue
            out_path = ROOT / entry['audio']
            await synth(entry['text'], voices.get(lang, 'en-US-AnaNeural'), out_path, dry_run, force, stats)

    if not dry_run and pack.get('items'):
        all_have = all(
            (ROOT / it['l1']['audio']).exists() and (ROOT / it['l2']['audio']).exists()
            for it in pack['items'] if it.get('l1', {}).get('audio') and it.get('l2', {}).get('audio')
        )
        if all_have and pack.get('audioStatus') != 'draft':
            pack['audioStatus'] = 'draft'
            pack['audioNote'] = dict(AUDIO_NOTE_DRAFT)
            changed = True

    if changed and not dry_run:
        path.write_text(json.dumps(pack, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        print(f'  updated {path.name} (audioStatus/audioNote written)')


async def main_async(args):
    voices = parse_voice_overrides(args.voice)
    langs_filter = set(x.strip() for x in args.langs.split(',')) if args.langs else None
    packs_filter = set(x.strip() for x in args.packs.split(',')) if args.packs else None
    stats = {'generated': 0, 'skipped': 0, 'errors': 0, 'would_generate': 0, 'bytes': 0}

    for fname in TIER1_PACK_FILES:
        if packs_filter and fname not in packs_filter:
            continue
        await process_tier1_pack(CONTENT_DIR / fname, voices, langs_filter, args.force, args.dry_run, stats)

    for fname in LC_PACK_FILES:
        if packs_filter and fname not in packs_filter:
            continue
        await process_lc_pack(CONTENT_DIR / fname, voices, langs_filter, args.force, args.dry_run, stats)

    print('\n--- summary ---')
    print(json.dumps(stats, indent=2))
    if AUDIO_DIR.exists():
        mp3_paths = sorted(f.relative_to(ROOT).as_posix() for f in AUDIO_DIR.rglob('*.mp3'))
        total_mb = sum((ROOT / p).stat().st_size for p in mp3_paths) / (1024 * 1024)
        print(f'audio/ now holds {len(mp3_paths)} mp3 file(s), {total_mb:.2f} MB total')
        if not args.dry_run:
            # sw.js reads this at install time to precache every audio file that
            # exists today -- no hand-maintained file list to fall out of sync.
            manifest_path = AUDIO_DIR / 'audio-manifest.json'
            manifest_path.write_text(json.dumps(mp3_paths, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
            print(f'wrote {manifest_path.relative_to(ROOT).as_posix()} ({len(mp3_paths)} entries) for sw.js precache')
    if stats['errors']:
        print(f"\n{stats['errors']} file(s) failed to generate -- see ERROR lines above.", file=sys.stderr)
        sys.exit(1)


def main():
    ap = argparse.ArgumentParser(description='Sahar draft TTS audio generator (edge-tts)', formatter_class=argparse.RawDescriptionHelpFormatter, epilog=__doc__)
    ap.add_argument('--voice', action='append', metavar='lang=VoiceName',
                     help='override the draft voice for a language, e.g. fa=fa-IR-FaridNeural (repeatable)')
    ap.add_argument('--only-missing', action='store_true', default=True,
                     help='(default) skip any file that already exists on disk')
    ap.add_argument('--force', action='store_true',
                     help='regenerate every file even if it exists (e.g. re-run after a voice decision). '
                          'Safe today because every existing file is a machine draft this script made; '
                          'it is NOT safe to combine with real Mo/Neda recordings already in place.')
    ap.add_argument('--dry-run', action='store_true', help='print the plan, write nothing')
    ap.add_argument('--langs', help='comma-separated language filter, e.g. fa,en')
    ap.add_argument('--packs', help='comma-separated content/*.json filenames to limit the run to')
    args = ap.parse_args()
    asyncio.run(main_async(args))


if __name__ == '__main__':
    main()
