Object.assign(Busola.sources,CatalogExtension.sources);
for(const p of Busola.programs){
  const oldSources=p.source||[];
  const update=CatalogExtension.updates[p.id]||{};
  Object.assign(p,update);
  p.source=[...new Set([...oldSources,...(update.source||[]),...(p.facts||[]).flatMap(f=>f.source||[]),...(p.documentSources||[])])];
}
for(const p of CatalogExtension.programs){
  if(Busola.programs.some(x=>x.id===p.id))throw Error('Duplicate program id: '+p.id);
  Busola.programs.push({...p,color:p.color||(p.tags.includes('biology')?'sage':p.tags.includes('arts')?'rose':'blue')});
}
for(const p of Busola.programs){
  p.source=[...new Set([...(p.source||[]),...(p.facts||[]).flatMap(f=>f.source||[]),...(p.documentSources||[])])];
  p.facts=p.facts||[];
  p.requirements=p.requirements||[];
  p.documents=p.documents||[];
  if(p.kind==='csie'||['ubb-info','uaic-info'].includes(p.id))p.writtenExam=true;
  for(const key of p.source)if(!Busola.sources[key])throw Error('Missing source '+key+' for '+p.id);
}
