import json, pathlib, re
from pypdf import PdfReader
root=pathlib.Path(__file__).parent
chapters=[]
for p in sorted((root/'原始資料檔').glob('*.pdf'),key=lambda p:int(p.stem.replace('音韻學',''))):
    pages=[{'page':i+1,'text':page.extract_text()} for i,page in enumerate(PdfReader(p).pages)]
    chapters.append({'file':p.name,'pages':pages})
(root/'source-pages.json').write_text(json.dumps(chapters,ensure_ascii=False),encoding='utf-8')
for c in chapters:
    print(c['file'],len(c['pages']),'pages')
    for page in c['pages']:
        for line in page['text'].splitlines():
            if re.search(r'^\s*\d+\.\d+|[\u4e00-\u9fff].{0,16}[（(][A-Za-z]',line):
                print(page['page'],line)
