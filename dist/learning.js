'use strict';
let lessonIndex=-1, lessonStep=0, examView=null, examStep=0, lessonSummary=false;
const STEP_NAMES=['먼저 풀어 보기','설명 읽기','연습하기','직접 쓰고 고치기','다시 풀고 정리하기'];
const stamp=()=>new Date().toISOString();
// Stable per-item option order so the answer position carries no pattern.
function practiceOrder(id){let h=7;for(const c of id)h=(h*131+c.charCodeAt(0))>>>0;return [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]][h%6];}
// AI review of written answers. Default: the learner copies a review prompt into their own AI service.
// When the server is connected in '나의 실험', the same prompt can be sent through /api/experiment.
// AI reviews are advisory and stored apart from self and peer ratings.
function aiReviewPrompt(task,criteria,answer,extra=''){
 return ['당신은 프롬프트 작성 연습을 돕는 검토자입니다. 아래 과제에 대해 학습자가 쓴 답안을 검토 기준에 따라 평가해 주세요.','',
 '# 과제',task,'','# 검토 기준',criteria.map((c,i)=>`${i+1}. ${c}`).join('\n'),'',
 ...(extra?[extra,'']:[]),
 '# 학습자의 답안',answer,'',
 '# 검토 방법',
 '- 기준마다 판단을 하나씩 적어 주세요.',
 '- 판단마다 답안에서 근거가 되는 부분을 짧게 인용해 주세요. 근거를 찾을 수 없으면 “근거 없음”이라고 적어 주세요.',
 '- 부족한 기준에는 고칠 방법을 한 가지만 제안해 주세요. 답안 전체를 대신 써 주지는 마세요.',
 '- 확실하지 않은 판단은 “확인 필요”라고 표시해 주세요.',
 '- 마지막에 가장 먼저 고칠 점을 한 문장으로 정리해 주세요.',
 '- 한국어 합니다체로 답해 주세요.'].join('\n');
}
// Instant checks on the learner's own draft: phrase presence only, never a semantic grade.
const AUTO_CHECKS=[
 [{label:'2문장으로 줄이라는 조건',any:['2문장','두 문장']},{label:'마감일 11월 7일',all:['11월 7일']},{label:'참가비 5,000원',any:['5,000원','5000원']},{label:'신청 방법(학교 게시판 댓글)',all:['게시판']},{label:'답을 원문과 맞춰 보는 방법',any:['대조','맞춰','비교','세어','센다','세고','하나씩']}],
 [{label:'빈 틀이나 순서를 보여 주는 부분',any:['[','틀']},{label:'‘완료한 일’이 ‘남은 일’보다 앞에 옴',order:['완료','남은']},{label:'마감일 11월 9일',all:['11월 9일']},{label:'답을 확인하는 방법',any:['확인할','확인한다','확인합니다','대조','맞춰']}],
 [{label:'‘내일 도착’ 약속을 짚음',all:['내일']},{label:'말투 문제를 짚음',any:['합니다체','해요체','말투']},{label:'도착일을 단정하지 않는 고친 예시',any:['정해지지 않','미정','정해지면']},{label:'2문장 구성 유지',any:['2문장','두 문장']},{label:'받은 답에서 확인할 것',any:['확인할','확인한다','확인합니다']}],
 [{label:'공책 수량을 ‘미확인’으로 고침',all:['미확인']},{label:'펜 2개를 그대로 둠',all:['펜','2개']},{label:'파일 3개를 그대로 둠',all:['파일','3개']},{label:'머리글을 빼고 세는 기준',any:['머리글','구분선','첫 줄']},{label:'원자료와 대조하는 기준',any:['대조','맞춰','원자료']}],
 [{label:'모델을 같게 맞춤',all:['모델'],any:['같','동일','통일']},{label:'원자료를 같게 맞춤',all:['원자료'],any:['같','동일','통일','공통']},{label:'실행 횟수를 같게 맞춤',any:['번씩','회씩','같은 횟수','횟수를 같게','횟수는 같게']},{label:'A와 B를 번갈아 실행',any:['번갈아','교대로']},{label:'빈 틀의 세 소제목',all:['완료','진행 중','막힌']},{label:'오류를 기록하는 방법',all:['오류']}],
 [{label:'평균 규칙 준수율 80%',all:['80%']},{label:'A의 비율 40%',all:['40%']},{label:'B의 비율 60%',all:['60%']},{label:'B의 마감일 오류',all:['마감일']},{label:'더 확인할 내용',any:['다른 자료','추가','더 비교','반복','다시']}],
 [{label:'열 순서 ‘할 일 | 담당 | 기한’',regex:'할\\s*일\\s*\\|\\s*담당\\s*\\|\\s*기한'},{label:'기한이 없으면 ‘미정’',all:['미정']},{label:'이름 ‘민지’를 그대로 둠',all:['민지']},{label:'B의 이름이나 기한 오류를 짚음',any:['민수','11월 9일']},{label:'다음에 쓸 방식',any:['다음','선택','유지','쓰겠','더하']}],
 [{label:'두 수정안이 같다는 판단',any:['같','차이가 없','차이 없','동일']},{label:'내 작업의 원자료',any:['원자료']},{label:'요청 A와 요청 B',all:['A','B']},{label:'반복 계획',any:['번씩','회씩','반복','번갈아']},{label:'아직 실행하지 않은 계획인지 밝힘',any:['계획','실행하지 않','실행 전']}]
];
function autoCheck(i,text){const raw=String(text||''),t=raw.replace(/\s+/g,''),n=s=>s.replace(/\s+/g,'');
 return (AUTO_CHECKS[i]||[]).map(c=>{let ok=true;
  if(c.all)ok=ok&&c.all.every(s=>t.includes(n(s)));
  if(c.any)ok=ok&&c.any.some(s=>t.includes(n(s)));
  if(c.order){const a=t.indexOf(n(c.order[0])),b=t.indexOf(n(c.order[1]));ok=ok&&a>=0&&b>=0&&a<b;}
  if(c.regex)ok=ok&&new RegExp(c.regex).test(raw);
  return {label:c.label,ok};});}
function autoCheckMarkup(i,text){const res=autoCheck(i,text),found=res.filter(x=>x.ok).length;
 return `<p><strong>${res.length}개 가운데 ${found}개를 찾았습니다.</strong></p><ul class="auto-check">${res.map(x=>`<li class="${x.ok?'good':'warn'}">${x.ok?'✓ 찾음':'○ 찾지 못함'} · ${esc(x.label)}</li>`).join('')}</ul>`;}
