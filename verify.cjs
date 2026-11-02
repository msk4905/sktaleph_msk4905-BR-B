const fs=require('fs'),vm=require('vm'),assert=require('assert');
const nodes=new Map();const get=s=>{if(!nodes.has(s))nodes.set(s,{innerHTML:'',textContent:'',value:'',style:{},focus(){},before(){},showModal(){this.open=true},close(){this.open=false},addEventListener(){},classList:{toggle(){}},scrollIntoView(){}});return nodes.get(s)};
const ctx={document:{querySelector:get,querySelectorAll:()=>[],createElement:()=>({})},localStorage:{getItem:()=>null,setItem(){}},window:{scrollTo(){}},setTimeout(){},clearTimeout(){},console,Blob,URL};vm.createContext(ctx);
vm.runInContext(fs.readFileSync('dist/data.js','utf8')+'\n'+fs.readFileSync('dist/course.js','utf8')+'\n'+fs.readFileSync('dist/app.js','utf8'),ctx);
const run=x=>vm.runInContext(x,ctx);let checks=0;const test=(v,m)=>{assert(v,m);checks++};
test(run('DATA.cases.length')===6,'six cases');
test(get('#onboarding').open===true,'first visit opens onboarding');
run('onboardStep=0;onboardAnswer=true;drawOnboarding()');
test(get('#onboard-content').innerHTML.includes('두 문장을 요청했는데 세 문장'),'practice feedback');
run('onboardStep=2;drawOnboarding()');
test(get('#onboard-content').innerHTML.includes('방법 선택'),'aggregate guidance');
run('closeOnboarding()');test(run('saved.onboardingVersion')===3,'dismissal remembered');
test(get('#onboarding').open===false,'dialog closes');
run('openOnboarding()');test(run('onboardStep')===0,'replay resets guide');
run('closeOnboarding()');

for(let c=0;c<6;c++)for(let j=0;j<2;j++){
 const a=run(`analyze(DATA.cases[${c}].items[${j}].response,true).flags`),b=run(`DATA.cases[${c}].items[${j}].checks`);
 for(let i=0;i<8;i++)test(a[i]===b[i],`original ${c}/${j}/${i}`);
}
test(run('analyze("Q. 무엇을 가져오나요? A. 노트북을 가져와요.").sentences')===2,'QA markers are not sentences');
test(run('analyze("Q. 무엇을 가져오나요? A. 노트북을 가져와요.",true).sentences')===4,'original QA difference retained');
test(run('analyze("").flags.every(v=>v===false)'),'empty is not a pass');
test(run('analyze("끝나지 않은 본문").flags[5]')===null,'unfinished sentence requires review');
test(run('analyze("값은 3.14예요. 확인해요.").sentences')===2,'decimal');
test(run('esc('+JSON.stringify('<script>"&')+')')==='&lt;script&gt;&quot;&amp;','escaping');
for(let c=0;c<6;c++){
 run(`current=${c};stage=1;shown=true;prediction='B';renderLab()`);
 test(get('#feedback').innerHTML.includes('원논문 채점'),'source distinction renders');
 test(get('#feedback').innerHTML.includes('평균 규칙 준수율'),'aggregate renders');
}
run("go('editor')");test(get('#main').innerHTML.includes('생성 결과 아님'),'editor honest');
get('#task').value='연습 과제';get('#template').value='▶ 제목\n[문장]. [문장].';get('#strategy').value='example';get('#example').value='모임을 엽니다.';get('#reason').value='문체를 확인';
run("document.querySelector('#compose').onclick()");test(get('#draftfeedback').innerHTML.includes('충돌'),'style conflict feedback');
run("go('records')");test(get('#main').innerHTML.includes('아직 저장한 기록'),'empty records');
run("go('about')");test(get('#main').innerHTML.includes('앱으로 실력이 늘거나 작업 시간이 줄어드는지는 아직 확인하지 않았습니다'),'limitations');

test(run('COURSE.length')===8,'eight curriculum sessions');
run("courseIndex=-1;go('course')");test(get('#main').innerHTML.includes('여러 날'),'course is default long-form learning');
for(let i=0;i<8;i++){
 run(`openCourse(${i})`);test(get('#main').innerHTML.includes('직접 설계하기'),'independent task renders');
 run(`Object.assign(saved.course20[${i}].fields,{answer0:'분석',answer1:'설계',answer2:'검토'});document.querySelector('#course-draft').onclick()`);
 test(get('#course-review').innerHTML.includes('검토용 해설'),'review unlocked after draft');
 run(`saved.course20[${i}].fields.revision='수정본';saved.course20[${i}].fields.reason='요구와 대조';saved.course20[${i}].fields.counter='';saved.course20[${i}].checks=[0,1,2];document.querySelector('#course-complete').onclick()`);
 test(run(`saved.course20[${i}].status`)==='reviewed','review saved');
}
test(run('Object.keys(validateCourseBackup({format:"prompt-lab-course",version:2,course:saved.course20})).length')===8,'backup roundtrip');
test(run('validateCourseBackup({format:"prompt-lab-course",version:2,course:{0:{fields:{answer0:"x"},checks:[0,0,9],history:[]}}})[0].checks.length')===1,'import checks sanitized');
let rejected=false;try{run('validateCourseBackup({version:99})')}catch(e){rejected=true}test(rejected,'invalid backup rejected');
run("current=0;guesses=[[],[]];renderFeedback()");test(get('#feedback').innerHTML.includes('위반 발견: 0 /'),'blank selection no inflated score');

run('openOnboarding()');
for(let i=0;i<5;i++){
 test(get('#onboard-content').innerHTML.includes(`${i+1} / 5`),'story step indicator');
 run("document.querySelector('#onboard-next').onclick()");
}
test(get('#onboarding').open===false,'last story step closes');
test(run('page')==='course','story leads to curriculum');
test(run('COURSE.every(u=>u.prompts.length===2&&u.minutes==="약 20분"&&u.extra.length>0)'),'short core and optional inquiry');
run("saved.course={0:{fields:{answer0:'이전 답안'}}};courseIndex=-1;renderCourse()");
test(get('#main').innerHTML.includes('이전 과정 기록 내려받기'),'legacy notes retained and accessible');
run('openCourse(0)');test(get('#main').innerHTML.includes('연구에서 확인한 자료'),'brief research evidence visible');
let oldRejected=false;try{run('validateCourseBackup({format:"prompt-lab-course",version:1,course:{}})')}catch(e){oldRejected=true}test(oldRejected,'old tasks cannot silently replace new tasks');
fs.writeFileSync('verification.json',JSON.stringify({passed:checks,sourceRuleDecisions:96,browserQA:'not completed: native browser URL verification blocked',scope:'original source and legacy regression',newModelCalls:0},null,2));console.log(`${checks} checks passed, including 96 original decisions. Browser QA not performed.`);
