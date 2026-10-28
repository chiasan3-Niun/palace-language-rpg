import pathlib,re,json
root=pathlib.Path(__file__).parent
entries=json.loads((root/'knowledge.json').read_text(encoding='utf-8'))
names=[x['en'] for x in entries]+re.findall(r"^\[\d+,\d+,'[^']*','([^']*)'",(root/'content.js').read_text(encoding='utf-8'),re.M)
dictionary={}
for line in (root/'cmudict.dict').read_text(encoding='utf-8').splitlines():
    parts=line.split()
    if parts and '(' not in parts[0]:dictionary[parts[0]]=parts[1:]
words=set(w.lower() for name in names for w in re.findall('[A-Za-z]+',name))
special=dict(line.split('=',1) for line in '''affixation=ˌæfɪkˈseɪʃən
agr=eɪ dʒi ɑr
approximant=əˈprɑksɪmənt
bilabial=baɪˈleɪbiəl
binarity=baɪˈnærəti
cond=si oʊ ɛn di
continuant=kənˈtɪnjuənt
contrastive=kənˈtræstɪv
counterbleeding=ˌkaʊntərˈblidɪŋ
counterfeeding=ˌkaʊntərˈfidɪŋ
devoicing=diˈvɔɪsɪŋ
diachronic=ˌdaɪəˈkrɑnɪk
dissimilation=dɪˌsɪməˈleɪʃən
egressive=ɪˈɡrɛsɪv
ejective=ɪˈdʒɛktɪv
epenthesis=ɪˈpɛnθəsɪs
eval=i væl
evaluator=ɪˈvæljueɪtər
extrametricality=ˌɛkstrəmɛˈtrɪkələti
fortition=fɔrˈtɪʃən
fricative=ˈfrɪkətɪv
ft=ɛf ti
iamb=ˈaɪæm
implicational=ˌɪmplɪˈkeɪʃənəl
implosive=ɪmˈploʊsɪv
infix=ˈɪnfɪks
ipa=aɪ pi eɪ
labial=ˈleɪbiəl
labialization=ˌleɪbiələˈzeɪʃən
labiodental=ˌleɪbioʊˈdɛntəl
lenition=lɪˈnɪʃən
loanword=ˈloʊnwɜrd
markedness=ˈmɑrktnəs
metathesis=məˈtæθəsɪs
moraic=moʊˈreɪɪk
morpheme=ˈmɔrfim
nasalization=ˌneɪzələˈzeɪʃən
naturalness=ˈnætʃərəlnəs
nonspecification=ˌnɑnˌspɛsɪfɪˈkeɪʃən
obstruent=ˈɑbstruənt
optimality=ˌɑptɪˈmæləti
palatal=ˈpælətəl
palatalization=ˌpælətələˈzeɪʃən
pharyngeal=fəˈrɪndʒiəl
pharyngealization=fəˌrɪndʒiələˈzeɪʃən
postalveolar=ˌpoʊstælˈviələr
prosodic=prəˈsɑdɪk
pulmonic=pʊlˈmɑnɪk
rendaku=ɾendakɯ
retroflex=ˈrɛtroʊflɛks
sibilant=ˈsɪbɪlənt
sonorant=ˈsɑnərənt
sonority=səˈnɔrəti
spoonerism=ˈspunərɪzəm
superheavy=ˌsupərˈhɛvi
syllabification=sɪˌlæbɪfɪˈkeɪʃən
trochee=ˈtroʊki
underspecification=ˌʌndərˌspɛsɪfɪˈkeɪʃən
univalent=ˌjunɪˈveɪlənt
unrounded=ʌnˈraʊndɪd
uvular=ˈjuvjələr
velar=ˈvilər
velarization=ˌvilərəˈzeɪʃən
vot=vi oʊ ti
wsp=ˈdʌbəlju ɛs pi'''.splitlines())
mapping=dict(x.split(':') for x in 'AA:ɑ AE:æ AH:ʌ AO:ɔ AW:aʊ AY:aɪ B:b CH:tʃ D:d DH:ð EH:ɛ ER:ɜr EY:eɪ F:f G:ɡ HH:h IH:ɪ IY:i JH:dʒ K:k L:l M:m N:n NG:ŋ OW:oʊ OY:ɔɪ P:p R:r S:s SH:ʃ T:t TH:θ UH:ʊ UW:u V:v W:w Y:j Z:z ZH:ʒ'.split())
def convert(word):
    if word in special:return special[word]
    phones=dictionary[word];result=[]
    for phone in phones:
        base=re.sub('[012]','',phone);sound=mapping[base]
        if phone=='AH0':sound='ə'
        if phone=='ER0':sound='ər'
        stress='ˈ' if phone.endswith('1') else 'ˌ' if phone.endswith('2') else ''
        if stress:
            at=len(result)
            while at>0 and not re.search('[ɑæʌɔɛɜɪiʊuəeoa]',result[at-1]):at-=1
            result.insert(at,stress)
        result.append(sound)
    return ''.join(result)
missing=words-dictionary.keys()-special.keys()
if missing:raise ValueError(sorted(missing))
output={name: ' / '.join(' '.join(convert(w.lower()) for w in re.findall('[A-Za-z]+',part)) for part in name.split(';')) for name in names}
(root/'term-ipa.json').write_text(json.dumps(output,ensure_ascii=False,indent=2),encoding='utf-8')
print('IPA complete',len(output),'English labels; specialized entries are editorial transcriptions, compounds are word-by-word.')
