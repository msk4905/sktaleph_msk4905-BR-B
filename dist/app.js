'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='prompt-lab-v1';
let saved={cases:{},draft:null}, storageOK=true;
function validateStoredState(v){
 const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
 if(!object(v)||!object(v.cases))throw Error('저장 기록 형식 오류');
 for(const c of Object.values(v.cases))if(!object(c)||typeof c.title!=='string'||typeof c.reflection!=='string')throw Error('비교 기록 형식 오류');
 if(v.draft!==undefined&&v.draft!==null){if(!object(v.draft)||['task','reason','example','template','strategy'].some(k=>v.draft[k]!==undefined&&typeof v.draft[k]!=='string'))throw Error('연습 기록 형식 오류');}
 if(v.learningArchives!==undefined&&(!Array.isArray(v.learningArchives)||v.learningArchives.some(a=>!object(a))))throw Error('이전 과정 기록 형식 오류');
 if(v.recoveryBackups!==undefined&&(!Array.isArray(v.recoveryBackups)||v.recoveryBackups.some(a=>!object(a)||typeof a.raw!=='string'||typeof a.at!=='string')))throw Error('복구 원본 형식 오류');
 if(v.learningV3!==undefined){if(!object(v.learningV3)||typeof v.learningV3.version!=='string')throw Error('학습 기록 형식 오류');if(v.learningV3.version===LEARNING_VERSION)v.learningV3=validateLearningBackup({schema:'prompt-lab-backup-3',state:v});}
 return v;
}
let originalStoredText=null;
try{originalStoredText=localStorage.getItem(KEY);if(originalStoredText!==null)saved=validateStoredState(JSON.parse(originalStoredText));}
catch(e){storageOK=false;if(originalStoredText!==null)saved={cases:{},draft:null,recoveryBackups:[{at:new Date().toISOString(),raw:originalStoredText}]};}

