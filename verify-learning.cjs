const fs=require('fs'),vm=require('vm'),assert=require('assert');
const nodes=new Map();let storage={},downloads=[];
const get=s=>{if(!nodes.has(s))nodes.set(s,{innerHTML:'',textContent:'',value:'',style:{},focus(){},before(){},showModal(){this.open=true},close(){this.open=false},addEventListener(){},classList:{toggle(){}},scrollIntoView(){}});return nodes.get(s)};
const context={document:{querySelector:get,querySelectorAll:()=>[],createElement:()=>({click(){}})},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},window:{scrollTo(){}},setTimeout(){},clearTimeout(){},console,Blob,URL,confirm:()=>true};
vm.createContext(context);vm.runInContext(['data.js','course.js','learning-data.js','learning.js','app.js'].map(f=>fs.readFileSync('dist/'+f,'utf8')).join('\n'),context);
const run=s=>vm.runInContext(s,context);let checks=0;function ok(v,m){assert(v,m);checks++;}function rejects(s,m){let threw=false;try{run(s)}catch{threw=true}ok(threw,m)}
ok(get('#main').innerHTML.includes('사전 평가 먼저 하기'),'new home is active, not legacy renderer');
run('closeOnboarding()');
ok(run('PRACTICE.length===8 && PRACTICE.every(a=>a.length===3)'),'24 formative items');
ok(run('Object.values(EXAMS).every(a=>a.length===6&&new Set(a.map(q=>q.skill)).size===6)'),'balanced six-skill blueprint');
ok(run('new Set([...PRACTICE.flat(),...Object.values(EXAMS).flat()].map(q=>q.id)).size')===42,'unique immutable item IDs');
ok(run('PRACTICE.flat().every(q=>q.feedback.length===3&&q.feedback.every(x=>x.length>5))'),'every option has its own feedback');
// Assessments: omissions must not become correct by default; final submission immutable.
run("beginExam('delayed')");ok(run('examView')===null,'delayed exam requires post submission');
run("beginExam('pre')");ok(run("examSubmissionError(learningState().assessments.pre)").includes('여섯'),'blank exam blocked');
ok(!get('#main').innerHTML.includes('정답:'),'exam does not leak answer key');
run("const baseline=learningState().assessments.pre;EXAMS[baseline.form].forEach(q=>baseline.answers[q.id]=q.key);baseline.artifact='구조를 정의하고 비교 계획을 작성한 테스트 답안';baseline.help='no'");
ok(run("submitExam('pre')"),'valid first baseline submitted');
ok(run('examScore(baseline)')===6,'score includes six actual choices');
ok(!run("submitExam('pre')"),'duplicate submission prevented');
ok(run('baseline.flags.length')===0,'fresh baseline not contaminated');
ok(run('Object.values(baseline.optionOrders).every(a=>a.length===3&&[...a].sort().join("")==="012")'),'display choice orders are valid permutations');
// All eight workflows: wrong -> feedback -> retry -> independent production -> new exit.
for(let i=0;i<8;i++){
 run(`launchLesson(${i})`);ok(run('lessonStep')===0,'start at diagnosis');
 run("document.querySelector('#lesson-next').onclick()");ok(run('lessonStep')===0,'blank diagnostic blocks progression');
 run(`lessonRecord().answers[PRACTICE[${i}][0].id].selected=(PRACTICE[${i}][0].key+1)%3;document.querySelector('#submit-choice').onclick()`);
 ok(get('#learning-body').innerHTML.includes('해설을 읽고 다시 풀어 보세요.'),'wrong answer gets corrective feedback');
 run(`lessonRecord().answers[PRACTICE[${i}][0].id].selected=PRACTICE[${i}][0].key;document.querySelector('#submit-choice').onclick()`);
 ok(run(`firstCorrect(lessonRecord().answers[PRACTICE[${i}][0].id],PRACTICE[${i}][0])`)===false,'retry never overwrites first attempt');
 run("document.querySelector('#lesson-next').onclick();document.querySelector('#lesson-next').onclick()");ok(run('lessonStep')===2,'concept then practice');
 run(`lessonRecord().answers[PRACTICE[${i}][1].id].selected=PRACTICE[${i}][1].key;document.querySelector('#submit-choice').onclick();document.querySelector('#lesson-next').onclick()`);
 ok(run('lessonStep')===3,'independent artifact follows supported practice');
 run("document.querySelector('#lock-draft').onclick()");ok(!run('lessonRecord().draftLocked'),'empty draft does not unlock worked solution');
 run("saveLessonField('draft','초안: 구조와 충돌의 근거');document.querySelector('#lock-draft').onclick()");
 ok(run('lessonRecord().firstDraft')==='초안: 구조와 충돌의 근거','immutable first draft captured');
 run("saveLessonField('draft','후속 변경');saveLessonField('final','수정한 구조');saveLessonField('reason','충돌을 제거함');document.querySelector('#save-artifact').onclick()");
 ok(run('lessonRecord().history.length')===0,'missing rubric evidence blocks review record');
 run("lessonRecord().evidence=['조건의 근거','수정의 근거','검증의 근거'];document.querySelector('#save-artifact').onclick();document.querySelector('#lesson-next').onclick()");
 ok(run('lessonStep')===4,'all rubric evidence allows exit stage');
 run(`lessonRecord().answers[PRACTICE[${i}][2].id].selected=(PRACTICE[${i}][2].key+1)%3;document.querySelector('#submit-choice').onclick();document.querySelector('#lesson-next').onclick()`);
 ok(!run('lessonRecord().completed'),'blank takeaway prevents completion record');
 run("saveLessonField('takeaway','새 요구를 기준으로 비교하겠습니다');document.querySelector('#lesson-next').onclick()");
 ok(run('lessonRecord().reviewNeeded')===true,'wrong first exit recommends review, not mastery');
 ok(run('lessonRecord().firstDraft')==='초안: 구조와 충돌의 근거','later edits do not rewrite first draft');
}
run("beginExam('post');const postTest=learningState().assessments.post;EXAMS[postTest.form].forEach((q,i)=>postTest.answers[q.id]=i===0?(q.key+1)%3:q.key);postTest.artifact='새 과제의 설계와 비교 계획';postTest.help='no';submitExam('post')");
ok(run('examScore(postTest)')===5,'one incorrect response scores five');
run("learningState().exposures.push({at:stamp(),forms:[baseline.form,postTest.form]});beginExam('delayed')");
ok(run("learningState().assessments.delayed.flags.includes('평가 해설을 미리 열었음')"),'early solution exposure flagged');
run("const delayedTest=learningState().assessments.delayed;EXAMS.C.forEach(q=>delayedTest.answers[q.id]=q.key);delayedTest.artifact='지연 설계';delayedTest.help='yes';submitExam('delayed')");
ok(run('delayedTest.delayDays')<1,'early delayed assessment records actual interval');
ok(run('delayedTest.help')==='yes','external assistance remains in record');
run('examView=null;renderAssessment()');ok(get('#main').innerHTML.includes('객관식 변화: -1점'),'no misleading improvement claim');
ok(run('studyCSV()').split("\r\n").length===19,'export contains 18 submitted item rows');
ok(run('studyExport().scoring.artifactMax')===8,'artifact separate from objective score');
ok(run('reviewPacket().includes("사전 평가")')===false,'review packet omits phase label');
ok(run('ratingError({form:"A",type:"self",reviewer:"R1",scores:[2,2,2,2],evidence:["a","b","c",""]})').includes('근거'),'ratings require supporting evidence');
// Real backup round-trip plus hostile and inconsistent input rejection.
run('const backup={schema:"prompt-lab-backup-3",state:saved};const restored=validateLearningBackup(JSON.parse(JSON.stringify(backup)))');
ok(run('JSON.stringify(restored)===JSON.stringify(saved.learningV3)'),'complete record round-trip, no silent truncation');
rejects('validateLearningBackup({schema:"old"})','old schema not mapped to new tasks');
for(const mutation of ['b.state.learningV3.lessons[0].step=99','b.state.learningV3.lessons[0].answers.d1.attempts[0].choice=9','b.state.learningV3.assessments.pre.answers.A1=20','b.state.learningV3.assessments.pre.form="C"','b.state.learningV3.assessments.delayed.delayDays=-1','b.state.learningV3.assessments.pre.optionOrders[Object.keys(b.state.learningV3.assessments.pre.optionOrders)[0]]=[0,0,1]'])rejects(`(()=>{const b=JSON.parse(JSON.stringify(backup));${mutation};return validateLearningBackup(b)})()`,'malformed backup rejected: '+mutation);
run("saved.course20={0:{fields:{answer0:'옛 기록'}}};saved.cases={};renderRecords();document.querySelector('#clear').onclick()");
ok(run('saved.course20[0].fields.answer0')==='옛 기록','clearing comparisons preserves old course');
ok(run('Object.keys(saved.learningV3.lessons).length')===8,'clearing comparisons preserves new course and exams');
run("const oldStorage=localStorage.setItem;localStorage.setItem=()=>{throw Error('full')};saveLessonField('takeaway','저장 실패 테스트');localStorage.setItem=oldStorage");ok(run('storageOK')===false,'storage failure not silently reported as saved');
run("saved={cases:{}};learningState();go('about');beginExam('pre')");ok(run("learningState().assessments.pre.flags.includes('사전 평가 전에 연구·연습 화면 열람')"),'reading reference without saving still flags baseline');
run("go('lab')");ok(run("contamination('pre').includes('평가 시작 후 학습 자료 열람')"),'opening reference during exam is recorded');
const result={passed:checks,scope:'state transitions, correction history, independent assessment, rubric, import/export, storage failure',humanParticipants:0,learningEffect:'not established',newModelCalls:0};fs.writeFileSync('verification-learning.json',JSON.stringify(result,null,2));console.log(result);

