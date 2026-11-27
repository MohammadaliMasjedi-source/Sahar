/* Adult contributor fixtures ONLY. These strings are not part of the shipped locale. */
'use strict';
(() => {
  const labels = [
    {id:'home', en:'Home', ps:'کور', context:'Leave this practice screen and return to the app’s main screen. Would this sound like a building rather than an action?'},
    {id:'listen', en:'Listen', ps:'واوره', context:'Play a prompt for the first time. Check that the tone sounds natural as a short control label.'},
    {id:'again', en:'Hear again', ps:'بیا یې واوره', context:'Replay the same audio. This does not restart the exercise or mark a response wrong.'}
  ];
  const verdicts = {keep:'Keep wording', change:'Suggest a change', unsure:'Needs another opinion'};
  function makeNote(entries) {
    const lines = [];
    for (const item of labels) {
      const entry = entries[item.id];
      if (!entry || !Object.hasOwn(verdicts, entry.verdict)) continue;
      const proposed = (entry.proposed || '').trim(), reason = (entry.reason || '').trim();
      if (entry.verdict === 'change' && (!proposed || proposed === item.ps))
        throw Error('Enter a different proposed wording for “' + item.en + '”, or choose another verdict.');
      if (entry.verdict !== 'change' && proposed && proposed !== item.ps)
        throw Error('For “' + item.en + '”, select “Suggest a change” to include the edited wording.');
      lines.push(item.id + ' — ' + item.en + ' | draft: ' + item.ps + ' | ' + verdicts[entry.verdict] +
        (entry.verdict === 'change' ? ' | proposed: ' + proposed : '') + (reason ? ' | note: ' + reason : ''));
    }
    if (!lines.length) throw Error('Choose a verdict for at least one label.');
    return ['Sahar / Afghan Pashto (ps-AF) / adult review only', ...lines, 'This is feedback, not approval to release.'].join('\n');
  }
  const api={labels,verdicts,makeNote};
  if (typeof module !== 'undefined' && module.exports) module.exports=api;
  else globalThis.SaharReview=api;
})();
