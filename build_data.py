"""Extract six teaching pairs from the original thesis. No model/API calls."""
import csv,io,json,re,types,zipfile,hashlib
from pathlib import Path
ROOT=Path(__file__).parent
z=zipfile.ZipFile(ROOT.parent/'T10파일.zip')
s=types.ModuleType('original_score');exec(z.read('code/score.py'),s.__dict__)
tasks={t['id']:t for t in json.loads(z.read('code/conditions.json'))['tasks']}
specs=[
('data/set1/run_sheet.txt','T03','C00','C04','ALL','예시가 구조를 보여 줄 때','내용을 길게 설명하는 것과 출력 구조를 보여 주는 것은 다릅니다. 이 사례에서는 예시를 붙인 응답의 원채점 준수 항목이 늘었습니다.'),
('data/set3/run_sheet.txt','T08','C00','C04','ALL','같은 점수, 다른 응답','예시를 붙여도 매번 점수가 높아지지는 않습니다. 전체 평균의 개선과 개별 응답의 결과를 구분하세요.'),
('ext/data/R_set9/run_sheet.txt','T10','C00','C04','ALL','예시가 있어도 실패할 때','개별 실행에서는 준수 항목이 줄어들 수도 있습니다. 예시를 넣었다는 사실만으로 검사를 생략할 수 없습니다.'),
('ext/data/V_set10/run_sheet.txt','T09','C00','V3','V','내용 없이 구조만 줄 때','빈 골격에서도 개선이 관찰됐습니다. 다만 완성 예시와 항상 동등하다고 입증된 것은 아닙니다.'),
('ext/data/X_set3/run_sheet.txt','T05','N0','X2','X','지시와 예시가 충돌할 때','해요체를 요구하면서 합니다체 예시를 주면 두 단서가 충돌합니다. 이 사례에서는 문체 조건을 놓쳤습니다.'),
('ext/data/X_gpt6_set10/run_sheet.txt','T09','N0','X2','X_gpt6','모델이 달라지면','이 모델의 선택 사례에서는 문체 충돌에도 지시를 지켰습니다. 앞선 모델의 결과를 모든 모델에 일반화하지 마세요.')]
cases=[]
for i,(file,tid,left,right,group,title,lesson) in enumerate(specs):
    raw=z.read(file).decode('utf-8-sig');blocks=s.parse(raw)
    items=[]
    for cid in (left,right):
        b=next(b for b in blocks if b['tid']==tid and b['cid']==cid)
        segment=next(p for p in re.split(r'(?=^=== \d+ \|)',raw,flags=re.M) if re.match(r'=== 0*'+str(b['call'])+r' \|',p))
        prompt='\n'.join(segment.split('--- 프롬프트 ---',1)[1].split('--- 응답 ---',1)[0].splitlines()).strip()
        items.append(dict(condition=cid,name=b['name'],model=b['meta']['모델'],prompt=prompt,response=b['response'],checks=[s.rule_pass(r,b['response']) for r in tasks[tid]['rules']],sha256=hashlib.sha256(b['response'].encode()).hexdigest()))
    summaryfile=f'ext/results/{group}_summary.csv'
    aggregate=[r for r in csv.DictReader(io.StringIO(z.read(summaryfile).decode('utf-8-sig'))) if r['조건'] in (left,right)]
    cases.append(dict(id=i+1,title=title,lesson=lesson,source=file,task=tid,taskName=tasks[tid]['name'],intro=tasks[tid]['intro'],items=items,aggregate=aggregate,aggregateSource=summaryfile))
data=dict(title='프롬프트의 구조적 요소가 AI의 지시 준수율에 미치는 영향',rules=[r['list'] for r in tasks['T01']['rules']],cases=cases,sourceSHA256=hashlib.sha256((ROOT.parent/'T10파일.zip').read_bytes()).hexdigest())
(ROOT/'dist/data.js').write_text('const DATA = '+json.dumps(data,ensure_ascii=False)+';\n',encoding='utf-8')
(ROOT/'evidence.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
print('Verified 6 pairs / 12 responses / 96 original rule decisions. Exact source prompts included.')
