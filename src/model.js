'use strict';
const Busola = (() => {
  const checked = '02.11.2026';
  const sources = {
    ase: {label:'ASE · modalitatea concursului, 2026',url:'https://admitere.ase.ro/licenta-2026/info-admitere/Modalitate_concurs_admitere_2026.pdf',year:'Admitere 2026'},
    offer: {label:'ASE · oferta de studii, 2026',url:'https://admitere.ase.ro/licenta-2026/info-admitere/Brosura_Admitere_2026.pdf',year:'Admitere 2026'},
    tcs: {label:'Twente · Technical Computer Science',url:'https://www.utwente.nl/en/education/bachelor/programmes/technical-computer-science/enrolment/admission/',year:'Pagina curentă; anul de aplicare trebuie confirmat'},
    bit: {label:'Twente · Business Information Technology',url:'https://www.utwente.nl/en/education/bachelor/programmes/business-information-technology/enrolment/admission/',year:'Pagina curentă; anul de aplicare trebuie confirmat'},
    iba: {label:'Twente · International Business Administration',url:'https://www.utwente.nl/en/education/bachelor/programmes/international-business-administration/enrolment/admission/',year:'Pagina curentă; anul de aplicare trebuie confirmat'},
    diploma: {label:'Twente · condiții pentru diploma românească',url:'https://www.utwente.nl/en/education/bachelor/application-admission/admission/',year:'Pagina curentă; secțiunea Romania'}
  };
  const interests = [
    {id:'tech',label:'Tehnologie',icon:'⌘',desc:'Cod, aplicații și sisteme'},
    {id:'math',label:'Matematică & analiză',icon:'∑',desc:'Date, modele și probleme'},
    {id:'business',label:'Antreprenoriat',icon:'↗',desc:'Idei, proiecte și echipe'},
    {id:'finance',label:'Finanțe',icon:'◈',desc:'Bani, economie și decizii'},
    {id:'communication',label:'Comunicare',icon:'◎',desc:'Oameni, mesaje și branduri'},
    {id:'society',label:'Societate',icon:'⌂',desc:'Comunități și instituții'},
    {id:'arts',label:'Artă & design',icon:'✳',desc:'Creație și expresie vizuală'},
    {id:'psychology',label:'Psihologie',icon:'◎',desc:'Comportament, gândire și emoții'},
    {id:'physics',group:'sciences',label:'Fizică',icon:'⚛',desc:'Materie, energie și univers'},
    {id:'chemistry',group:'sciences',label:'Chimie',icon:'⚗',desc:'Substanțe, reacții și materiale'},
    {id:'biology',group:'sciences',label:'Biologie',icon:'❧',desc:'Organisme, ecosisteme și viață'},
    {id:'health',group:'sciences',label:'Medicină & nutriție',icon:'♡',desc:'Sănătate, îngrijire și alimentație'}
  ];
  const ase = {uni:'Academia de Studii Economice',short:'ASE',city:'București',country:'ro',language:'ro',kind:'ase',source:['ase','offer']};
  const twente = {uni:'University of Twente',short:'UT',city:'Enschede',country:'nl',language:'en',kind:'twente'};
  const programs = [
    {...ase,id:'marketing',name:'Marketing',tags:['communication','business'],description:'O direcție de explorat dacă îți place să înțelegi oamenii și să transformi idei în mesaje.',color:'rose'},
    {...ase,id:'management',name:'Management',tags:['business','society'],description:'Pentru interesul față de organizarea proiectelor, lucrul cu echipe și deciziile dintr-o organizație.',color:'gold'},
    {...ase,id:'finance',name:'Finanțe și bănci',tags:['finance','math'],description:'O opțiune de explorat dacă îți plac cifrele, analiza și întrebările despre economie.',color:'sage'},
    {...ase,id:'accounting',name:'Contabilitate și informatică de gestiune',tags:['finance','tech','math'],description:'Pune în legătură interesul pentru informații financiare, instrumente digitale și analiză.',color:'sage'},
    {...ase,id:'informatics',name:'Informatică economică',tags:['tech','business','math'],kind:'csie',description:'O direcție la intersecția dintre programare, analiză și problemele organizațiilor.',color:'blue'},
    {...ase,id:'cybernetics',name:'Cibernetică economică',tags:['math','finance','tech'],kind:'csie',description:'Merită explorată dacă îți plac modelele matematice și analiza sistemelor economice.',color:'blue'},
    {...ase,id:'administration',name:'Administrație publică',tags:['society','communication'],description:'Pentru interesul față de instituții, comunități și felul în care sunt organizate serviciile publice.',color:'gold'},
    {...twente,id:'tcs',name:'Technical Computer Science',tags:['tech','math'],source:['tcs','diploma'],description:'O opțiune internațională de explorat pentru interesul față de informatică și rezolvarea problemelor.',color:'blue'},
    {...twente,id:'bit',name:'Business Information Technology',tags:['tech','business','math'],source:['bit','diploma'],description:'Leagă interesul pentru tehnologie de procesele și nevoile organizațiilor.',color:'sage'},
    {...twente,id:'iba',name:'International Business Administration',tags:['business','communication','finance'],source:['iba','diploma'],description:'O direcție internațională pentru interesul față de afaceri, organizații și comunicare.',color:'rose'}
  ];
  const maxInterests = 4;
  const examFields = [
    {key:'exam',label:'ASE · CSIE',min:1,max:10,step:'0.01',hint:'Nota estimată la examenul de matematică, pe scara 1–10.'},
    {key:'poliP1',label:'POLITEHNICA · P1: matematică',min:1,max:10,step:'0.01',hint:'Algebră și analiză. Nota probei, nu numărul de răspunsuri corecte.'},
    {key:'poliP2',label:'POLITEHNICA · P2: fizică / informatică',min:1,max:10,step:'0.01',hint:'Nota la disciplina pe care ai alege-o. Pentru ACS și ETTI, sesiunea II.'},
    {key:'umfMed',label:'UMF · Medicină',min:0,max:100,step:'1',hint:'Punctaj total estimat, 0–100: biologie + fizică sau chimie.'},
    {key:'umfDental',label:'UMF · Medicină dentară',min:0,max:100,step:'1',hint:'Punctaj total estimat, 0–100, pentru proba de Medicină dentară.'},
    {key:'umfPharm',label:'UMF · Farmacie',min:0,max:100,step:'1',hint:'Punctaj total estimat, 0–100, pentru proba de Farmacie.'},
    {key:'umfNutrition',label:'UMF · Nutriție și dietetică',min:0,max:40,step:'1',hint:'Punctaj estimat la biologie, 0–40.'}
  ];
  const examValid = (field,v) => v!=='' && v!==null && v!==undefined && Number.isFinite(Number(v)) && Number(v)>=field.min && Number(v)<=field.max && (field.step!=='1'||Number.isInteger(Number(v)));
  const emptyProfile = () => ({name:'',interests:[],bac:'',school:'',...Object.fromEntries(examFields.map(f=>[f.key,''])),diploma:'planned',math:'unknown',english:'planned',country:'all',language:'all',written:'any'});
  const demos = {
    business:{name:'Alex',interests:['business','communication'],bac:'8.60',school:'9.10',exam:'',diploma:'planned',math:'no',english:'planned',country:'ro',language:'ro',written:'avoid'},
    tech:{name:'Mara',interests:['tech','math'],bac:'9.20',school:'9.40',exam:'8.50',diploma:'planned',math:'yes',english:'proof',country:'all',language:'all',written:'any'}
  };
  const grade = v => v!=='' && v!==null && v!==undefined && Number.isFinite(Number(v)) && Number(v)>=1 && Number(v)<=10;
  const number = v => Number(v).toFixed(2).replace('.',',');
  function admission(p, profile) {
    if(p.kind==='poli') {
      const formula='Sesiunea II · 2026, bac românesc: MC = (P1 + P2) / 2; MG = 80% × MC + 20% × bac. MC și MG se trunchiază la două zecimale.';
      if(!['bac','poliP1','poliP2'].every(k=>grade(profile[k])))return {value:null,label:'Simulare opțională',formula};
      const trunc=v=>Math.floor((v+1e-9)*100)/100;
      const value=trunc(.8*trunc((Number(profile.poliP1)+Number(profile.poliP2))/2)+.2*Number(profile.bac));
      return {value,label:'Medie simulată',formula,badge:'POLITEHNICA · iulie 2026',scale:10};
    }
    if(p.kind==='umf') {
      const f=examFields.find(x=>x.key===p.examKey);
      return {value:f&&examValid(f,profile[p.examKey])?Number(profile[p.examKey]):null,label:f&&examValid(f,profile[p.examKey])?'Punctaj estimat':'Simulare opțională',scale:p.scoreMax,badge:'UMF · admitere 2026',formula:'Punctajul introdus pentru acest program, din '+p.scoreMax+' puncte. Clasare după proba scrisă; bacul este criteriu de departajare. Regulament 2026.'};
    }
    if(p.kind==='external') return {value:null,label:'Vezi criteriile',formula:p.admissionSummary||'Consultă cerințele specifice programului.'};
    if(p.kind==='twente') return {value:null,label:'Evaluare individuală',formula:'Universitatea verifică diploma și documentele; MVP-ul nu calculează o probabilitate de admitere.'};
    if(!grade(profile.bac)||!grade(profile.school)) return {value:null,label:'Date incomplete',formula:'Completează media de bac și media anilor de liceu.'};
    const base=.7*Number(profile.bac)+.3*Number(profile.school);
    if(p.kind==='csie') return grade(profile.exam)
      ? {value:.5*base+.5*Number(profile.exam),label:'Medie simulată',formula:'50% × (70% bac + 30% liceu) + 50% examen ASE'}
      : {value:null,label:'Lipsește nota la examen',formula:'50% × (70% bac + 30% liceu) + 50% examen ASE'};
    return {value:base,label:'Medie simulată',formula:'70% bac + 30% media anilor de liceu'};
  }
  function checks(p, profile) {
    const out=[];
    const add=(state,text)=>out.push({state,text});
    if(profile.diploma==='no') add('issue','Diploma de bacalaureat nu este încă obținută.');
    else if(grade(profile.bac)&&Number(profile.bac)<6) add('issue','Media de bac introdusă este sub 6; verifică situația promovării.');
    else if(profile.diploma==='obtained') add('ok','Diplomă de bac declarată ca obținută; documentele nu au fost verificate.');
    else add('pending','Diploma de bac trebuie obținută; notele introduse sunt estimări.');
    if(['external','poli','umf'].includes(p.kind)) {
      const a=admission(p,profile);
      if(p.kind==='poli'&&a.value!==null&&a.value<5)add('issue','Media simulată este sub baremul minim 5,00 din regulamentul POLITEHNICA 2026.');
      if(p.kind==='umf'&&a.value!==null&&a.value<p.scoreMax/2)add('issue','Punctajul estimat este sub echivalentul notei minime 5 din regulamentul UMF 2026.');
      (p.requirements||[]).forEach(text=>add('pending',text));
      return out;
    }
    if(p.kind==='twente') {
      add(profile.math==='no'?'issue':profile.math==='yes'?'ok':'pending',profile.math==='no'?'Cerință neacoperită: matematica la bac, conform rutei standard pentru diploma românească.':profile.math==='yes'?'Matematică la bac declarată; universitatea verifică nivelul și documentele.':'Confirmă dacă susții matematica la bac.');
      add('pending',profile.english==='proof'?'Ai declarat o dovadă de engleză; acceptarea ei sau o eventuală scutire trebuie confirmată.':profile.english==='planned'?'Pregătește dovada de engleză sau verifică dacă te încadrezi la o scutire.':'Cerința de engleză rămâne de rezolvat: verifică dovezile și scutirile acceptate.');
      if(p.id==='tcs'||p.id==='bit') add('pending','Nivelul de matematică trebuie evaluat față de cerința programului (VWO Mathematics B).');
      if(p.id==='tcs') add('pending','Parcurge procedura obligatorie de matching a programului.');
      add('pending','Admisibilitatea finală se stabilește individual, după depunerea dosarului.');
    } else {
      add('pending','Pregătește eseul motivațional; este evaluat admis/respins.');
      if(p.kind==='csie') add('pending',grade(profile.exam)?'Nota de examen introdusă este o simulare; examenul ASE la matematică rămâne necesar.':'Este necesar examenul ASE la matematică; media de liceu nu îl înlocuiește.');
      add('pending','Reverifică metodologia pentru anul în care aplici; formula inclusă este din 2026.');
    }
    return out;
  }
  function rank(profile) {
    return programs.filter(p=>(profile.country==='all'||p.country===profile.country)&&(profile.language==='all'||p.language===profile.language)&&!(profile.written==='avoid'&&(p.kind==='csie'||p.writtenExam===true)))
      .map(p=>({...p,matches:profile.interests.filter(t=>p.tags.includes(t)),admission:admission(p,profile),checks:checks(p,profile)}))
      .filter(p=>p.matches.length>0)
      .sort((a,b)=>b.matches.length-a.matches.length||a.checks.filter(c=>c.state==='issue').length-b.checks.filter(c=>c.state==='issue').length||a.name.localeCompare(b.name,'ro'));
  }
  return {checked,sources,interests,programs,maxInterests,examFields,examValid,emptyProfile,demos,grade,number,admission,checks,rank};
})();
