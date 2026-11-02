const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const handler=require('./api/experiment');
const root=path.join(__dirname,'dist');
http.createServer(async(req,res)=>{
 if(req.url.split('?')[0]==='/api/experiment'){
  let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>64000){res.writeHead(413);res.end();return;}}
  req.body=body;res.status=n=>{res.statusCode=n;return res;};res.json=x=>res.end(JSON.stringify(x));res.setHeader('Content-Type','application/json');await handler(req,res);return;
 }
 let name;try{name=decodeURIComponent(req.url.split('?')[0]);}catch{res.writeHead(400);res.end();return;}
 const f=path.resolve(root,'.'+(name==='/'?'/index.html':name));
 if(!f.startsWith(root+path.sep)||!fs.existsSync(f)||!fs.statSync(f).isFile()){res.writeHead(404);res.end();return;}
 res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(res);
}).listen(3000,'127.0.0.1',()=>console.log('http://127.0.0.1:3000'));
