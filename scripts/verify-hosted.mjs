// Opt-in integration exercise. Creates/reuses clearly labelled synthetic demo data;
// never deletes records or overwrites existing member profiles. Secrets stay in env.
import assert from 'node:assert/strict'
import {createServerClient} from '@supabase/ssr'
import {createClient} from '@supabase/supabase-js'
import {mkdir,writeFile} from 'node:fs/promises'

if(!process.argv.includes('--write-demo'))throw new Error('Use --write-demo to authorize creation/update of the labelled integration demo records.')
const base=process.env.TEST_BASE_URL||'http://localhost:3000',url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
if(!['http://localhost:3000','https://storion-coral.vercel.app'].includes(base))throw new Error('Test credentials may only be sent to the verified Storion hosts.')
const title='Echoes Across the Water — Storion PoC Demo'
const synopsis='Fictional integration demonstration: a South African sound recordist and her brother reconnect through family oral histories, contemporary music and a journey between the Eastern Cape and Johannesburg.'
const log=message=>console.log('PASS: '+message)
const decode=value=>value.replaceAll('&quot;','"').replaceAll('&#x27;',"'").replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&amp;','&')
function session(){const jar=new Map();const client=createServerClient(url,key,{cookies:{getAll:()=>[...jar].map(([name,value])=>({name,value})),setAll:values=>values.forEach(({name,value})=>jar.set(name,value))}});return {client,jar}}
async function request(actor,path,options={}){const response=await fetch(base+path,{...options,redirect:'manual',headers:{Origin:base,Cookie:[...actor.jar].map(([n,v])=>n+'='+v).join('; '),...options.headers}});for(const cookie of response.headers.getSetCookie()){const pair=cookie.split(';')[0],i=pair.indexOf('=');actor.jar.set(pair.slice(0,i),pair.slice(i+1))}return response}
async function submit(actor,path,fields,label){const page=await request(actor,path);assert.equal(page.status,200);const html=await page.text();const forms=[...html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/g)].map(m=>m[0]);const formHtml=forms.find(f=>f.includes(label));assert.ok(formHtml,`Missing form: ${label}`);const form=new FormData();for(const match of formHtml.matchAll(/<input\b[^>]*>/g)){const attributes=Object.fromEntries([...match[0].matchAll(/([\w:$-]+)="([^"]*)"/g)].map(m=>[m[1],decode(m[2])]));if(attributes.type==='hidden'&&attributes.name)form.append(attributes.name,attributes.value||'')}for(const [name,value] of Object.entries(fields)){for(const item of Array.isArray(value)?value:[value])form.append(name,String(item))}return request(actor,path,{method:'POST',body:form})}
const creator=session(),industry=session(),anon=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}})
for(const [actor,role] of [[creator,'CREATOR'],[industry,'INDUSTRY']]){
 const response=await submit(actor,'/login',{email:process.env[`TEST_${role}_EMAIL`],password:process.env[`TEST_${role}_PASSWORD`]},'Sign in');assert.equal(response.status,303,`${role} app login failed`)
 const {data:{user},error}=await actor.client.auth.getUser();assert.ifError(error);assert.ok(user);actor.user=user;log(`${role.toLowerCase()} signs in through the application action`)
 const {data:existing}=await actor.client.from('profiles').select('*').eq('id',user.id).maybeSingle()
 if(!existing){await submit(actor,'/profile/edit',{display_name:role==='CREATOR'?'Storion Demo Creator':'Storion Demo Industry',role:role==='CREATOR'?'creator':'industry',bio:'Clearly labelled fictional Storion proof-of-concept demonstration profile.',country:'South Africa',languages:'English, isiXhosa',interests:'film, Drama, Heritage, Identity',territories:'Africa, Worldwide',acquisition_criteria:role==='INDUSTRY'?'Seeking development-stage character-driven films about heritage and family for potential co-production and distribution. Demonstration brief only.':''},'Save profile')}
 const {data:profile,error:profileError}=await actor.client.from('profiles').select('*').eq('id',user.id).single();assert.ifError(profileError);assert.ok(profile);log(`${role.toLowerCase()} profile available; existing profile preserved`)
}
assert.notEqual(creator.user.id,industry.user.id)
const {data:existingProject}=await creator.client.from('projects').select('id').eq('owner_id',creator.user.id).eq('title',title).limit(1).maybeSingle()
const fields={title,synopsis,format:'film',stage:'in_development',genres:'Drama',themes:'Heritage, Identity',countries:'South Africa',languages:'English, isiXhosa',territories:'Africa, Worldwide',looking_for:'Producing, Distribution',budget:'250000',currency:'USD',funding_notes:'Fictional budget for integration demonstration.',visibility:'private'}
await submit(creator,existingProject?`/projects/${existingProject.id}/edit`:'/projects/new',fields,'Save project')
const {data:project,error:projectError}=await creator.client.from('projects').select('*').eq('owner_id',creator.user.id).eq('title',title).single();assert.ifError(projectError);assert.equal(project.visibility,'private')
await mkdir('.local-tests',{recursive:true});await writeFile('.local-tests/poc-state.json',JSON.stringify({projectId:project.id,title},null,2))
for(const client of [industry.client,anon]){const {data,error}=await client.from('projects').select('id').eq('id',project.id);assert.ifError(error);assert.equal(data.length,0)}
log('private draft creation and owner-only visibility')
await submit(creator,`/projects/${project.id}/edit`,{...fields,visibility:'public',ownership_declared:'on'},'Save project')
const {data:publicProject,error:publicError}=await anon.from('projects').select('*').eq('id',project.id).single();assert.ifError(publicError);assert.equal(publicProject.ownership_declared,true);log('project editing, ownership declaration and public discovery')
const {data:attackRows,error:attackError}=await industry.client.from('projects').update({title:'Unauthorized change'}).eq('id',project.id).select('id');assert.ifError(attackError);assert.equal(attackRows.length,0);log('another member cannot edit the creator project')
await submit(industry,`/projects/${project.id}`,{},'Save favourite')
const {data:saved,error:savedError}=await industry.client.from('favourites').select('project_id').eq('project_id',project.id).single();assert.ifError(savedError);assert.ok(saved);log('favourite saved through the application action')
const interestFields={message:'Fictional PoC demonstration: interested in discussing co-production and distribution potential.',categories:['Producing','Distribution']}
await submit(industry,`/projects/${project.id}/interest`,interestFields,'Send Interest')
await submit(industry,`/projects/${project.id}/interest`,interestFields,'Send Interest')
const {data:interests,error:interestError}=await industry.client.from('interests').select('*').eq('project_id',project.id).eq('sender_id',industry.user.id);assert.ifError(interestError);assert.equal(interests.length,1);log('interest submission works and duplicate is prevented')
const interest=interests[0]
const {error:forbidden}=await industry.client.rpc('set_interest_status',{target:interest.id,new_status:'Viewed'});assert.ok(forbidden);log('sender cannot alter owner-controlled interest status')
// The dashboard may contain other existing interests; bind the intended test form by its article.
const dashboard=await request(creator,'/dashboard');const dashboardHtml=await dashboard.text();assert.ok(dashboardHtml.includes(title));assert.ok(!dashboardHtml.includes('Some dashboard information could not be loaded'))
const {error:statusError}=await creator.client.rpc('set_interest_status',{target:interest.id,new_status:'Viewed'});assert.ifError(statusError)
const {data:updated}=await industry.client.from('interests').select('status,activity(status)').eq('id',interest.id).single();assert.equal(updated.status,'Viewed');assert.ok(updated.activity.some(a=>a.status==='Viewed'));log('owner status update and sender-visible activity history')
for(const path of ['/dashboard',`/projects/${project.id}`,`/projects/${project.id}/edit`,'/profile/edit','/documents']){const response=await request(creator,path);assert.equal(response.status,200);assert.ok(!(await response.text()).includes('Something went wrong'))}log('signed-in dashboard, detail and edit pages render')
const privateAI=await request(creator,'/api/matches',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({projectId:project.id,consent:false})});assert.equal(privateAI.status,400);log('AI requires explicit consent')
const ai=await request(creator,'/api/matches',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({projectId:project.id,consent:true})});const aiBody=await ai.json();console.log('Gemini HTTP '+ai.status);if(ai.ok){assert.ok(Array.isArray(aiBody.matches));console.log('PASS: genuine Gemini response validated; recommendation count '+aiBody.matches.length)}else{console.log('BLOCKER: '+aiBody.error);process.exitCode=2}
console.log('Synthetic demo records retained; state saved in ignored .local-tests/poc-state.json. No existing profiles were overwritten.')
