import type { Project, Profile } from './types'
export type Opportunity = Pick<Profile,'id'|'display_name'|'country'|'languages'|'interests'|'acquisition_criteria'|'territories'> & {demo?:boolean}
export type Match = {id:string;explanation:string;caveat:string}
export const sampleOpportunities:Opportunity[]=[
 {id:'demo-film-partner',display_name:'Independent Film Partner — fictional brief',country:'South Africa',languages:['English'],interests:['film','Drama','Heritage','Identity'],acquisition_criteria:'Seeking development-stage character-led films with cultural specificity for potential co-production. Funding is not guaranteed.',territories:['Africa','Worldwide'],demo:true},
 {id:'demo-series-partner',display_name:'Global Series Partner — fictional brief',country:'United Kingdom',languages:['English','Japanese'],interests:['series','Romance','Adventure'],acquisition_criteria:'Seeking adaptable episodic stories with clear audience appeal and international distribution potential.',territories:['Worldwide'],demo:true},
 {id:'demo-publisher',display_name:'World Stories Publisher — fictional brief',country:'India',languages:['English'],interests:['book','Historical','Heritage'],acquisition_criteria:'Seeking completed manuscripts and developed book proposals exploring family, heritage and migration.',territories:['Asia','Europe'],demo:true},
]
export function publicMatchInput(project:Project){
 if(project.visibility!=='public')throw new Error('Only public projects can be matched.')
 const {title,synopsis,format,stage,genres,themes,countries,languages,territories,looking_for,budget,currency,funding_notes}=project
 return {title,synopsis,format,stage,genres,themes,countries,languages,territories,looking_for,budget,currency,funding_notes}
}
export function validateMatches(value:unknown,opportunities:Opportunity[]):Match[]{
 if(!value||typeof value!=='object'||!('matches' in value)||!Array.isArray(value.matches)||value.matches.length>5)throw new Error('Invalid match response')
 const seen=new Set<string>()
 return value.matches.map((m:unknown)=>{if(!m||typeof m!=='object'||!('id' in m)||typeof m.id!=='string'||!opportunities.some(o=>o.id===m.id)||seen.has(m.id)||!('explanation' in m)||typeof m.explanation!=='string'||m.explanation.length<10||m.explanation.length>2000||!('caveat' in m)||typeof m.caveat!=='string'||m.caveat.length>1000)throw new Error('Invalid match response');seen.add(m.id);return {id:m.id,explanation:m.explanation,caveat:m.caveat}})
}
