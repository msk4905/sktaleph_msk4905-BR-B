from pathlib import Path
import zipfile
r=Path(__file__).parent
h=(r/'dist/index.html').read_text(encoding='utf-8')
h=h.replace('<link rel="stylesheet" href="style.css">','<style>'+(r/'dist/style.css').read_text(encoding='utf-8')+'</style>')
for f in ['data.js','course.js','learning-data.js','learning.js','experiment.js','app.js']:
    js=(r/'dist'/f).read_text(encoding='utf-8').replace('</script','<\\/script')
    h=h.replace(f'<script src="{f}"></script>','<script>'+js+'</script>')
(r/'Prompt_Lab.html').write_text(h,encoding='utf-8')
with zipfile.ZipFile(r.parent/'Prompt_Lab_v1.zip','w',zipfile.ZIP_DEFLATED) as z:
    for f in ['Prompt_Lab.html','README.md','evidence.json','build_data.py','verify.cjs','verify-learning.cjs','package.py','verification.json','verification-learning.json','LEARNING_DESIGN.md','VALIDATION_PROTOCOL.md','IMPLEMENTATION_CHECK.md','READING_COMPARISON.html','build-reading.cjs','study-register.csv']:
        z.write(r/f,f)
    for f in ['api/experiment.js','vercel.json','package.json','server.cjs','.env.example','.gitignore','API_SETUP.md','verify-experiment.cjs']:
        z.write(r/f,f)
    for p in (r/'dist').iterdir():z.write(p,'dist/'+p.name)
print('Created Prompt_Lab.html and Prompt_Lab_v1.zip')
