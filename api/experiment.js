const crypto=require('node:crypto');
const buckets=new Map();
function equal(a,b){return crypto.timingSafeEqual(crypto.createHash('sha256').update(a).digest(),crypto.createHash('sha256').update(b).digest());}
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 const send=(n,v)=>res.status(n).json(v);
 if(!['GET','POST'].includes(req.method))return send(405,{error:'지원하지 않는 요청입니다.'});
 if(!process.env.OPENAI_API_KEY||!process.env.OPENAI_MODEL||!process.env.LAB_ACCESS_TOKEN)return send(503,{error:'서버에 OPENAI_API_KEY, OPENAI_MODEL, LAB_ACCESS_TOKEN을 설정해 주세요.'});
 const auth=req.headers.authorization||'';
 if(!equal(auth,'Bearer '+process.env.LAB_ACCESS_TOKEN))return send(401,{error:'실험 비밀번호를 확인해 주세요.'});
 const models=(process.env.OPENAI_MODEL||'').split(',').map(s=>s.trim()).filter(Boolean);
 if(req.method==='GET')return send(200,{models,provider:'OpenAI',maxOutputTokens:1200});
 if(process.env.APP_ORIGIN&&req.headers.origin!==process.env.APP_ORIGIN)return send(403,{error:'허용된 앱 주소에서 실행해 주세요.'});
 if(process.env.VERCEL&&!process.env.APP_ORIGIN)return send(503,{error:'서버에 APP_ORIGIN을 설정해 주세요.'});
 let b;try{b=typeof req.body==='string'?JSON.parse(req.body):req.body;}catch{return send(400,{error:'요청 형식이 올바르지 않습니다.'});}
 if(!b||typeof b.prompt!=='string'||!b.prompt.trim()||b.prompt.length>12000||!models.includes(b.model))return send(400,{error:'프롬프트는 1~12,000자이며 서버에 등록한 모델만 사용할 수 있습니다.'});
 // Instance-local backstop only; provider project limits remain necessary.
 const now=Date.now(),entry=buckets.get('owner')||{time:now,n:0};
 if(now-entry.time>60000){entry.time=now;entry.n=0;}
 if(entry.n>=12)return send(429,{error:'호출이 많습니다. 잠시 후 다시 실행해 주세요.'});
 entry.n++;buckets.set('owner',entry);
 try{
 const result=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:'Bearer '+process.env.OPENAI_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model:b.model,input:b.prompt,max_output_tokens:1200,store:false}),signal:AbortSignal.timeout(55000)});
 if(!result.ok)return send(result.status===429?429:502,{error:result.status===401?'서버의 API 키를 확인해 주세요.':result.status===429?'API 사용 한도 또는 요청 빈도를 확인해 주세요.':'API 요청이 실패했습니다. 모델 권한과 API 설정을 확인해 주세요.',upstreamStatus:result.status});
 const data=await result.json();const text=(data.output||[]).filter(x=>x.type==='message').flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('\n');
 return send(200,{text,status:data.status==='completed'&&text?'completed':'incomplete',id:data.id,model:data.model,usage:data.usage||null,incompleteReason:data.incomplete_details?.reason||(!text?'no_text':null),at:new Date().toISOString()});
 }catch(e){return send(504,{error:'응답을 받지 못했습니다. 자동 재시도하지 않습니다. 시간 초과여도 API 비용이 발생했을 수 있습니다.'});}
};
