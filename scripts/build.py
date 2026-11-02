from pathlib import Path
import json
import re

repository = Path(__file__).resolve().parents[1]
root = repository / 'src'
out = repository / 'public'
out.mkdir(parents=True, exist_ok=True)
page = (root / 'index.html').read_text()
for name, marker in [('style.css', 'STYLE'), ('model.js', 'MODEL'), ('app.js', 'APP'), ('v2.js','V2')]:
    page = page.replace('/* '+marker+' */', (root / name).read_text())
merged={'sources':{},'updates':{},'programs':[]}
for file in ['ase-research.json','romania-research.json','international-research.json','new-universities-research.json']:
    path=root/file
    if not path.exists():
        print('Pending research:',file)
        continue
    data=json.loads(path.read_text())
    merged['sources'].update(data.get('sources',{}))
    merged['updates'].update(data.get('updates',{}))
    merged['programs'].extend(data.get('programs',[]))
catalog=json.loads((root/'base-catalog.json').read_text())
countries={p['id']:p['country'] for p in catalog['programs']}
# Explain financing in the shared facts so cards, details and exports agree.
for program_id,p in list(merged['updates'].items())+[(p['id'],p) for p in merged['programs']]:
    if p.get('country',countries.get(program_id))!='ro':
        continue
    for f in p.get('facts',[]):
        if not re.search(r'tax.*anual|școlarizare|tuition',f['label'],re.I):
            continue
        paid=f['value'].replace(' Locul la buget nu presupune această taxă.','')
        paid=paid.replace(' pe loc cu taxă','').replace(', loc cu taxă','')
        budget='Loc la buget: fără taxă de școlarizare, dacă obții un loc finanțat de stat.'
        if program_id=='uaic-psihologie':
            budget+=' În sesiunea septembrie 2026 din fișă: 0 locuri la buget.'
        f['label']='Taxă de școlarizare — buget / taxă'
        f['value']=budget+'\nLoc cu taxă (plătești școlarizarea): '+paid
embedded=json.dumps(merged,ensure_ascii=False).replace('<','\\u003c')
page=page.replace('/* DATA */','const CatalogExtension = '+embedded+';\n'+(root/'enrich.js').read_text())
(out / 'index.html').write_text(page, encoding='utf-8')
(repository / 'downloads').mkdir(exist_ok=True)
(repository / 'downloads' / 'Busola.html').write_text(page, encoding='utf-8')
catalog['sources'].update(merged['sources'])
for p in catalog['programs']:
    original_sources=p.get('source',[])
    update=merged['updates'].get(p['id'],{})
    p.update(update)
    p['source']=list(dict.fromkeys(original_sources+update.get('source',[])))
catalog['programs'].extend(merged['programs'])
for p in catalog['programs']:
    p['source']=list(dict.fromkeys(p.get('source',[])+[s for f in p.get('facts',[]) for s in f.get('source',[])]+p.get('documentSources',[])))
    p['writtenExam']=p.get('writtenExam',False) or p.get('kind')=='csie' or p['id'] in ['ubb-info','uaic-info']
(repository / 'data').mkdir(exist_ok=True)
(repository / 'data' / 'catalog-surse.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Built {out / "index.html"} ({len(page.encode()):,} bytes)')