function aiReviewsOk(a){return Array.isArray(a)&&a.length<=10&&a.every(x=>x&&typeof x==='object'&&typeof x.text==='string'&&x.text.length<=20000&&['manual','api'].includes(x.source)&&typeof x.at==='string'&&Number.isFinite(Date.parse(x.at))&&(x.model===undefined||typeof x.model==='string'&&x.model.length<=100));}
function aiApiReady(){return typeof expToken==='string'&&Boolean(expToken)&&typeof expModel==='string'&&Boolean(expModel);}
function aiReviewList(rec){const list=rec.aiReviews||[];return list.length?`<h4>저장한 AI 검토 ${list.length}개</h4>${list.map(x=>`<details><summary>${esc(new Date(x.at).toLocaleString('ko-KR'))} · ${x.source==='api'?'이 앱에서 받음':'직접 붙여 넣음'}${x.model?' · '+esc(x.model):''}</summary><pre class="response">${esc(x.text)}</pre></details>`).join('')}<p class="note">AI의 검토는 참고 의견입니다. 직접 채점하거나 다른 사람에게 받은 검토와는 따로 기록됩니다.</p>`:'';}
function aiReviewBox(id,rec,title='AI에게 검토받기 (선택)'){
 return `<details class="optional-work ai-review" id="${id}-box"><summary>${esc(title)}</summary><p>지금 쓴 답안을 AI에게 검토받을 수 있습니다. AI의 검토는 참고 의견이며 틀릴 수도 있으므로, 근거로 든 부분을 직접 확인해 주세요. 답안이 AI 서비스로 전송되므로 개인정보는 넣지 마세요.</p><div class="actions"><button id="${id}-make">검토 프롬프트 만들기</button>${aiApiReady()?`<button id="${id}-api">이 앱에서 바로 검토받기 (유료)</button>`:''}</div><div id="${id}-promptwrap" hidden><label class="field" for="${id}-prompt">검토 프롬프트 (복사해서 평소 쓰는 AI 서비스에 붙여 넣으세요)</label><textarea id="${id}-prompt" class="large" readonly></textarea><div class="actions"><button id="${id}-copy">프롬프트 복사</button></div></div>${aiApiReady()?'':'<p class="note">‘나의 실험’에서 서버 연결을 확인하면, 이 앱에서 바로 검토받을 수도 있습니다(유료).</p>'}<label class="field" for="${id}-result">AI의 검토 결과</label><textarea id="${id}-result" maxlength="20000" placeholder="AI 서비스에서 받은 검토 결과를 붙여 넣어 주세요."></textarea><div class="actions"><button id="${id}-save">검토 결과 저장</button></div><p id="${id}-status" class="note" role="status"></p><div id="${id}-list">${aiReviewList(rec)}</div></details>`;
}
function bindAiReview(id,rec,buildPrompt){
 if(!$('#'+id+'-make'))return;
 const status=t=>{const el=$('#'+id+'-status');if(el)el.textContent=t;};
 const prompt=()=>{const t=buildPrompt();if(!t){notify('먼저 답안을 적어 주세요.');return '';}return t;};
 const save=(text,source,model)=>{rec.aiReviews=(rec.aiReviews||[]).concat([{at:stamp(),source,text:text.slice(0,20000),...(model?{model:String(model).slice(0,100)}:{})}]).slice(-10);const ok=persist();$('#'+id+'-list').innerHTML=aiReviewList(rec);status(ok?'AI 검토 결과를 저장했습니다.':'화면에는 표시했지만 이 기기에 저장하지 못했습니다. 백업을 내려받아 주세요.');};
 $('#'+id+'-make').onclick=()=>{const t=prompt();if(!t)return;$('#'+id+'-prompt').value=t;$('#'+id+'-promptwrap').hidden=false;status('검토 프롬프트를 만들었습니다. 복사해서 ChatGPT, Gemini, Claude처럼 평소 쓰는 AI 서비스에 붙여 넣어 주세요.');};
 $('#'+id+'-copy').onclick=()=>{const el=$('#'+id+'-prompt');const text=el.value;if(!text){notify('먼저 검토 프롬프트를 만들어 주세요.');return;}
  const fallback=()=>{try{el.focus();el.select();}catch{}notify('자동으로 복사하지 못했습니다. 선택된 프롬프트를 직접 복사해 주세요.');};
  try{const c=typeof navigator!=='undefined'&&navigator.clipboard;if(c&&c.writeText)c.writeText(text).then(()=>notify('프롬프트를 복사했습니다.'),fallback);else fallback();}catch{fallback();}};
 $('#'+id+'-save').onclick=()=>{const text=$('#'+id+'-result').value.trim();if(!hasContent(text)){notify('AI에게 받은 검토 결과를 붙여 넣어 주세요.');return;}save(text,'manual');$('#'+id+'-result').value='';};
 if($('#'+id+'-api'))$('#'+id+'-api').onclick=async()=>{const t=prompt();if(!t)return;
  if(t.length>12000){notify('답안이 길어서 이 앱에서 바로 보낼 수 없습니다. 검토 프롬프트를 복사해서 사용해 주세요.');return;}
  if(!confirm('답안과 검토 기준을 OpenAI로 보내고, 요금이 발생하는 호출을 1번 실행합니다. 진행할까요?'))return;
  const btn=$('#'+id+'-api');btn.disabled=true;status('AI의 검토를 기다리고 있습니다.');
  try{if(location.protocol==='file:')throw Error('HTML 파일을 직접 열었을 때는 API를 호출할 수 없습니다. 서버나 배포한 주소에서 열어 주세요.');
   const r=await fetch('/api/experiment',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+expToken},body:JSON.stringify({model:expModel,prompt:t}),signal:AbortSignal.timeout(65000)});
   let j={};try{j=await r.json();}catch{}
   if(!r.ok)throw Error(j.error||'검토 요청이 실패했습니다. 서버 연결을 확인해 주세요.');
   if(j.status!=='completed'||!j.text)throw Error('검토 결과를 끝까지 받지 못했습니다. 자동으로 다시 시도하지 않습니다.');
   save(j.text,'api',j.model||expModel);
  }catch(e){status('검토를 받지 못했습니다. '+(typeof e?.message==='string'&&/[가-힣]/.test(e.message)?e.message:'연결 상태와 서버 설정을 확인해 주세요. 자동으로 다시 시도하지 않습니다.'));}
  finally{btn.disabled=false;}};
}
// Input screening is not semantic grading.
function hasContent(v){return typeof v==='string'&&/[\p{L}\p{N}]/u.test(v);}
function evidenceCount(i=lessonIndex){return 1;}
function transferReady(r,i=lessonIndex){return !TRANSFER_CHECKS[i]||Boolean(r.transfer?.attempts?.length);}
function transferNeedsReview(r,i=lessonIndex){const t=TRANSFER_CHECKS[i];return !!t&&(!r.transfer?.attempts?.length||r.transfer.attempts[0].answers.some((v,k)=>v!==t.keys[k]));}
function transferMarkup(r){const t=TRANSFER_CHECKS[lessonIndex];if(!t)return '';
 const a=r.transfer?.attempts?.at(-1);return `<section class="worked-example"><h3>두 전달 방식의 응답 비교하기</h3><p class="review-text">${esc(t.requirement)}</p><pre class="response">${esc(t.response)}</pre><p class="note">두 응답에 같은 기준을 적용해서 질문마다 판단해 보세요.</p>${t.conditions.map((label,k)=>`<fieldset><legend>${esc(label)}</legend>${[[true,'예'],[false,'아니요']].map(([value,text])=>`<label class="answer-option"><input type="radio" name="transfer-${k}" data-transfer="${k}" value="${value}" ${r.transfer?.answers?.[k]===value?'checked':''}><span>${text}</span></label>`).join('')}</fieldset>`).join('')}<button id="check-transfer">내 판단과 해설 비교하기</button><div id="transfer-feedback" tabindex="-1" role="status">${a?`<p>질문 3개 가운데 ${a.answers.filter((v,k)=>v===t.keys[k]).length}개를 맞게 판단했습니다. 처음 판단은 따로 저장됩니다.</p><ul>${t.feedback.map((text,k)=>`<li>${a.answers[k]===t.keys[k]?'맞게 판단했습니다.':'다시 확인해 보세요.'} ${esc(text)}</li>`).join('')}</ul>`:''}</div></section>`;
}
function bindTransfer(r){if(!TRANSFER_CHECKS[lessonIndex])return;
 r.transfer=r.transfer||{answers:[null,null,null],attempts:[]};
 document.querySelectorAll('[data-transfer]').forEach(el=>el.onchange=()=>{r.transfer.answers[Number(el.dataset.transfer)]=el.value==='true';persist();});
 $('#check-transfer').onclick=()=>{if(r.transfer.answers.some(v=>typeof v!=='boolean')){notify('세 질문에 각각 예 또는 아니요를 선택해 주세요.');return;}
 if(JSON.stringify(r.transfer.attempts.at(-1)?.answers)!==JSON.stringify(r.transfer.answers))r.transfer.attempts.push({at:stamp(),answers:[...r.transfer.answers]});
 persist();renderCourse();$('#transfer-feedback').focus();};
}

