'use strict';
const {test}=require('node:test'), assert=require('node:assert/strict');
const {readFileSync}=require('node:fs'), {join}=require('node:path');
const {labels,makeNote}=require('../contribute/pashto-review/review.js');
const read=rel=>readFileSync(join(__dirname,'..',rel),'utf8');
test('fixture keys and source labels still describe the real English controls',()=>{
  const en=read('bootstrap.js').match(/const BSTRINGS = \{[\s\S]*?\n  en: \{([\s\S]*?)\n  \}/)[1];
  assert.equal(new Set(labels.map(x=>x.id)).size,3);
  for(const x of labels) {
    assert.equal(en.match(new RegExp('^    '+x.id+": '([^']+)'",'m'))?.[1],x.en);
    assert.match(x.ps,/\p{Script=Arabic}/u);
  }
});
test('export one reviewed item, distinguish proposed change, omit skipped items',()=>{
  const note=makeNote({again:{verdict:'change',proposed:'نوې بڼه',reason:'proposed'}, listen:{verdict:'bogus'}});
  assert.match(note,/again — Hear again.*نوې بڼه/); assert.doesNotMatch(note,/home —|listen —/);
  assert.match(makeNote({home:{verdict:'unsure',reason:'house?'}}),/Needs another opinion.*house\?/);
  assert.match(makeNote({listen:{verdict:'keep'}}),/Keep wording/);
});
test('empty or inconsistent decisions cannot produce a misleading note',()=>{
  assert.throws(()=>makeNote({}),/Choose a verdict/);
  for(const proposed of ['','  ',labels[0].ps]) assert.throws(()=>makeNote({home:{verdict:'change',proposed}}),/different proposed wording/);
  assert.throws(()=>makeNote({home:{verdict:'keep',proposed:'different'}}),/select “Suggest a change”/);
});
test('review pilot is absent from app shells, offline cache list and packs manifest',()=>{
  for(const file of ['index.html','bootstrap.html','teacher.html','app.js','bootstrap.js','sw.js','manifest.webmanifest','content/packs.manifest.json'])
    assert.doesNotMatch(read(file),/pashto-review|SaharReview/,file);
});
