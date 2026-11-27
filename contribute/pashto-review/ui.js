'use strict';
(() => {
  const {labels,verdicts,makeNote}=globalThis.SaharReview;
  const byId=id=>document.getElementById(id);
  function el(parent,tag,text,cls){
    const node=document.createElement(tag); if(text) node.textContent=text;
    if(cls) node.className=cls; parent.appendChild(node); return node;
  }
  function field(parent,id,label,tag){
    el(parent,'label',label).htmlFor=id; const control=el(parent,tag,'','control'); control.id=id; return control;
  }
  labels.forEach((item,i)=>{
    const card=el(byId('cards'),'article'); el(card,'p','LABEL 0'+(i+1)+' / 03','kicker');
    el(card,'h3',item.en); el(card,'p',item.context);
    const sample=el(card,'div','','sample'); const word=el(sample,'p',item.ps,'ps'); word.lang='ps-AF'; word.dir='rtl';
    const row=el(card,'div','','grid'), a=el(row,'div'), b=el(row,'div');
    const select=field(a,item.id+'-verdict','Verdict for '+item.en,'select');
    [{key:'',text:'Not reviewed'},...Object.entries(verdicts).map(([key,text])=>({key,text}))].forEach(x=>{
      const opt=el(select,'option',x.text); opt.value=x.key;
    });
    const proposed=field(b,item.id+'-proposed','Proposed Pashto for '+item.en,'input');
    proposed.lang='ps-AF'; proposed.dir='rtl'; proposed.classList.add('ps'); proposed.value=item.ps;
    const reason=field(card,item.id+'-reason','Reason or English back-translation (optional)','input'); reason.dir='auto';
  });
  byId('build').onclick=()=>{
    byId('export').value='';
    try {
      const entries=Object.fromEntries(labels.map(x=>[x.id,Object.fromEntries(['verdict','proposed','reason'].map(k=>[k,byId(x.id+'-'+k).value]))]));
      byId('export').value=makeNote(entries); byId('status').textContent='Note ready. Nothing was sent.'; byId('export').focus(); byId('export').select();
    } catch(e) {byId('status').textContent=e.message;}
  };
  for(const event of ['input','change']) byId('cards').addEventListener(event,()=>{
    byId('export').value=''; byId('status').textContent='';
  });
})();