function learningState(){
 if(saved.learningV3 && saved.learningV3.version!==LEARNING_VERSION){saved.learningArchives=saved.learningArchives||[];saved.learningArchives.push(saved.learningV3);delete saved.learningV3;}
 if(!saved.learningV3){saved.learningV3={version:LEARNING_VERSION,created:stamp(),order:Math.random()<.5?['A','B']:['B','A'],lessons:{},assessments:{},exposures:[],events:[]};persist();}
 return saved.learningV3;
}
function logLearning(type,detail={}){const s=learningState();s.events.push({at:stamp(),type,...detail});persist();}
function lessonRecord(i=lessonIndex){const s=learningState();return s.lessons[i]||(s.lessons[i]={started:stamp(),step:0,answers:{},fields:{},evidence:['','',''],history:[]});}
function focusLearning(){window.scrollTo({top:0,behavior:'instant'});const h=$('#learning-heading');if(h)h.focus();}
function changeStep(n){lessonSummary=false;lessonStep=n;lessonRecord().step=n;persist();renderCourse();focusLearning();}
function launchLesson(i){
 const s=learningState();if(!s.assessments.pre?.submitted&&!s.preDecision){s.preDecision={at:stamp(),choice:'skipped'};}
 lessonSummary=false;lessonIndex=i;s.lastLesson=i;lessonStep=lessonRecord(i).step||0;page='course';logLearning('lesson-open',{lesson:i+1});render();focusLearning();
}
function firstCorrect(rec,q){return rec?.attempts?.[0]?.choice===q.key;}
function latestCorrect(rec,q){return rec?.attempts?.at(-1)?.choice===q.key;}
function questionMarkup(q,record,mode='learn',optionOrder=[0,1,2]){
 const attempt=record?.attempts?.at(-1);return `<fieldset class="question"><legend>${esc(q.stem)}</legend>${mode==='learn'?'':'<p class="note">해설을 보지 않고 답 하나를 골라 주세요.</p>'}${optionOrder.map(k=>{const o=q.options[k];return `<label class="answer-option"><input type="radio" name="${q.id}" data-answer="${q.id}" value="${k}" ${record?.selected===k?'checked':''}><span>${esc(o)}</span></label>`}).join('')}</fieldset>${mode==='learn'?`<button class="primary" id="submit-choice">정답과 해설 확인</button>${attempt?`<section id="choice-feedback" tabindex="-1" class="feedback ${attempt.choice===q.key?'':'warning'}" role="status"><h3>${attempt.choice===q.key?'정답입니다.':'해설을 읽고 다시 풀어 보세요.'}</h3><p>${esc(q.feedback[attempt.choice])}</p><p>${esc(q.why)}</p><p class="note">처음 고른 답은 ${record.attempts[0].choice===q.key?'정답':'오답'}이었고, 지금까지 ${record.attempts.length}번 풀었습니다. 다시 풀어도 처음 고른 답은 따로 저장됩니다.</p></section>`:''}`:''}`;
}
function bindPractice(q,rec){
 document.querySelectorAll('[data-answer]').forEach(el=>el.onchange=()=>{rec.selected=Number(el.value);persist();});
 $('#submit-choice').onclick=()=>{if(!Number.isInteger(rec.selected)){notify('답을 하나 골라 주세요.');return;}
 rec.attempts=rec.attempts||[];if(rec.attempts.at(-1)?.choice===rec.selected){notify('같은 답을 다시 골랐습니다. 해설은 아래에 그대로 있습니다.');return;}
 rec.attempts.push({choice:rec.selected,at:stamp()});persist();renderCourse();$('#choice-feedback')?.focus();};
}
function renderCourse(){
 const s=learningState();if(typeof syncNavigation==='function')syncNavigation();if(lessonIndex<0){renderLearningHome();return;}if(lessonSummary){renderLessonSummary();return;}
 const c=COURSE[lessonIndex],r=lessonRecord(),qs=PRACTICE[lessonIndex],q=qs[lessonStep===0?0:lessonStep===2?1:2];
 $('#main').innerHTML=`<div class="learning-shell"><div class="section-title"><button id="back-course">← 전체 과정</button><span class="save-status" id="save-state" role="status">${storageOK?'이 기기에 저장됨':'저장되지 않음, 백업 필요'}</span></div><p class="eyebrow">${lessonIndex+1}차시 / 8 · 약 20분 · ${esc(c.phase)}</p><h1 id="learning-heading" tabindex="-1">${esc(c.title)}</h1><ol class="learning-steps" aria-label="차시 진행">${STEP_NAMES.map((v,i)=>`<li ${i===lessonStep?'aria-current="step"':''}>${i+1}. ${v}</li>`).join('')}</ol><p class="note">중간에 멈춰도 저장된 단계부터 이어서 할 수 있습니다.</p><div id="learning-body" class="card"></div><div class="lesson-nav"><button id="lesson-prev" ${lessonStep===0?'disabled':''}>이전 단계</button><span>${lessonStep+1} / 5</span><button id="lesson-next" class="primary">${lessonStep===4?'정리하고 마치기':'다음 단계 →'}</button></div></div>`;
 $('#back-course').onclick=()=>{go('course');focusLearning();};$('#lesson-prev').onclick=()=>changeStep(lessonStep-1);
 const body=$('#learning-body');
 if(lessonStep===0||lessonStep===2||lessonStep===4){const rec=r.answers[q.id]||(r.answers[q.id]={});body.innerHTML=`<span class="tag">${lessonStep===0?'설명을 읽기 전에':lessonStep===2?'답을 고르고 해설 확인하기':'배운 내용 확인하기'}</span><h2>${lessonStep===0?'설명을 읽기 전에 먼저 풀어 보세요':lessonStep===2?'답을 고른 뒤 해설을 읽어 보세요':'배운 내용을 새 문제에 적용해 보세요'}</h2>${questionMarkup(q,rec,'learn',practiceOrder(q.id))}${lessonStep===4?`<label class="field" for="takeaway">다음에 AI에게 요청할 때 무엇을 확인하겠나요?</label><textarea id="takeaway" maxlength="3000" placeholder="예: 예시를 붙이기 전에, 예시의 말투가 요청과 맞는지 먼저 확인하겠습니다.">${esc(r.fields.takeaway||'')}</textarea><p class="note">여기서는 이번 차시에서 배운 내용을 복습합니다. 학습하기 전과 후의 답을 비교하려면 ‘배움 확인’의 평가를 이용하세요.</p>`:''}`;
 bindPractice(q,rec);if($('#takeaway'))$('#takeaway').oninput=e=>saveLessonField('takeaway',e.target.value);
 }else if(lessonStep===1){body.innerHTML=`<span class="tag">핵심 질문</span><h2>${esc(c.question)}</h2>${c.lesson.map(t=>`<p>${esc(t)}</p>`).join('')}<div class="worked-example"><h3>${esc(WORKED[lessonIndex].title)}</h3><pre class="response">${esc(WORKED[lessonIndex].before)}</pre>${WORKED[lessonIndex].after?`<h4>고친 뒤</h4><pre class="response">${esc(WORKED[lessonIndex].after)}</pre>`:""}<ol>${WORKED[lessonIndex].steps.map(t=>`<li>${esc(t)}</li>`).join("")}</ol></div><h3>답안을 쓴 뒤 확인할 세 가지</h3><ul>${c.checks.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>${c.caseIndex!==null?`<details><summary>논문의 실제 응답 자료 보기</summary>${courseEvidence(c.caseIndex)}</details>`:''}`;
 }else renderArtifact(body,c,r);
 $('#lesson-next').onclick=()=>{
 if([0,2,4].includes(lessonStep)&&!r.answers[q.id]?.attempts?.length){notify('답을 고르고 정답과 해설을 확인해 주세요. 틀려도 다음 단계로 갈 수 있습니다.');return;}
 if(lessonStep===3&&!r.history.length){notify('처음 쓴 답안과 검토한 내용을 적고 ‘수정 기록 저장’을 눌러 주세요.');return;}
 if(lessonStep===3&&r.dirty){notify('바꾼 답안을 먼저 저장해 주세요.');return;}
 if(lessonStep<4){changeStep(lessonStep+1);return;}
 if(qs.some(item=>!r.answers[item.id]?.attempts?.length)||!r.draftLocked||!r.history.length||r.dirty||!transferReady(r)){notify('아직 마치지 않은 단계가 있습니다. 판단 문제를 모두 풀었는지, 답안과 수정 기록을 저장했는지 확인해 주세요.');return;}
 if(!hasContent(r.fields.takeaway)){notify('다음에 AI에게 요청할 때 확인할 점을 한 줄 적어 주세요.');return;}
 r.completed=stamp();r.reviewNeeded=!firstCorrect(r.answers[qs[2].id],qs[2])||transferNeedsReview(r);r.achievement='unverified';persist();lessonSummary=true;if(typeof syncNavigation==='function')syncNavigation();renderLessonSummary();focusLearning();
 };
}
function saveLessonField(k,v){const r=lessonRecord();r.fields[k]=v;if(k!=='takeaway')r.dirty=true;const ok=persist();const el=$('#save-state');if(el)el.textContent=ok?'자동 저장됨':'저장되지 않음, 전체 과정 화면에서 백업해 주세요';}
function renderArtifact(body,c,r){
 body.innerHTML=`<span class="tag">직접 작성하기</span><h2>직접 써 보고, 조건에 맞게 고쳐 보세요</h2><div class="task-brief">${esc(c.task)}</div>${transferMarkup(r)}${r.draftLocked?`<details><summary>처음 쓴 답안 다시 보기</summary><pre class="response">${esc(r.firstDraft)}</pre></details>`:`<label class="field" for="artifact-draft">내가 처음 쓴 답안</label><textarea id="artifact-draft" maxlength="12000" class="large" placeholder="${esc(c.draftHint||'먼저 스스로 답안을 작성하세요.')}">${esc(r.fields.draft||'')}</textarea><button id="lock-draft">초안 저장하고 검토하기</button><p class="note">먼저 내 생각대로 써 본 뒤 저장해 보세요. 그다음 예시 답안과 해설을 열어 내 답안에서 보완할 부분을 살펴볼 수 있습니다.</p>`}<div id="artifact-review" tabindex="-1"></div>`;
 bindTransfer(r);
 if(!r.draftLocked){$('#artifact-draft').oninput=e=>saveLessonField('draft',e.target.value);$('#lock-draft').onclick=()=>{const t=r.fields.draft?.trim();if(!hasContent(t)){notify('초안을 문장으로 적어 주세요. 기호만으로는 저장할 수 없습니다.');return;}if(!transferReady(r)){notify('두 응답을 비교하는 세 질문에 답한 뒤 해설을 확인해 주세요.');return;}r.firstDraft=t;if(!r.fields.final)r.fields.final=t;r.draftLocked=stamp();persist();renderCourse();$('#artifact-review').focus();};return;}
 $('#artifact-review').innerHTML=`<section class="auto-check-box"><h3>내 답안 자동 점검</h3><p class="note">답안에 꼭 필요한 내용이 들어 있는지 바로 확인합니다. 표현만 확인하므로, ‘찾지 못함’은 틀렸다는 뜻이 아니라 직접 다시 살펴보라는 뜻입니다.</p><div id="auto-check-list">${autoCheckMarkup(lessonIndex,r.fields.final||r.firstDraft)}</div><button id="auto-recheck">고친 답안 다시 점검</button></section>${aiReviewBox('lesson-ai',r)}<details id="worked-solution"><summary>예시 답안과 해설</summary><div class="review-text">${esc(c.example)}</div></details><details><summary>빠뜨리기 쉬운 부분 살펴보기</summary>${(c.reviewExamples||[]).map(x=>`<h4>${esc(x.label)}</h4><blockquote>${esc(x.answer)}</blockquote><p>${esc(x.reason)}</p>`).join('')}<p class="note">예시와 내 답안을 비교해 빠뜨린 부분을 찾아보세요.</p></details><label class="field" for="artifact-final">검토하고 고친 답안</label><textarea id="artifact-final" maxlength="12000" class="large" placeholder="요청한 조건은 지키면서, 필요한 부분만 고쳐 보세요.">${esc(r.fields.final||'')}</textarea><h3>아래 질문에 답하며 내 답안을 확인하세요</h3><p class="note">아래 질문에 따라 내 답안을 다시 살펴보세요. 첫 번째 질문에는 답안의 어느 부분을 확인했는지 적어 주세요. 나머지 질문은 읽고 점검하기만 해도 되고, 더 적고 싶은 내용이 있다면 남겨도 됩니다.</p>${c.checks.map((t,i)=>`<label class="field" for="evidence-${i}">${i+1}. ${esc(t)} · ${i<evidenceCount()?'필수':'선택'}</label><textarea id="evidence-${i}" data-evidence="${i}" maxlength="3000" placeholder="답안에서 확인한 부분을 짚어 주세요. 계산이 필요한 문제라면 계산 과정도 적어 주세요.">${esc(r.evidence[i]||'')}</textarea>`).join('')}<label class="field" for="artifact-reason">어디를 고쳤고, 왜 고쳤나요? 고치지 않았다면 그 이유를 적어 주세요.</label><textarea id="artifact-reason" maxlength="3000">${esc(r.fields.reason||'')}</textarea><button id="save-artifact" class="primary">수정 기록 저장</button><div id="artifact-message" role="status">${r.history.length?`<p>수정 기록 ${r.history.length}개 저장됨</p>`:''}</div><details><summary>추가 문제 (선택)</summary><p>${esc(c.extra)}</p></details>`;
 $('#worked-solution').ontoggle=e=>{if(e.target.open&&!r.solutionViewed){r.solutionViewed=stamp();persist();}};
 $('#artifact-final').oninput=e=>saveLessonField('final',e.target.value);$('#artifact-reason').oninput=e=>saveLessonField('reason',e.target.value);
 document.querySelectorAll('[data-evidence]').forEach(el=>el.oninput=()=>{r.evidence[Number(el.dataset.evidence)]=el.value;r.dirty=true;persist();});
 $('#auto-recheck').onclick=()=>{$('#auto-check-list').innerHTML=autoCheckMarkup(lessonIndex,$('#artifact-final').value);};
 bindAiReview('lesson-ai',r,()=>{const a=String(r.fields.final||r.firstDraft||'').trim();return hasContent(a)?aiReviewPrompt(c.task,c.checks,a,'# 참고용 예시 답안 (정답이 하나만 있는 것은 아닙니다)\n'+c.example):'';});
 $('#save-artifact').onclick=()=>{if(!hasContent(r.fields.final)||!hasContent(r.fields.reason)||r.evidence.slice(0,evidenceCount()).some(t=>!hasContent(t))){notify('답안과 필수 질문에 대한 답, 수정한 이유를 적어 주세요. 기호만 입력할 수는 없습니다.');return;}if(!transferReady(r)){notify('제시된 응답을 먼저 판정해 주세요.');return;}
 r.history.push({at:stamp(),final:r.fields.final,reason:r.fields.reason,evidence:[...r.evidence]});r.dirty=false;const stored=persist();$('#artifact-message').innerHTML=stored?'<p class="result">수정한 답안과 이유를 저장했습니다. 다음 단계에서 새 문제를 풀어 보세요.</p>':'<p class="result warning">화면에는 수정 기록을 남겼지만 이 기기에 저장하지 못했습니다. 전체 과정에서 기록을 백업해 주세요.</p>';};
}
function renderLessonSummary(){const c=COURSE[lessonIndex],r=lessonRecord(),qs=PRACTICE[lessonIndex];$('#main').innerHTML=`<div class="learning-shell card"><p class="eyebrow">${lessonIndex+1}차시 활동 기록</p><h1 id="learning-heading" tabindex="-1">${r.reviewNeeded?'복습할 부분이 남아 있습니다':'이번 차시를 마쳤습니다'}</h1><p>마지막 문제에서 처음 고른 답은 ${!firstCorrect(r.answers[qs[2].id],qs[2])?'틀렸습니다. 해설을 읽고 다시 풀 수 있습니다. 처음 고른 답과 다시 푼 답은 따로 저장합니다.':'맞았습니다. 다음에 프롬프트를 쓸 때도 같은 기준으로 확인해 보세요.'}</p><div class="result"><h3>내가 기억할 점</h3><p>${esc(r.fields.takeaway)}</p></div>${TRANSFER_CHECKS[lessonIndex]?`<p>두 응답을 판단하는 질문 3개 가운데, 처음에 ${r.transfer.attempts[0].answers.filter((v,k)=>v===TRANSFER_CHECKS[lessonIndex].keys[k]).length}개를 맞게 판단했습니다. 틀린 질문은 작성 단계에서 근거와 함께 다시 확인해 보세요.</p>`:''}<h3>복습할 때 기억할 점</h3><p>${esc(qs[2].why)}</p><p>오늘 공부는 여기서 마쳐도 괜찮습니다. 다음 차시는 다른 날 이어서 해 보세요. 과정을 마친 뒤에는 해설 없이 새 과제를 풀며 배운 내용을 확인할 수 있습니다.</p><div class="actions"><button id="summary-home">전체 과정</button><button id="summary-review">마지막 문제 다시 보기</button><button id="summary-artifact">작성 답안 다시 검토</button>${lessonIndex<7?'<button id="summary-next">다음 차시 살펴보기</button>':'<button id="summary-assess" class="primary">사후 평가로 이동</button>'}</div></div>`;
 $('#summary-home').onclick=()=>go('course');$('#summary-review').onclick=()=>changeStep(4);$('#summary-artifact').onclick=()=>changeStep(3);if($('#summary-next'))$('#summary-next').onclick=()=>launchLesson(lessonIndex+1);if($('#summary-assess'))$('#summary-assess').onclick=()=>go('assessment');}
