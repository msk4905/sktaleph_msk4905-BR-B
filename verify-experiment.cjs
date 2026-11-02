const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const ctx={localStorage:{getItem:()=>null},console};vm.createContext(ctx);vm.runInContext(fs.readFileSync('dist/experiment.js','utf8'),ctx);const run=s=>vm.runInContext(s,ctx);
assert.equal(run('experimentProblems({...experiments.draft,total:5}).length'),1);
assert.equal(run('experimentProblems(experiments.draft).length'),0);
assert.equal(run('inspectExperimentText("모임을 열어요. 오늘 만나요.\\n\\n책을 가져와요. 함께 읽어요.",experiments.draft).every(x=>x.pass===true)'),true);
assert.equal(run('inspectExperimentText("미완성",experiments.draft)[2].pass'),null);
assert.equal(run('inspectExperimentText("모임을 엽니다. 오늘 만납니다.\\n\\n책을 가져와요. 함께 읽어요.",experiments.draft)[3].pass'),false);
assert.equal(run('experimentPrompts(experiments.draft).example.startsWith(experimentPrompts(experiments.draft).plain)'),true);
run("experiments.runs=[{version:'x',condition:'plain',status:'error'},{version:'x',condition:'plain',status:'completed',flags:[{pass:true},{pass:false},{pass:true},{pass:true}]}]");
assert.equal(run("expSummary({id:'x'})[0].mean"),.75);assert.equal(run("expSummary({id:'x'})[0].attempts"),2);
const handler=require('./api/experiment.js');
let calls=0;global.fetch=async(url,opts)=>{calls++;assert.equal(url,'https://api.openai.com/v1/responses');const b=JSON.parse(opts.body);assert.equal(b.store,false);assert.equal(b.max_output_tokens,1200);return {ok:true,json:async()=>({id:'mock',status:'completed',model:'test-model',output:[{type:'message',content:[{type:'output_text',text:'테스트 응답이에요.'}]}],usage:{total_tokens:20}})};};
async function request(method,body,token='secret'){let status=200,payload;await handler({method,body,headers:{authorization:'Bearer '+token,origin:'https://test.example'}},{setHeader(){},status(n){status=n;return this},json(v){payload=v;return this}});return {status,payload};}
(async()=>{
 delete process.env.OPENAI_API_KEY;assert.equal((await request('GET')).status,503);
 Object.assign(process.env,{OPENAI_API_KEY:'mock-key-not-real',OPENAI_MODEL:'test-model',LAB_ACCESS_TOKEN:'secret',APP_ORIGIN:'https://test.example'});
 assert.equal((await request('GET',null,'bad')).status,401);assert.equal(calls,0);
 assert.equal((await request('GET')).payload.models[0],'test-model');assert.equal(calls,0);
 assert.equal((await request('POST',{model:'bad',prompt:'x'})).status,400);
 assert.equal((await request('POST',{model:'test-model',prompt:'x'.repeat(12001)})).status,400);
 assert.equal((await request('POST',{model:'test-model',prompt:'안내문'})).payload.text,'테스트 응답이에요.');assert.equal(calls,1);
 global.fetch=async()=>({ok:true,json:async()=>({status:'incomplete',output:[],incomplete_details:{reason:'max_output_tokens'}})});
 assert.equal((await request('POST',{model:'test-model',prompt:'x'})).payload.status,'incomplete');
 global.fetch=async()=>{throw Error('contains secret')};const failed=await request('POST',{model:'test-model',prompt:'x'});assert.equal(failed.status,504);assert(!JSON.stringify(failed).includes('secret'));
 console.log('Experiment checks passed: contradictions, scoring, unknowns, denominator, auth, allowlist, payload limits, mocked output, incomplete and timeout. Real API calls: 0.');
})().catch(e=>{console.error(e);process.exitCode=1});