let page='course',current=0,stage=0,prediction='',guesses=[[],[]],shown=false;
function notify(t){$('#toast').textContent=t;$('#toast').style.display='block';clearTimeout(notify.timer);notify.timer=setTimeout(()=>$('#toast').style.display='none',Math.max(6000,String(t).length*85));}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(saved));storageOK=true;return true;}catch(e){storageOK=false;notify('이 브라우저에 저장하지 못했습니다. 학습 기록을 파일로 내려받아 보관해 주세요.');return false;}}
function download(name,text,type='text/plain;charset=utf-8'){const u=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),2000);}
function analyze(text,original=false){
 const raw=String(text||'').replace(/\r\n?/g,'\n'),marks=/^[▶■#\-※]/,end=/[.!?]['")\]]*$/;
 const clean=l=>l.trim().replace(/\*\*/g,'');
 let uncertain=false;
 const split=l=>{
   let v=clean(l);if(!v||marks.test(v))return [];
   if(!original)v=v.replace(/(^|\s)([QA])\.\s*/g,'$1$2: ');
   if(!end.test(v)){if(!original)uncertain=true;return [];}
   return v.split(/(?<=[.!?])\s+/).filter(x=>x.trim());
 };
 const blocks=raw.trim().split(/\n\s*\n/).map(b=>b.split('\n').flatMap(split)).filter(b=>b.length);
 const sentences=blocks.flat();
 const headers=raw.split('\n').filter(l=>clean(l).replace(/^[-*•· ]+/,'').startsWith('▶')).length;
 const strip=s=>s.replace(/[.!?'")\]\s]+$/g,'');
 const flags=[headers===4,blocks.length===4,!!blocks[0]&&blocks[0].length===2,(raw.match(/!/g)||[]).length===1,blocks.length>0&&blocks.every(b=>b.length>=2&&b.length<=4),sentences.length>=10&&sentences.length<=14,sentences.length>0&&sentences.every(s=>strip(s).endsWith('요')),!!sentences[0]&&Array.from(sentences[0]).length<=20];
 if(!original&&uncertain)[1,2,4,5,6,7].forEach(i=>flags[i]=null);
 return {flags,headers,blocks:blocks.length,sentences:sentences.length,firstLength:sentences[0]?Array.from(sentences[0]).length:0,uncertain};
}
function hero(kicker,title,description){return `<section class="hero"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p class="muted">${description}</p></div></section>`;}
function render(){
 document.querySelectorAll('[data-page]').forEach(b=>{const active=b.dataset.page===page;b.classList.toggle('active',active);if(active)b.setAttribute?.('aria-current','page');else b.removeAttribute?.('aria-current');});$('#practice-trigger')?.classList.toggle('active',['lab','editor','experiment','records'].includes(page));
 if(page==='experiment')renderExperiment();if(page==='course')renderCourse();if(page==='assessment')renderAssessment();if(page==='lab')renderLab();if(page==='editor')renderEditor();if(page==='records')renderRecords();if(typeof syncNavigation==='function')syncNavigation();
}
let restoringRoute=false;
const PAGE_LABELS={course:'학습 과정',assessment:'배움 확인',lab:'응답 비교',editor:'빈 틀 연습',experiment:'나의 실험',records:'비교와 연습 기록'};
function routeForView(){
 if(page==='course'&&typeof lessonIndex!=='undefined'&&lessonIndex>=0)return '#/course/'+(lessonIndex+1)+'/'+(lessonSummary?'summary':lessonStep);
 if(page==='assessment'&&typeof examView!=='undefined'&&examView)return '#/assessment/'+examView+'/'+examStep;
 return '#/'+page;
}
function syncNavigation(){
 const title=page==='course'&&typeof lessonIndex!=='undefined'&&lessonIndex>=0?(lessonIndex+1)+'차시 · '+COURSE[lessonIndex].title:PAGE_LABELS[page];document.title=(title||'학습 과정')+' | 프롬프트 실험실';
 if(restoringRoute||!window.history?.pushState)return;
 const next=routeForView();if((window.location?.hash||'')!==next)window.history.pushState(null,'',next);
}
function go(p){
 if(!Object.hasOwn(PAGE_LABELS,p))p='course';
 if(p==='course'&&typeof lessonIndex!=='undefined'){lessonIndex=-1;lessonSummary=false;}
 if(p==='assessment'&&typeof examView!=='undefined')examView=null;
 if(typeof logLearning==='function'&&['lab','editor','experiment'].includes(p))logLearning('reference-open',{page:p});
 page=p;const menu=$('#practice-menu');if(menu)menu.open=false;render();window.scrollTo({top:0,behavior:'instant'});$('#main').focus();
}
function applyNavigationRoute(){
 const hash=window.location?.hash||'';restoringRoute=true;
 try{
 const lesson=hash.match(/^#\/course\/([1-8])\/(summary|[0-4])$/),exam=hash.match(/^#\/assessment\/(pre|post|delayed)\/([0-6])$/),simple=hash.match(/^#\/(course|assessment|lab|editor|experiment|records)$/);
 if(lesson&&typeof launchLesson==='function'){
  const i=Number(lesson[1])-1;launchLesson(i);const r=lessonRecord(i);lessonSummary=lesson[2]==='summary'&&!!r.completed;lessonStep=lesson[2]==='summary'?r.step:Number(lesson[2]);r.step=lessonStep;persist();renderCourse();
 }else if(exam&&typeof beginExam==='function'){
  examView=null;beginExam(exam[1]);if(examView){examStep=Number(exam[2]);learningState().assessments[examView].step=examStep;persist();renderExam();}else{page='assessment';render();}
 }else go(simple?simple[1]:'course');
 }finally{restoringRoute=false;if(window.history?.replaceState)window.history.replaceState(null,'',routeForView());}
}
function initializeNavigation(){
 if(window.addEventListener){const restore=()=>{if((window.location?.hash||'')===routeForView())return;applyNavigationRoute();};window.addEventListener('popstate',restore);window.addEventListener('hashchange',restore);}
 document.addEventListener?.('click',ev=>{const menu=$('#practice-menu');if(menu?.open&&!menu.contains(ev.target))menu.open=false;});
 document.addEventListener?.('keydown',ev=>{if(ev.key==='Escape'){const menu=$('#practice-menu');if(menu?.open){menu.open=false;$('#practice-trigger').focus();}}});
 const skip=$('.skip');if(skip)skip.onclick=ev=>{ev.preventDefault();$('#main').focus();};
 if(window.location?.hash)applyNavigationRoute();else{restoringRoute=true;render();restoringRoute=false;if(window.history?.replaceState)window.history.replaceState(null,'',routeForView());}
}

function labRecordsInner(){const list=Object.values(saved.cases||{});return `<h2>내 비교 기록</h2>${list.length?list.map(r=>`<article class="result"><h3>사례 ${esc(r.id)} · ${esc(r.title)}</h3><small>${r.found!==undefined?'어긴 조건 '+esc(r.violations)+'개 중 '+esc(r.found)+'개 찾음':'이전 버전의 기록'}</small><p style="white-space:pre-wrap">${esc(r.reflection)}</p></article>`).join(''):'<p class="note">사례를 비교한 뒤 남긴 생각이 여기에 모입니다.</p>'}<p class="note">이 기록은 첫 화면의 ‘전체 기록 백업’에 함께 들어갑니다.</p>`;}
function renderLab(){const c=DATA.cases[current];
 $('#main').innerHTML=hero('응답 비교','예시를 더하면 답도 달라질까요?','논문 실험에서 같은 과제를 서로 다른 방식으로 요청해 받은 실제 응답 두 개를 비교해 봅니다. 각 응답이 어떤 조건을 지켰고 무엇을 놓쳤는지 직접 찾아보세요.')+
 `<div class="steps"><span>01 예상하기</span><span>02 비교하기</span><span>03 적용하기</span></div><div class="layout"><aside class="side" aria-label="사례 선택">${DATA.cases.map((x,i)=>`<button class="case ${i===current?'active':''}" data-case="${i}" aria-current="${i===current?'step':'false'}"><b>0${i+1}</b><span>${esc(x.taskName)}<small>${esc(x.items[0].name)} ↔ ${esc(x.items[1].name)}${saved.cases[x.id]?' · 기록됨':''}</small></span></button>`).join('')}</aside><section><div class="card"><span class="tag">사례 ${c.id}</span><span class="tag">${esc(c.items[0].model)}</span><h2>${esc(c.taskName)}</h2><p>${esc(c.intro)}</p><details><summary>두 요청에 공통으로 넣은 조건 8개 보기</summary><ol>${DATA.rules.map(r=>`<li>${esc(r)}</li>`).join('')}</ol></details><div class="pair">${c.items.map((x,i)=>`<div><h3>${i?'B':'A'} · ${esc(x.name)}</h3><details><summary>보낸 프롬프트 보기</summary><pre class="prompt">${esc(x.prompt)}</pre></details></div>`).join('')}</div><h3>어느 응답이 조건을 더 많이 지킬까요?</h3><div class="choices">${[['A','A가 더 많이 지킬 것이다'],['same','비슷하게 지킬 것이다'],['B','B가 더 많이 지킬 것이다']].map(([v,t])=>`<label><input type="radio" name="prediction" value="${v}" ${prediction===v?'checked':''}> ${t}</label>`).join('')}</div><p class="note">부담 없이 예상해 보세요. 예상에는 점수를 매기지 않습니다.</p><div class="actions"><button class="primary" id="reveal">응답 열고 비교하기</button></div></div><div id="comparison"></div></section></div><section class="card" id="lab-records">${labRecordsInner()}</section>`;
 document.querySelectorAll('[data-case]').forEach(b=>b.onclick=()=>{current=+b.dataset.case;stage=0;prediction='';guesses=[[],[]];shown=false;renderLab();});
 document.querySelectorAll('[name=prediction]').forEach(r=>r.onchange=()=>{prediction=r.value;});
 $('#reveal').onclick=()=>{if(!prediction){notify('먼저 예상 하나를 선택해 주세요.');return;}stage=1;renderComparison();$('#comparison').scrollIntoView({behavior:'instant',block:'start'});};
 if(current===0&&!stage){const hint=document.createElement('div');hint.className='guide';hint.innerHTML='<strong>처음이라면 이렇게 시작해 보세요</strong><p>① 공통 조건 8개를 펼쳐 읽습니다. ② A와 B의 프롬프트에서 다른 부분을 찾습니다. ③ 결과를 예상한 뒤 실제 응답을 엽니다.</p>';$('#comparison').before(hint);} if(stage)renderComparison();
}
function renderComparison(){const c=DATA.cases[current];
 $('#comparison').innerHTML=`<div class="section-title"><h2>응답이 어긴 조건을 찾아보세요</h2></div><p class="note">A와 B를 각각 읽고, 지키지 않은 조건에만 체크하세요. 모두 지켰다면 아무것도 체크하지 않아도 됩니다. 아래 ‘검사 결과와 비교’를 누르면 내 판단과 앱의 판정을 함께 볼 수 있습니다.</p><div class="pair">${c.items.map((x,j)=>`<article class="card"><h3>${j?'B':'A'} · ${esc(x.name)}</h3><div class="response">${esc(x.response)}</div><div class="checklist">${DATA.rules.map((r,i)=>`<label class="rule"><input type="checkbox" data-side="${j}" data-rule="${i}" ${guesses[j].includes(i)?'checked':''} ${shown?'disabled':''}><span>${i+1}. ${esc(r)}</span></label>`).join('')}</div></article>`).join('')}</div><div class="actions"><button class="primary" id="check">${shown?'판정 다시 보기':'검사 결과와 비교'}</button></div><div id="feedback"></div>`;
 document.querySelectorAll('[data-rule]').forEach(b=>b.onchange=()=>{const j=+b.dataset.side,i=+b.dataset.rule;guesses[j]=b.checked?[...guesses[j],i]:guesses[j].filter(x=>x!==i);});
 $('#check').onclick=()=>{shown=true;renderComparison();$('#feedback').scrollIntoView({behavior:'instant',block:'start'});};if(shown)renderFeedback();
}
function renderFeedback(){const c=DATA.cases[current];let correct=0,total=0;let found=0,violations=0,falseAlarms=0; c.items.forEach((x,j)=>analyze(x.response).flags.forEach((f,i)=>{if(f===false){violations++;if(guesses[j].includes(i))found++;}if(f===true&&guesses[j].includes(i))falseAlarms++;}));
 const rows=DATA.rules.map((r,i)=>{const cells=c.items.map((x,j)=>{const f=analyze(x.response).flags[i];if(f!==null){total++;if(guesses[j].includes(i)===!f)correct++;}const diff=f!==null&&f!==x.checks[i];return `<td class="${f===null?'':f?'good':'bad'}">${f===null?'확인 필요':f?'지킴':'어김'}${diff?'<br><small>논문 채점과 다름</small>':''}<br><small>내 판단: ${guesses[j].includes(i)?'어김':'지킴'}</small></td>`;});return `<tr><td>${i+1}. ${esc(r)}</td>${cells.join('')}</tr>`;}).join('');
 $('#feedback').innerHTML=`<div class="card"><span class="eyebrow">내 답과 실험 결과 비교하기</span><h2>${esc(c.title)}</h2><p>${esc(c.lesson)}</p><div class="result"><strong>어긴 조건 ${violations}개 가운데 ${found}개를 찾았습니다. 지킨 조건을 어겼다고 잘못 표시한 것은 ${falseAlarms}개입니다.</strong><p class="note">앱의 판정을 기준으로 계산한 결과이며, 학습 성적에는 포함되지 않습니다.</p></div><div class="tablewrap"><table><thead><tr><th>조건 (앱의 판정)</th><th>A</th><th>B</th></tr></thead><tbody>${rows}</tbody></table></div><details><summary>논문의 채점과 앱의 판정 기준</summary><p>논문의 채점에서 지킨 조건은 A ${c.items[0].checks.filter(Boolean).length}개, B ${c.items[1].checks.filter(Boolean).length}개입니다(8개 중). 아래 집계도 논문의 채점을 기준으로 합니다.</p><p>앱은 ‘▶’로 시작하는 소제목 줄을 문장으로 세지 않고, ‘Q.’와 ‘A.’의 마침표도 문장의 끝으로 보지 않습니다. 이 기준으로 검사하면 앱에 실린 응답 12개 모두 논문의 채점과 같은 판정이 나옵니다. 마침표나 물음표, 느낌표 없이 끝나는 문단이 있으면 관련 조건을 ‘확인 필요’로 표시합니다. 해요체는 문장 끝이 ‘요’인지만 검사하며, 내용의 의미나 사실 여부는 판단하지 않습니다.</p><p class="note">앱의 검사만으로 모든 한국어 문장을 정확하게 나눌 수는 없습니다. 인용문이나 약어가 섞인 복잡한 표현은 직접 읽고 확인해 주세요.</p></details><h3>전체 실험의 결과</h3><div class="pair">${c.aggregate.map(r=>`<div class="result"><small>${esc(condLabel(r['조건명']))}, 응답 ${esc(r['짝 수'])}쌍</small><div class="score">${esc(r['준수율(%)'])}%</div><small>전체 실험의 평균 규칙 준수율</small><div class="bar"><i style="width:${Number(r['준수율(%)'])}%"></i></div></div>`).join('')}</div><p class="note">이 사례는 두 방식의 차이가 잘 드러나도록 고른 것입니다.</p><details><summary>자료 출처</summary><p class="source">${esc(c.source)} · ${esc(c.task)}<br>${esc(c.aggregateSource)}</p></details><label class="field" for="reflection">다음에 무엇을 다르게 하겠나요?</label><textarea id="reflection" maxlength="3000" placeholder="예: 예시를 붙이기 전에, 예시의 말투가 지시와 맞는지 확인하겠습니다.">${esc(saved.cases[c.id]?.reflection||'')}</textarea><div class="actions"><button class="primary" id="savecase">이 비교 기록 저장</button><button id="apply">나의 실험에서 직접 비교하기 →</button>${current<5?'<button id="next">다음 사례</button>':''}</div></div>`;
 $('#savecase').onclick=()=>{const reflection=$('#reflection').value.trim();if(!reflection){notify('관찰하거나 바꿀 점을 한 줄 적어 주세요.');return;}saved.cases[c.id]={id:c.id,title:c.title,prediction,guesses:guesses.map(a=>[...a]),correct,total,found,violations,falseAlarms,reflection,date:new Date().toISOString()};if(persist())notify('비교 기록을 저장했습니다.');const box=$('#lab-records');if(box)box.innerHTML=labRecordsInner();};
 $('#apply').onclick=()=>go('experiment');if($('#next'))$('#next').onclick=()=>{current++;stage=0;shown=false;prediction='';guesses=[[],[]];renderLab();window.scrollTo(0,0);};
}
function renderEditor(){const d=saved.draft||{};
 $('#main').innerHTML=hero('빈 틀 연습','원하는 형식을 빈 틀로 보여 주세요.','논문 실험에 쓰인 형식 조건 8개를 지키는 초대문 프롬프트를 만들어 봅니다. 조건을 말로 적는 데 그치지 않고, 문단과 문장의 배치를 빈 틀로 직접 보여 주는 연습입니다.')+`<div class="pair"><section class="card"><span class="tag">연습 과제</span><h2>동네 수리 모임 초대문</h2><p>토요일 오후 2시에 마을회관에서 소형 가전 수리 모임을 엽니다. 참가비는 없으며, 참가자는 고장 난 물건을 1개 가져와야 합니다. 아래 형식 조건 8개를 지키는 프롬프트를 준비해 보세요.</p><details><summary>형식 조건 8개</summary><ol>${DATA.rules.map(r=>`<li>${esc(r)}</li>`).join('')}</ol></details><label class="field" for="task">과제 설명</label><textarea id="task" maxlength="6000">${esc(d.task||'토요일 오후 2시 마을회관에서 열리는 무료 가전 수리 모임의 초대문을 써 줘. 고장 난 물건 1개를 가져오도록 안내해 줘.')}</textarea><h3>문단별 문장 수</h3><p class="note">문단 4개에 들어갈 문장 수를 정해 보세요. 첫 문단은 2문장, 모든 문단은 2~4문장, 전체는 10~14문장이어야 합니다.</p><div class="row">${[2,3,3,2].map((v,i)=>`<div><label class="field" for="n${i}">${i+1}번째 문단</label><input id="n${i}" type="number" min="1" max="8" value="${v}"></div>`).join('')}</div><div class="actions"><button id="make">빈 틀 만들기</button></div><label class="field" for="template">빈 틀 (직접 고칠 수 있습니다)</label><textarea id="template" class="large" maxlength="12000">${esc(d.template||'')}</textarea><div class="actions"><button id="inspect">빈 틀 점검</button></div><div id="inspection" role="status"></div></section><section class="card"><h2>예시가 조건과 어긋나지 않게 고쳐 보세요</h2><p>초대문은 해요체로 써야 합니다. 아래 예시 문장도 같은 말투인지 살펴보고, 어긋나는 부분을 고쳐 보세요.</p><label class="field" for="example">예시 문장</label><textarea id="example" maxlength="3000">${esc(d.example||'토요일에 모임을 엽니다. 고장 난 물건을 가져오십시오.')}</textarea><label class="field" for="strategy">고른 전달 방식</label><select id="strategy"><option value="skeleton">빈 틀 더하기</option><option value="example">고친 예시와 빈 틀 더하기</option><option value="plain">지시만 쓰기</option></select><label class="field" for="reason">이 방법을 고른 이유와 놓칠 수 있는 조건</label><textarea id="reason" maxlength="3000" placeholder="왜 이 방법을 골랐나요? 그래도 AI가 놓칠 수 있는 조건이 있나요?">${esc(d.reason||'')}</textarea><div class="actions"><button class="primary" id="compose">프롬프트 만들기</button><button id="savedraft">연습 저장</button></div><div id="draftfeedback" role="status"></div><label class="field" for="output">완성된 프롬프트 (AI의 응답이 아닙니다)</label><textarea id="output" class="large" readonly placeholder="‘프롬프트 만들기’를 누르면 여기에 표시됩니다."></textarea><div class="actions"><button id="exportprompt">프롬프트를 TXT로 내려받기</button></div><p class="note">이 화면은 AI에게 보낼 프롬프트를 만드는 곳입니다. 이 프롬프트로 받은 응답은 ‘나의 실험’에 붙여 넣어 검사할 수 있습니다. 서버에 API를 설정했다면 그 화면에서 직접 실행할 수도 있습니다(유료).</p></section></div>`;
 $('#strategy').value=d.strategy||'skeleton';
 const make=()=>{const ns=[0,1,2,3].map(i=>Number($('#n'+i).value));if(ns.some(n=>!Number.isInteger(n)||n<1||n>8)){notify('문단마다 넣을 문장 수를 1~8 사이의 정수로 입력해 주세요.');return;}$('#template').value=ns.map((n,i)=>'▶ [소제목 '+(i+1)+']\n'+Array.from({length:n},(_,j)=>`[${i+1}-${j+1} 문장]${i===2&&j===1?'!':'.'}`).join(' ')).join('\n\n');};
 if(!d.template)make();$('#make').onclick=make;
 function inspect(){const t=$('#template').value;const a=analyze(t);const flags=a.flags.slice(0,6);$('#inspection').innerHTML=`<div class="result">${flags.map((v,i)=>`<div>${i+1}. ${esc(DATA.rules[i])}: <strong>${v===null?'확인 필요':v?'맞음':'고쳐야 함'}</strong></div>`).join('')}<p class="note">빈 틀에는 아직 실제 문장이 없으므로, 여기서는 배치만 검사합니다. 내용을 채운 뒤에는 말투와 첫 문장 길이, 원래 정보가 바뀌지 않았는지도 확인해 주세요.</p></div>`;return flags;}
 $('#inspect').onclick=inspect;
 const read=()=>({task:$('#task').value.trim(),template:$('#template').value.trim(),example:$('#example').value.trim(),reason:$('#reason').value.trim(),strategy:$('#strategy').value,date:new Date().toISOString()});
 $('#compose').onclick=()=>{const v=read();if(!v.task){notify('과제 설명을 입력해 주세요.');return;}if(v.strategy!=='plain'&&!v.template){notify('빈 틀을 입력해 주세요.');return;}if(v.strategy==='example'&&!v.example){notify('고친 예시를 입력해 주세요.');return;}
 const conflict=/(합니다|엽니다|십시오|습니다|입니다)/.test(v.example);const f=inspect();
 $('#draftfeedback').innerHTML=`<div class="result ${v.strategy==='example'&&conflict?'warning':''}">${v.strategy==='example'&&conflict?'예시에 합니다체 표현이 남아 있습니다. 해요체로 써 달라는 조건과 어긋나므로 고쳐 주세요.':v.strategy==='example'?'예시에서 합니다체 표현을 찾지 못했습니다. 다만 자동 검사가 놓친 표현이 있을 수 있으니 직접 읽고 확인해 주세요.':'지금 고른 방식에서는 예시 문장을 프롬프트에 넣지 않았습니다.'}<p>${v.strategy!=='plain'&&f.some(x=>x!==true)?'빈 틀에 고치거나 확인할 항목이 있습니다. 빈 틀 점검 결과를 확인해 주세요.':'프롬프트에 조건을 모두 담았습니다. AI의 답을 받은 뒤에도 조건을 지켰는지 확인해 주세요.'}</p></div>`;
 $('#output').value=v.task+'\n\n조건:\n'+DATA.rules.map((r,i)=>(i+1)+'. '+r).join('\n')+(v.strategy!=='plain'?'\n\n빈 틀(대괄호 안을 실제 내용으로 채워 줘):\n'+v.template:'')+(v.strategy==='example'?'\n\n말투 참고 예시(말투만 참고하고, 내용과 구조는 따르지 마):\n'+v.example:'');};
 $('#savedraft').onclick=()=>{const v=read();if(!v.task||!v.reason){notify('과제 설명과 고른 이유를 입력해 주세요.');return;}saved.draft=v;if(persist())notify('빈 틀 연습을 저장했습니다.');};
 $('#exportprompt').onclick=()=>{if(!$('#output').value){notify('먼저 프롬프트를 만들어 주세요.');return;}download('prompt-draft.txt',$('#output').value);};
}
function renderRecords(){const records=Object.values(saved.cases);$('#main').innerHTML=hero('비교와 연습 기록','예상이 어떻게 바뀌었나요?','응답을 비교하며 남긴 생각과 빈 틀 연습의 초안을 모았습니다. 차시별 답안은 ‘학습 과정’, 평가 결과는 ‘배움 확인’에서 볼 수 있습니다. 직접 가져온 응답과 API 실험 기록은 ‘나의 실험’에 있습니다.')+`<div class="card"><div class="section-title"><h2>응답 비교 기록 (사례 6개 중 ${records.length}개)</h2><div class="actions"><button id="exportrecords">전체 기록 JSON 내려받기</button><button id="clear">비교와 연습 기록 지우기</button></div></div><p class="note">${storageOK?'이 브라우저에 저장됩니다. 다른 기기와 동기화되지 않습니다.':'이 브라우저에 저장하지 못해서, 화면을 닫으면 기록이 사라질 수 있습니다. 파일로 내려받아 보관해 주세요.'}</p>${records.length?records.map(r=>`<article class="result"><h3>0${esc(r.id)} · ${esc(r.title)}</h3><small>예상: ${esc(({A:"A가 더 많이 지킬 것이다",B:"B가 더 많이 지킬 것이다",same:"비슷하게 지킬 것이다"})[r.prediction]||"예상 기록 없음")} · ${r.found!==undefined?'어긴 조건 '+esc(r.violations)+'개 중 '+esc(r.found)+'개 찾음, 잘못 표시 '+esc(r.falseAlarms)+'개':'이전 버전의 기록'}</small><p style="white-space:pre-wrap">${esc(r.reflection)}</p></article>`).join(''):'<div class="empty">아직 저장한 기록이 없습니다.<br>응답 비교를 마친 뒤 관찰을 한 줄 남겨 보세요.</div>'}</div>${saved.draft?`<div class="card"><h2>빈 틀 연습 기록</h2><p>${esc(saved.draft.task)}</p><p><strong>고른 이유</strong><br>${esc(saved.draft.reason)}</p><button id="editdraft">이어서 고치기</button></div>`:''}`;
 $('#exportrecords').onclick=()=>download('prompt-lab-records.json',JSON.stringify({schema:'prompt-lab-backup-3',exported:new Date().toISOString(),state:saved},null,2),'application/json');$('#clear').onclick=()=>{if(confirm('응답 비교 기록과 빈 틀 연습의 초안만 지웁니다. 학습, 평가, 실험 기록은 그대로 남습니다. 지울까요?')){saved={...saved,cases:{},draft:null};persist();renderRecords();}};if($('#editdraft'))$('#editdraft').onclick=()=>go('editor');}
document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>go(b.dataset.page));
$('.brand').onclick=e=>{e.preventDefault();go('course');};
initializeNavigation();

// First-run guide: native dialog provides focus containment and Escape handling.
let onboardStep=0, onboardAnswer=null, onboardReturnFocus=null;
function openOnboarding(){
 onboardStep=0;onboardAnswer=null;onboardReturnFocus=document.activeElement;
 drawOnboarding();$('#onboarding').showModal();$('#onboard-title').focus();
}
function closeOnboarding(){
 saved.onboardingVersion=4;persist();$('#onboarding').close();
 if(onboardReturnFocus&&typeof onboardReturnFocus.focus==='function')onboardReturnFocus.focus();
}
function drawOnboarding(){
 const titles=['AI가 쓴 답, 그대로 써도 될까요?','바꿀 것, 남길 것, 보여 줄 방법','이렇게 연습합니다'];
 const nextLabels=['다음','다음','학습 시작하기'];
 const panels=[
 `<p class="paper-title"><span class="paper-label">근거 논문</span>${esc(DATA.title)}</p><p>이 앱은 AI에게 안내문이나 자료 정리를 맡기는 사람이, 논문에서 조건을 더 잘 지키게 한 ‘완성 예시’와 ‘빈 틀’을 요청에 활용하고 받은 답을 점검하도록 돕습니다.</p><div class="practice-card"><span class="tag">연습 예시</span><p><strong>원문</strong></p><blockquote>신청 마감은 11월 7일입니다. 참가비는 5,000원입니다. 신청은 게시판 댓글로 받습니다.</blockquote><p><strong>내 요청</strong> 2문장으로 줄여 줘. 마감일과 참가비, 신청 방법은 그대로 둬.</p><p><strong>받은 답</strong></p><div class="response">11월 8일까지 게시판 댓글로 신청하세요.<br>참가비는 5,000원입니다.</div><button id="onboard-reveal" aria-expanded="${!!onboardAnswer}">어디가 달라졌을까요?</button><div role="status">${onboardAnswer?'<div class="result"><strong>마감일이 11월 7일에서 8일로 바뀌었습니다.</strong><p>문장 수는 맞지만 날짜가 달라졌습니다. 이대로 보냈다면 신청하는 사람이 마감일을 잘못 알았을 것입니다.</p></div>':''}</div></div>`,
 `<p>요청을 쓰기 전에, 바꿀 것과 그대로 남길 것을 먼저 나누어 보세요. 그다음 원하는 모양을 어떻게 보여 줄지 고릅니다.</p><div class="onboard-flow"><div><b>지시</b><span>“첫 문장에 마감일과 신청 방법을, 둘째 문장에 참가비를 써 줘.”</span></div><div><b>완성 예시</b><span>다른 행사로 쓴 글: “10월 2일까지 이메일로 신청하세요.<br>참가비는 3,000원입니다.”</span></div><div><b>빈 틀</b><span>[마감일과 신청 방법을 알리는 문장].<br>[참가비를 알리는 문장].</span></div></div><p>논문에서는 한 모델의 요청에 완성 예시나 빈 틀을 더하자, 조건을 지킨 비율이 70% 안팎에서 88% 정도로 올랐습니다. 이 앱에서는 상황에 맞는 방법을 고르고, 받은 답을 조건별로 확인하는 연습을 합니다.</p>`,
 `<div class="onboard-flow"><div><b>1~2차시</b><span>요청에 넣을 조건을 정하고, 전달 방식을 고릅니다.</span></div><div><b>3~4차시</b><span>요청과 예시가 어긋나는 곳을 찾고, 받은 답을 검사합니다.</span></div><div><b>5~6차시</b><span>두 요청의 결과를 같은 기준으로 비교하고 해석합니다.</span></div><div><b>7~8차시</b><span>직접 두 요청을 만들고, 내 작업에 적용합니다.</span></div></div><div class="practice-card"><h3>하루 한 차시, 약 20분</h3><p>차시마다 직접 요청을 쓰면, 꼭 필요한 표현이 들어 있는지 앱이 바로 알려 줍니다. 중간에 멈췄다가 이어서 할 수 있습니다.</p></div>`
 ];
 $('#onboard-content').innerHTML=`<div class="onboard-top"><span class="eyebrow">처음 사용 안내 · ${onboardStep+1} / ${panels.length}</span><button id="onboard-skip">안내 닫기</button></div><div class="onboard-progress" aria-hidden="true">${panels.map((_,i)=>`<span class="${i<=onboardStep?'filled':''}"></span>`).join('')}</div><h2 id="onboard-title" tabindex="-1">${titles[onboardStep]}</h2>${panels[onboardStep]}<div class="onboard-actions">${onboardStep?'<button id="onboard-prev">이전</button>':'<span></span>'}<button id="onboard-next" class="primary">${nextLabels[onboardStep]}</button></div>`;
 $('#onboard-skip').onclick=closeOnboarding;
 if(onboardStep)$('#onboard-prev').onclick=()=>{onboardStep--;drawOnboarding();$('#onboarding').scrollTop=0;$('#onboard-title').focus();};
 $('#onboard-next').onclick=()=>{if(onboardStep===panels.length-1){closeOnboarding();go('course');return;}onboardStep++;drawOnboarding();$('#onboarding').scrollTop=0;$('#onboard-title').focus();};
 if(onboardStep===0)$('#onboard-reveal').onclick=()=>{onboardAnswer=true;drawOnboarding();$('#onboard-reveal').focus();};
}
$('#help').onclick=openOnboarding;
$('#onboarding').addEventListener('cancel',e=>{e.preventDefault();closeOnboarding();});
if(saved.onboardingVersion!==4)openOnboarding();