function resumeLessonIndex(s=learningState()){
 const unfinished=i=>Number.isInteger(i)&&i>=0&&i<COURSE.length&&!s.lessons[i]?.completed;
 if(unfinished(s.lastLesson))return s.lastLesson;
 const recent=[...s.events].reverse().find(e=>e.type==='lesson-open'&&unfinished(e.lesson-1));
 if(recent)return recent.lesson-1;
 return Math.max(0,COURSE.findIndex((_,i)=>unfinished(i)));
}
function renderLearningHome(){const s=learningState(),count=Object.values(s.lessons).filter(r=>r.completed).length,returning=Object.keys(s.lessons).length>0,target=resumeLessonIndex(s),record=s.lessons[target];
 const resumeLabel=count===8?'1차시 다시 살펴보기':returning?`${target+1}차시 ${STEP_NAMES[record?.step||0]}부터 이어서 하기`:'1차시 시작하기';
 $('#main').innerHTML=`<section class="hero"><div><p class="paper-title"><span class="paper-label">근거 논문</span>${esc(DATA.title)}</p><h1 id="learning-heading" tabindex="-1">${returning?'하던 연습을<br>이어서 해 볼까요?':'AI에게 원하는 일을<br>어떻게 부탁하면 좋을까요?'}</h1><p class="lead">이 앱은 AI에게 안내문이나 자료 정리를 맡기는 사람이, 논문에서 조건을 더 잘 지키게 한 ‘완성 예시’와 ‘빈 틀’을 요청에 활용하고 받은 답을 점검하도록 돕습니다.</p><ol class="todo-list" aria-label="이 앱에서 할 일 세 가지"><li><button class="todo-btn" data-try="0"><strong>조건 정하기</strong><span>바꿀 부분과 그대로 남길 정보를 정해서 요청을 씁니다.</span><em>바로 해 보기 →</em></button></li><li><button class="todo-btn" data-try="1"><strong>전달 방식 고르기</strong><span>지시만 쓸지, 완성 예시나 빈 틀을 더할지 고릅니다.</span><em>바로 해 보기 →</em></button></li><li><button class="todo-btn" data-try="2"><strong>답 확인하기</strong><span>논문 실험의 실제 응답에서 어긴 조건을 찾아봅니다.</span><em>바로 해 보기 →</em></button></li></ol><p class="note">논문 결과: 한 모델에서 지시에 완성 예시를 더하자 조건을 지킨 비율이 69.5%에서 87.9%로, 빈 틀을 더하자 67.3%에서 87.5%로 올랐습니다.</p></div></section>${saved.recoveryBackups?.length?`<section class="card"><h2>이전에 저장한 기록을 확인해 주세요</h2><p>이전 기록을 읽지 못해 기본 학습 화면으로 열었습니다. 읽지 못한 원본은 그대로 보관했습니다. 먼저 파일로 내려받아 확인해 주세요.</p><button id="download-recovery">읽지 못한 저장 기록 원본 내려받기</button></section>`:""}<section class="card start-card"><p class="learning-progress">8차시 중 <strong>${count}차시 완료</strong>${returning&&count<8?' · '+(target+1)+'차시 '+esc(STEP_NAMES[record?.step||0])+'부터 계속할 수 있습니다.':''}</p><h2>${count===8?'모든 차시의 활동을 마쳤습니다':returning?'하던 곳에서 이어서 해 보세요':'하루 한 차시, 약 20분'}</h2><p>${count===8?'배움 확인에서 사후 평가를 진행하거나, 필요한 차시를 다시 살펴보세요.':returning?esc(COURSE[target].title):'차시마다 문제를 먼저 풀어 보고, 설명을 읽은 뒤, 직접 요청을 쓰고 고칩니다. 한 번에 끝내지 않아도 됩니다. 여러 날에 나누어 공부하고, 멈춘 곳에서 이어서 할 수 있습니다.'}</p><div class="actions"><button id="resume-learning" class="${count===8?'':'primary'}">${resumeLabel}</button><button id="assess-from-home" class="${count===8?'primary':''}">${count===8?'사후 평가 보기':'학습 전후 평가'}</button>${!s.assessments.pre?.submitted&&!returning?'<button id="baseline-start">사전 평가 먼저 하기</button>':''}</div>${!s.assessments.pre?.submitted&&!returning?'<p class="note">배우기 전과 후의 실력을 비교하고 싶다면 사전 평가부터 보세요. 객관식 6문항과 직접 쓰는 과제 1개로 되어 있으며, 10~15분 정도 걸릴 것으로 예상합니다. 평가 없이 바로 학습을 시작해도 됩니다.</p>':''}<p class="note">입력한 답과 진행 단계는 이 브라우저에 자동 저장됩니다.</p></section><div class="section-title"><h2>전체 학습 과정</h2><span class="note">차시를 골라 시작할 수도 있습니다.</span></div><div class="course-grid">${COURSE.map((c,i)=>{const r=s.lessons[i];return `<button class="course-card" data-lesson="${i}"><span class="tag">${i+1}차시 · 약 20분</span><h2>${esc(c.title)}</h2><p>${esc(c.question)}</p><strong>${r?.completed?(r.reviewNeeded?'활동 완료, 복습 필요':'활동 완료'):r?'진행 중: '+STEP_NAMES[r.step||0]:'시작 전'}</strong></button>`}).join('')}</div><section class="card"><h2>답안과 수정 과정을 보관하세요</h2>${saved.learningArchives?.length?'<p>이전 과정의 답안도 전체 기록 백업에 포함됩니다.</p>':''}<p>처음 고른 답과 다시 푼 답은 따로 저장됩니다. 처음 쓴 글과 고친 이유도 남길 수 있습니다. 다른 기기나 브라우저에서 이어 하려면 먼저 백업을 내려받아 주세요. HTML 파일을 옮길 때도 백업이 필요합니다.</p><div class="actions"><button id="backup-v3">전체 기록 백업</button><label class="import-label">학습 백업 불러오기<input id="restore-v3" type="file" accept=".json,application/json"></label></div><p class="note">백업을 불러오면 현재 버전의 학습 기록이 백업 내용으로 바뀝니다. 이전 버전의 답안과 응답 비교 기록은 그대로 남습니다. ‘나의 실험’ 기록은 해당 화면에서 따로 백업하고 불러올 수 있습니다.</p></section>`;
 if($('#download-recovery'))$('#download-recovery').onclick=()=>download('prompt-lab-storage-recovery.json',saved.recoveryBackups.at(-1).raw,'application/json');document.querySelectorAll('[data-try]').forEach(el=>el.onclick=()=>{if(el.dataset.try==='2'){go('lab');return;}launchLesson(Number(el.dataset.try));changeStep(3);});$('#resume-learning').onclick=()=>launchLesson(target);$('#assess-from-home').onclick=()=>go('assessment');if($('#baseline-start'))$('#baseline-start').onclick=()=>beginExam('pre');
 document.querySelectorAll('[data-lesson]').forEach(el=>el.onclick=()=>launchLesson(Number(el.dataset.lesson)));$('#backup-v3').onclick=exportBackup;$('#restore-v3').onchange=restoreBackup;
}

