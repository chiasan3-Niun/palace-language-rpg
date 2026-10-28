import json,pathlib
root=pathlib.Path(__file__).parent
sources=json.loads((root/'source-pages.json').read_text(encoding='utf-8'))
records=[]
for line in (root/'knowledge.tsv').read_text(encoding='utf-8').splitlines():
    chapter,page,zh,en,meaning=line.split('\t')
    chapter,page=int(chapter),int(page)
    text=sources[chapter-1]['pages'][page-1]['text']
    records.append(dict(chapter=chapter,page=page,zh=zh,en=en,meaning=meaning,example='請依下方教材定位，對照原頁的說明與語料。',explain='此項為新增術語解釋；逐例解讀尚待補齊，不作為已完成例題。',coverage='術語解釋',sourceHeading=text.strip().splitlines()[0]))
(root/'knowledge.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
print('新增清單',len(records),'項；按章統計：')
for c in range(1,12):print(c,sum(r['chapter']==c for r in records))