function examForm(kind,s=learningState()){return kind==='delayed'?'C':s.order[kind==='pre'?0:1];}
function shuffledOptions(){const a=[0,1,2];for(let i=2;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function examScore(e){return e?.submitted?EXAMS[e.form].reduce((n,q)=>n+(e.answers[q.id]===q.key?1:0),0):null;}
function contamination(kind){const s=learningState();const labels=[];
 if(kind==='pre'&&(Object.keys(s.lessons).length||Object.keys(saved.course20||{}).length||Object.keys(saved.course||{}).length||Object.keys(saved.cases||{}).length||saved.draft))labels.push('학습 또는 연습 기록 있음');
 if(kind==='pre'&&Array.isArray(saved.learningArchives)&&saved.learningArchives.some(a=>Object.keys(a.lessons||{}).length||Object.keys(a.assessments||{}).length||a.exposures?.length))labels.push('이전 버전의 학습 또는 평가 기록 있음');
 if(kind==='pre'&&saved.recoveryBackups?.length)labels.push('복구가 필요한 이전 저장 기록 있음');
 if(kind==='pre'&&s.events.some(e=>e.type==='reference-open'))labels.push('사전 평가 전에 비교 또는 연습 화면을 열어 봄');
 const started=s.assessments[kind]?.started;if(started&&s.events.some(e=>['reference-open','lesson-open'].includes(e.type)&&Date.parse(e.at)>=Date.parse(started)))labels.push('평가 시작 후 학습 자료 열람');
 if(s.exposures.length)labels.push('평가 해설을 미리 열었음');if(kind==='delayed'&&Object.values(s.assessments).some(e=>e.aiReviews?.length))labels.push('평가 답안에 대한 AI 검토를 미리 봄');return labels;
}
function beginExam(kind){const s=learningState();if(s.assessments[kind]?.submitted){notify('이미 제출한 평가입니다. 결과는 평가 목록에서 확인할 수 있습니다.');return;}
 if(kind==='delayed'&&!s.assessments.post?.submitted){notify('사후 평가를 먼저 제출해 주세요.');return;}
 const e=s.assessments[kind]||(s.assessments[kind]={form:examForm(kind),started:stamp(),answers:{},artifact:'',step:0,flags:contamination(kind)});
 if(!e.optionOrders)e.optionOrders=Object.fromEntries(EXAMS[e.form].map(q=>[q.id,shuffledOptions()]));
 if(kind==='pre')s.preDecision={at:stamp(),choice:'assessment'};examView=kind;examStep=e.step||0;page='assessment';persist();render();focusLearning();
}
function renderAssessment(){if(typeof syncNavigation==='function')syncNavigation();if(examView){renderExam();return;}const s=learningState(),pre=s.assessments.pre,post=s.assessments.post,delayed=s.assessments.delayed;
 $('#main').innerHTML=`<div class="learning-shell"><p class="eyebrow">배움 확인 · 학습 전후 비교</p><h1 id="learning-heading" tabindex="-1">배운 내용을<br>새 문제에도 적용할 수 있을까요?</h1><p>학습 전과 후, 그리고 며칠 뒤에 새로운 문제를 풀어 보세요. 점수가 어떻게 달라졌는지 비교할 수 있습니다.</p><div class="card"><h2>평가 방법</h2><p>각 평가는 객관식 6문항과 직접 쓰는 과제 1개로 되어 있습니다. 10~15분 정도 걸릴 것으로 예상하며, 차시 학습 시간과는 따로 계산합니다. 제출한 답안은 고칠 수 없으니 제출하기 전에 확인해 주세요. 정답과 해설은 제출한 뒤 원할 때 열어 볼 수 있습니다.</p><p class="note">직접 쓴 답안은 자동으로 점수를 매기지 않습니다. 제출 후 아래 채점표를 보며 스스로 점검하거나, 다른 사람에게 검토를 부탁할 수 있습니다.</p><div class="assessment-grid">${['pre','post','delayed'].map((k,i)=>{const e=s.assessments[k],disabled=k==='delayed'&&!post?.submitted;return `<section class="assessment-card"><h3>${['사전 평가','사후 평가','지연 평가'][i]}</h3><p>${['배우기 전에 봅니다','과정을 마친 뒤 봅니다','사후 평가 3~7일 뒤에 봅니다'][i]}</p>${e?.submitted?`<strong>객관식 ${examScore(e)} / 6</strong><p class="note">제출 ${esc(new Date(e.submitted).toLocaleDateString('ko-KR'))}</p>`:`<button data-exam="${k}" ${disabled?'disabled':''}>${e?'이어서 응시':'평가 시작'}</button>`}</section>`}).join('')}</div>${pre?.submitted&&post?.submitted?`<div class="result"><strong>객관식 변화: ${examScore(post)-examScore(pre)>0?'+':''}${examScore(post)-examScore(pre)}점 / 6점</strong><p>아래 항목별 결과에서 다시 살펴볼 내용을 찾아보세요.</p></div>`:''}${post?.submitted?`<p class="note">사후 평가를 제출한 지 ${Math.max(0,Math.floor((Date.now()-Date.parse(post.submitted))/86400000))}일이 지났습니다. 지연 평가는 사후 평가 3~7일 뒤에 보는 것을 권장하며, 더 일찍 보더라도 실제 간격이 기록됩니다.</p>`:''}</div><section class="card"><h2>항목별 결과와 답안</h2><p>각 평가에서 어떤 문제를 맞혔는지 비교해 보세요. 직접 쓴 답안은 채점표와 함께 내려받을 수 있습니다.</p>${assessmentTable(s)}<div class="actions"><button id="export-study">평가 기록 JSON</button><button id="export-study-csv">객관식 문항별 CSV</button><button id="export-review">작성 답안과 채점표</button></div><p class="note">직접 쓴 답안에 개인정보를 넣지 마세요. 답안 파일은 직접 내려받아 공유할 수 있으며 앱이 다른 사람에게 전송하지는 않습니다. 스스로 매긴 점수와 다른 사람이 매긴 점수는 구분해서 기록하세요.</p></section><section class="card"><h2>해설은 언제 보는 게 좋을까요?</h2><p>스스로 얼마나 기억하는지 확인하려면 지연 평가까지 마친 다음 해설을 보는 편이 좋습니다. 먼저 열어 봐도 되지만, 이후 답에 영향을 줄 수 있어 열람 기록이 남습니다. 평가 중 다른 자료를 봤거나 도움을 받았다면 제출할 때 함께 알려 주세요.</p><button id="reveal-exams">제출한 평가의 답안과 해설 열기</button><div id="exam-solutions"></div></section><section id="ratings-panel" class="card"></section></div>`;
 renderRatings();document.querySelectorAll('[data-exam]').forEach(el=>el.onclick=()=>beginExam(el.dataset.exam));
 $('#export-study').onclick=()=>download('prompt-lab-assessment.json',JSON.stringify(studyExport(),null,2),'application/json');
 $('#export-study-csv').onclick=()=>download('prompt-lab-assessment-items.csv','\uFEFF'+studyCSV(),'text/csv;charset=utf-8');
 $('#export-review').onclick=()=>download('prompt-lab-independent-review.md',reviewPacket());
 $('#reveal-exams').onclick=()=>{if(!Object.values(s.assessments).some(e=>e.submitted)){notify('제출한 평가가 없습니다.');return;}if(!s.assessments.delayed?.submitted&&!confirm('지연 평가를 보기 전에 해설을 열면, 그 평가의 점수가 영향을 받을 수 있습니다. 해설을 열었다는 기록을 남기고 열까요?'))return;
 s.exposures.push({at:stamp(),forms:Object.values(s.assessments).filter(e=>e.submitted).map(e=>e.form)});persist();$('#exam-solutions').innerHTML=Object.entries(s.assessments).filter(([,e])=>e.submitted).map(([kind,e])=>`<h3>${{pre:'사전',post:'사후',delayed:'지연'}[kind]} · ${e.form}형</h3>${EXAMS[e.form].map(q=>`<article class="feedback"><h4>${esc(q.stem)}</h4><p>내 답: ${esc(q.options[e.answers[q.id]])}</p><p><strong>정답: ${esc(q.options[q.key])}</strong></p><p>${esc(q.why)}</p></article>`).join('')}<h4>직접 작성한 답안</h4><pre class="response">${esc(e.artifact)}</pre>`).join('');};
}
function assessmentTable(s){return `<div class="tablewrap"><table><caption>항목별 결과</caption><thead><tr><th>평가한 능력</th><th>사전 평가</th><th>사후 평가</th><th>지연 평가</th></tr></thead><tbody>${SKILLS.map((sk,i)=>`<tr><th>${sk}</th>${['pre','post','delayed'].map(k=>{const e=s.assessments[k];return `<td>${e?.submitted?(e.answers[EXAMS[e.form][i].id]===EXAMS[e.form][i].key?'정답':'다시 확인 필요'):'아직 보지 않음'}</td>`}).join('')}</tr>`).join('')}</tbody></table></div>${Object.entries(s.assessments).filter(([,e])=>e.submitted).map(([k,e])=>`<p class="note">${{pre:'사전',post:'사후',delayed:'지연'}[k]} 응시 기록: ${esc([...e.flags,...(e.help==='yes'?['외부 도움 사용']:e.help==='unknown'?['외부 도움 불확실']:[]),...(e.kind==='post'&&e.lessonsCompleted<8?['과정 일부만 진행']:[])].join(' · ')||'기록된 참고 사항 없음')} ${e.delayDays!==undefined?'· 사후 평가와의 간격 '+e.delayDays.toFixed(1)+'일':''}</p>`).join('')}`;}
function renderExam(){if(typeof syncNavigation==='function')syncNavigation();const s=learningState(),e=s.assessments[examView],qs=EXAMS[e.form],q=qs[examStep];
 $('#main').innerHTML=`<div class="learning-shell"><div class="section-title"><button id="exit-exam">저장하고 평가 목록으로</button><span class="note">답안은 자동 저장되며, 제출하기 전까지 고칠 수 있습니다</span></div><p class="eyebrow">${{pre:'사전',post:'사후',delayed:'지연'}[examView]} 평가 · ${e.form}형</p><h1 id="learning-heading" tabindex="-1">${examStep<6?`판단 문제 ${examStep+1} / 6`:'마지막 과제: 직접 작성하기'}</h1><div class="card">${q?questionMarkup(q,{selected:e.answers[q.id]},'exam',e.optionOrders?.[q.id]||[0,1,2]):`<div class="task-brief">${esc(PRODUCTIONS[e.form])}</div><p>지금 기억나는 내용을 바탕으로 써 보세요. 스스로 풀 수 있는지 확인하는 평가이므로, 가능하면 학습 해설이나 이전 답을 보지 않고 작성해 주세요.</p><label class="field" for="exam-artifact">직접 작성한 답안</label><textarea id="exam-artifact" class="large" maxlength="12000">${esc(e.artifact)}</textarea><fieldset><legend>문제를 풀면서 이전 답이나 해설을 봤거나, AI나 다른 사람의 도움을 받았나요?</legend>${[['no','아니요'],['yes','예'],['unknown','잘 모르겠습니다']].map(([v,t])=>`<label class="answer-option"><input name="exam-help" type="radio" data-help="${v}" ${e.help===v?'checked':''}>${t}</label>`).join('')}</fieldset><p class="note">직접 쓴 답안은 저장만 하고 자동으로 채점하지 않습니다. 모든 문제에 답했는지 확인한 뒤 제출해 주세요. 제출 후에는 답안을 고칠 수 없습니다.</p>`}</div><div class="lesson-nav"><button id="exam-prev" ${examStep===0?'disabled':''}>이전</button><span>${examStep+1} / 7</span><button class="primary" id="exam-next">${examStep===6?'최종 제출':'다음'}</button></div></div>`;
 $('#exit-exam').onclick=()=>{examView=null;renderAssessment();};document.querySelectorAll('[data-answer]').forEach(el=>el.onchange=()=>{e.answers[q.id]=Number(el.value);persist();});
 if($('#exam-artifact'))$('#exam-artifact').oninput=ev=>{e.artifact=ev.target.value;persist();};document.querySelectorAll('[data-help]').forEach(el=>el.onchange=()=>{e.help=el.dataset.help;persist();});
 $('#exam-prev').onclick=()=>{examStep--;e.step=examStep;persist();renderExam();focusLearning();};
 $('#exam-next').onclick=()=>{if(examStep<6){if(!Number.isInteger(e.answers[q.id])){notify('답을 하나 선택해 주세요.');return;}examStep++;e.step=examStep;persist();renderExam();focusLearning();return;}
 const error=examSubmissionError(e);if(error){notify(error);return;}if(!confirm('제출하면 답안을 고칠 수 없습니다. 이대로 제출할까요?'))return;
 submitExam(examView);examView=null;renderAssessment();focusLearning();};
}
function examSubmissionError(e){if(EXAMS[e.form].some(q=>!Number.isInteger(e.answers[q.id])||e.answers[q.id]<0||e.answers[q.id]>=q.options.length))return '객관식 6문항에 모두 답해 주세요.';if(!e.artifact.trim())return '마지막 과제의 답안을 적어 주세요. 어렵다면 어디에서 막혔는지 써도 됩니다.';if(!['yes','no','unknown'].includes(e.help))return '도움을 받았는지 선택해 주세요.';return '';}
function submitExam(kind){const s=learningState(),e=s.assessments[kind];if(!e||e.submitted||examSubmissionError(e))return false;
 e.kind=kind;e.submitted=stamp();e.lessonsCompleted=Object.values(s.lessons).filter(r=>r.completed).length;e.flags=[...new Set([...e.flags,...contamination(kind)])];
 if(kind==='delayed')e.delayDays=(Date.parse(e.submitted)-Date.parse(s.assessments.post.submitted))/86400000;persist();return true;}
function studyExport(){const s=learningState();return {schema:'prompt-lab-study-1',version:LEARNING_VERSION,exported:stamp(),scope:'작업 조건, 정보 보존, 구조 전달, 충돌 점검, 응답 검사, 비교 설계. 학습 효과는 검증되지 않음',order:s.order,preDecision:s.preDecision||null,assessments:s.assessments,ratings:s.ratings||[],exposures:s.exposures,lessons:s.lessons,scoring:{objectiveMax:6,artifactMax:8,artifact:'독립 검토자가 채점. 자동 점수 없음',formEquivalence:'미검증'},notes:'시작부터 제출까지의 간격은 휴식을 포함한 경과 시간이며 활동 시간이 아닙니다. 개인의 점수 변화만으로 학습 효과를 단정할 수 없습니다.'};}
function csvCell(v){let t=String(v??'');if(/^[=+\-@\t\r]/.test(t))t="'"+t;return '"'+t.replace(/"/g,'""')+'"';}
function studyCSV(){const rows=[['version','phase','form','item','skill','answer_index','correct','started','submitted','elapsed_minutes_including_breaks','delay_days','help','flags']];Object.entries(learningState().assessments).forEach(([k,e])=>{if(!e.submitted)return;EXAMS[e.form].forEach(q=>rows.push([LEARNING_VERSION,k,e.form,q.id,SKILLS[q.skill],e.answers[q.id],e.answers[q.id]===q.key?1:0,e.started,e.submitted,((Date.parse(e.submitted)-Date.parse(e.started))/60000).toFixed(2),e.delayDays??'',e.help,e.flags.join('|')]));});return rows.map(r=>r.map(csvCell).join(',')).join('\r\n');}
function reviewPacket(){const s=learningState();return '# 작성 답안 검토 자료\n\n채점하는 사람은 가능하면 이 답안이 학습 전에 쓴 것인지 후에 쓴 것인지 모르는 상태에서 평가해 주세요. 이 문서에는 평가 시점을 표시하지 않았습니다. 다만 A, B, C형의 차이로 시점을 짐작할 수 있으므로 완전히 가려진 것은 아닙니다. 답안에 이름을 적지 마세요.\n\n## 공통 기준: 기준 4개, 기준마다 0~2점, 합계 8점\n'+RUBRIC.map(([t,d])=>`- ${t}: ${d}`).join('\n')+'\n\n두 사람이 검토한다면 먼저 각자 채점해서 점수를 기록한 뒤, 서로 다른 부분을 논의해 주세요. 본인이 직접 채점한 결과는 다른 사람의 검토 결과와 구분해서 기록해 주세요.\n\n'+Object.values(s.assessments).filter(e=>e.submitted).sort((a,b)=>a.form.localeCompare(b.form)).map(e=>`## 답안 ${e.form}\n\n과제: ${PRODUCTIONS[e.form]}\n\n답안:\n${e.artifact}\n\n|항목|점수(0/1/2)|답안 근거|\n|---|---|---|\n${RUBRIC.map(([t])=>`|${t}|||`).join('\n')}\n\n검토자 코드: ____ / 합계: ____ / 의견: ____\n`).join('\n');}
function exportBackup(){download('prompt-lab-full-backup.json',JSON.stringify({schema:'prompt-lab-backup-3',exported:stamp(),state:saved},null,2),'application/json');}
function ratingError(r){if(!['self','independent'].includes(r.type)||!r.reviewer?.trim()||!['A','B','C'].includes(r.form))return '검토 방식과 답안을 선택하고, 검토자 코드를 적어 주세요.';if(!Array.isArray(r.scores)||r.scores.length!==4||r.scores.some(n=>!Number.isInteger(n)||n<0||n>2))return '기준 4개에 모두 0~2점 가운데 하나를 골라 주세요.';if(!Array.isArray(r.evidence)||r.evidence.length!==4||r.evidence.some(t=>!t.trim()))return '왜 그 점수를 주었는지 답안의 내용을 들어 설명해 주세요.';return '';}
function renderRatings(){const s=learningState(),submitted=Object.values(s.assessments).filter(e=>e.submitted);const panel=$('#ratings-panel');if(!panel)return;
 panel.innerHTML=`<h2>직접 쓴 답안 검토하기</h2><p>다른 사람에게 검토를 부탁하려면 위의 ‘작성 답안과 채점표’를 내려받아 전달하세요. 여기에는 검토받은 점수와 이유를 적습니다. 본인이 채점했거나 검토자가 학습 전후의 답안이라는 사실을 알고 있었다면, 그 점도 함께 적어 주세요.</p><details><summary>채점 기준 4개와 점수의 의미</summary>${RUBRIC.map(([t,d])=>`<h3>${esc(t)}</h3><p class="review-text">${esc(d)}</p>`).join('')}</details>${submitted.length?`<label class="field" for="rating-form">검토할 답안</label><select id="rating-form">${submitted.map(e=>`<option value="${e.form}">${e.form}형</option>`).join('')}</select><label class="field" for="rating-type">검토 방식</label><select id="rating-type"><option value="">선택하세요</option><option value="self">직접 채점</option><option value="independent">다른 사람의 채점 결과</option></select><label class="field" for="rating-reviewer">검토자 코드 (실명 대신 R1처럼 적어 주세요)</label><input id="rating-reviewer" type="text" maxlength="40">${RUBRIC.map(([t],i)=>`<label class="field" for="rating-${i}">${i+1}. ${esc(t)}</label><select id="rating-${i}"><option value="">점수 선택</option><option value="0">0점</option><option value="1">1점</option><option value="2">2점</option></select><label class="field" for="rating-evidence-${i}">점수의 근거</label><textarea id="rating-evidence-${i}" maxlength="3000" placeholder="점수를 준 이유를 적어 주세요. 답안의 해당 문장이나 빠뜨린 조건을 짚어 주면 좋습니다."></textarea>`).join('')}<button id="save-rating" class="primary">검토 기록 추가</button><p class="note">점수를 고칠 때는 새 기록을 추가해 주세요. 같은 사람이 같은 답안을 같은 방식으로 다시 평가했다면, 가장 최근 점수를 사용하고 이전 기록도 남겨 둡니다.</p>`:'<p>직접 작성한 답안을 제출하면 검토 결과를 남길 수 있습니다.</p>'}${submitted.map(e=>aiReviewBox('exam-ai-'+e.form,e,`AI에게 검토받기: ${e.form}형 작성 답안 (선택)`)).join('')}<div id="rating-list">${(s.ratings||[]).length?`<div class="tablewrap"><table><thead><tr><th>답안</th><th>검토자</th><th>방식</th><th>점수 / 8</th><th>기록</th></tr></thead><tbody>${s.ratings.map((r,i)=>`<tr><td>${esc(r.form)}</td><td>${esc(r.reviewer)}</td><td>${r.type==='self'?'직접 채점':'다른 사람 검토'}</td><td>${r.scores.reduce((a,b)=>a+b,0)}</td><td>${i+1} · ${esc(new Date(r.at).toLocaleDateString('ko-KR'))}</td></tr>`).join('')}</tbody></table></div><p class="note">다시 검토할 때는 점수와 함께 기록한 이유도 비교해 보세요.</p>`:''}</div>`;
 submitted.forEach(e=>bindAiReview('exam-ai-'+e.form,e,()=>hasContent(e.artifact)?aiReviewPrompt(PRODUCTIONS[e.form],RUBRIC.map(([t,d])=>t+'\n'+d),e.artifact,'# 점수\n기준마다 0점, 1점, 2점 가운데 하나를 고르고, 위 설명에 맞춰 판단해 주세요.'):''));
 if($('#save-rating'))$('#save-rating').onclick=()=>{const r={form:$('#rating-form').value,type:$('#rating-type').value,reviewer:$('#rating-reviewer').value.trim(),scores:RUBRIC.map((_,i)=>$('#rating-'+i).value===''?null:Number($('#rating-'+i).value)),evidence:RUBRIC.map((_,i)=>$('#rating-evidence-'+i).value.trim()),at:stamp()};const err=ratingError(r);if(err){notify(err);return;}s.ratings=s.ratings||[];s.ratings.push(r);const stored=persist();renderRatings();notify(stored?'검토 기록을 추가했습니다. 평가 기록 JSON에도 포함됩니다.':'화면에는 기록했지만 이 기기에 저장하지 못했습니다. 평가 기록 JSON을 내려받아 보관해 주세요.');};
}
function validateLearningBackup(data){
 if(data?.schema!=='prompt-lab-backup-3'||data.state?.learningV3?.version!==LEARNING_VERSION)throw Error('지금 과정과 버전이 같은 전체 백업 파일이 아닙니다.');
 const v=data.state.learningV3;if(v.lastLesson!==undefined&&(!Number.isInteger(v.lastLesson)||v.lastLesson<0||v.lastLesson>7))throw Error('이어서 학습 위치가 올바르지 않습니다.');const obj=x=>x&&typeof x==='object'&&!Array.isArray(x);const str=(x,n=12000)=>typeof x==='string'&&x.length<=n;const date=x=>str(x,80)&&Number.isFinite(Date.parse(x));
 if(!obj(v.lessons)||!obj(v.assessments)||!Array.isArray(v.order)||v.order.length!==2||!v.order.every(f=>typeof f==='string')||!['AB','BA'].includes(v.order.join(''))||!date(v.created)||!Array.isArray(v.exposures)||!Array.isArray(v.events))throw Error('백업 구조가 올바르지 않습니다.');
 for(const e of v.events){if(!obj(e)||!date(e.at)||!['lesson-open','reference-open'].includes(e.type))throw Error('활동 이력의 형식이나 날짜가 올바르지 않습니다.');if(e.type==='lesson-open'&&(!Number.isInteger(e.lesson)||e.lesson<1||e.lesson>8))throw Error('활동 이력의 차시가 올바르지 않습니다.');if(e.type==='reference-open'&&!['lab','editor','experiment','about'].includes(e.page))throw Error('활동 이력의 화면이 올바르지 않습니다.');}
 if(v.preDecision!==undefined&&(!obj(v.preDecision)||!date(v.preDecision.at)||!['skipped','assessment'].includes(v.preDecision.choice)))throw Error('사전 평가 선택 기록이 올바르지 않습니다.');
 for(const [i,r] of Object.entries(v.lessons)){if(!/^[0-7]$/.test(i)||!obj(r)||!obj(r.answers)||!obj(r.fields)||!Array.isArray(r.evidence)||r.evidence.length!==3||r.evidence.some(t=>!str(t,3000))||!Array.isArray(r.history)||!Number.isInteger(r.step)||r.step<0||r.step>4||!date(r.started))throw Error('차시 기록이 올바르지 않습니다.');
 for(const [k,t] of Object.entries(r.fields))if(!['draft','final','reason','takeaway'].includes(k)||!str(t))throw Error('답안 필드가 올바르지 않습니다.');
 for(const [id,a] of Object.entries(r.answers)){const q=PRACTICE[+i].find(q=>q.id===id);if(!q||!obj(a)||a.selected!==undefined&&(!Number.isInteger(a.selected)||a.selected<0||a.selected>2)||a.attempts!==undefined&&(!Array.isArray(a.attempts)||a.attempts.some(t=>!Number.isInteger(t.choice)||t.choice<0||t.choice>2||!date(t.at))))throw Error('판단 기록이 올바르지 않습니다.');}
 if(r.firstDraft!==undefined&&!str(r.firstDraft))throw Error('초안이 올바르지 않습니다.');if(r.draftLocked&&!date(r.draftLocked)||r.completed&&!date(r.completed)||r.solutionViewed&&!date(r.solutionViewed))throw Error('차시 시간이 올바르지 않습니다.');
 if(r.achievement!==undefined&&r.achievement!=='unverified')throw Error('성취 상태가 올바르지 않습니다.');if(r.aiReviews!==undefined&&!aiReviewsOk(r.aiReviews))throw Error('AI 검토 기록이 올바르지 않습니다.');
 if(r.transfer!==undefined){const t=r.transfer;if(!TRANSFER_CHECKS[i]||!obj(t)||!Array.isArray(t.answers)||t.answers.length!==3||t.answers.some(v=>v!==null&&typeof v!=='boolean')||!Array.isArray(t.attempts))throw Error('응답 판정 기록이 올바르지 않습니다.');for(const a of t.attempts)if(!obj(a)||!date(a.at)||!Array.isArray(a.answers)||a.answers.length!==3||a.answers.some(v=>typeof v!=='boolean'))throw Error('응답 판정 이력이 올바르지 않습니다.');}
 if(r.completed&&(PRACTICE[i].some(q=>!r.answers[q.id]?.attempts?.length)||!r.draftLocked||!r.history.length||!hasContent(r.fields.takeaway)||!transferReady(r,i)))throw Error('완료한 차시의 필수 활동 기록이 없습니다.');
 for(const h of r.history)if(!obj(h)||!date(h.at)||!str(h.final)||!str(h.reason)||!Array.isArray(h.evidence)||h.evidence.length!==3||h.evidence.some(t=>!str(t,3000)))throw Error('수정 이력이 올바르지 않습니다.');}
 for(const [k,e] of Object.entries(v.assessments)){if(!['pre','post','delayed'].includes(k)||!obj(e)||e.form!==examForm(k,v)||!obj(e.answers)||!str(e.artifact)||!date(e.started)||!Number.isInteger(e.step)||e.step<0||e.step>6||!Array.isArray(e.flags)||e.flags.some(t=>!str(t,200)))throw Error('평가 기록이 올바르지 않습니다.');
 for(const [id,a] of Object.entries(e.answers))if(!EXAMS[e.form].some(q=>q.id===id)||!Number.isInteger(a)||a<0||a>2)throw Error('평가 답안이 올바르지 않습니다.');if(e.submitted&&(!date(e.submitted)||examSubmissionError(e)))throw Error('제출된 평가가 불완전합니다.');if(e.delayDays!==undefined&&(!Number.isFinite(e.delayDays)||e.delayDays<0))throw Error('평가 간격이 올바르지 않습니다.');if(e.aiReviews!==undefined&&!aiReviewsOk(e.aiReviews))throw Error('AI 검토 기록이 올바르지 않습니다.');}
 if(v.assessments.delayed&&!v.assessments.post?.submitted)throw Error('지연 평가에 필요한 사후 기록이 없습니다.');
 for(const e of v.exposures)if(!obj(e)||!date(e.at)||!Array.isArray(e.forms)||e.forms.some(f=>!['A','B','C'].includes(f)))throw Error('해설 노출 기록이 올바르지 않습니다.');
 if(v.ratings!==undefined){if(!Array.isArray(v.ratings))throw Error('검토 기록이 올바르지 않습니다.');for(const r of v.ratings)if(!obj(r)||!str(r.reviewer,40)||!Array.isArray(r.evidence)||r.evidence.some(t=>!str(t,3000))||ratingError(r)||!date(r.at)||!Object.values(v.assessments).some(e=>e.submitted&&e.form===r.form))throw Error('검토 기록이 올바르지 않습니다.');}
 for(const e of Object.values(v.assessments))if(e.optionOrders!==undefined){if(!obj(e.optionOrders))throw Error('선택지 순서가 올바르지 않습니다.');for(const q of EXAMS[e.form])if(!Array.isArray(e.optionOrders[q.id])||[...e.optionOrders[q.id]].sort().join('')!=='012')throw Error('선택지 순서가 올바르지 않습니다.');}
 // Keep only recognized keys; never merge untrusted prototype keys into app state.
 return JSON.parse(JSON.stringify(v),(key,value)=>['__proto__','constructor','prototype'].includes(key)?undefined:value);
}
async function restoreBackup(ev){
 const file=ev.target.files?.[0];if(!file)return;
 try{
  if(file.size>5000000)throw Error('백업은 5MB 이하만 불러올 수 있습니다.');
  const v=validateLearningBackup(JSON.parse(await file.text()));
  if(!confirm('지금의 학습 기록을 백업 파일의 기록으로 바꿀까요? 지금 기록이 필요하다면 먼저 백업해 두세요. 이전 과정의 기록은 그대로 남습니다.'))return;
  const previous=saved.learningV3;
  try{saved.learningV3=v;lessonIndex=-1;examView=null;go('course');}
  catch(error){saved.learningV3=previous;lessonIndex=-1;examView=null;try{go('course');}catch{}throw error;}
  const stored=persist();notify(stored?'학습 기록을 복원했습니다.':'화면에는 복원했지만 이 기기에 저장하지 못했습니다. 백업 파일을 잘 보관해 주세요.');
 }catch(e){const message=e?.name==='SyntaxError'?'JSON 형식이 올바르지 않습니다. 앱에서 내려받은 학습 백업 파일을 선택해 주세요.':typeof e?.message==='string'&&/[가-힣]/.test(e.message)?e.message:'파일을 읽거나 복원 화면을 표시하지 못했습니다. 기존 기록은 유지했습니다. 백업 파일을 확인해 주세요.';notify('복원하지 않았습니다. '+message);}
 finally{ev.target.value='';}
}
