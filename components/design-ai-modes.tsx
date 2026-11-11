'use client'
import Link from 'next/link'
import {useState} from 'react'
import {DesignRecommendations} from './design-recommendations'
import {sampleRecommendations,storyById,partners} from '@/lib/design-demo'

export function DesignAIModes({storyId}:{storyId?:string}) {
 const [mode,setMode]=useState<'demo'|'real'>('demo')
 const [expanded,setExpanded]=useState<string|null>(null)
 const selected=sampleRecommendations.find(m=>m.storyId===storyId)
 const samples=selected?[selected,...sampleRecommendations.filter(m=>m!==selected)]:sampleRecommendations
 return <div className="v-ai-modes">
  <div className="v-mode-switch" role="group" aria-label="AI matching data mode"><button aria-pressed={mode==='demo'} onClick={()=>setMode('demo')}>Demo · Sample matches</button><button aria-pressed={mode==='real'} onClick={()=>setMode('real')}>Real · Gemini</button></div>
  {mode==='real'?<><p className="v-mode-note">Real mode · Uses your signed-in industry profile and public Supabase projects. Gemini runs only after consent and a recommendation request.</p><DesignRecommendations/></>:<section className="v-match-panel"><h1><span className="v-sparkles">✦</span> AI Matches <small>Demo</small></h1><p>Explore how stories connect with industry interests.</p><p className="v-small">Prepared fictional examples · No Gemini request or database write.</p>{storyId&&!selected&&storyById(storyId)&&<p className="v-small">No prepared match for {storyById(storyId)!.title}. The examples below illustrate the matching experience across the sample collection.</p>}<div className="v-partners">{samples.map((sample,i)=>{const story=storyById(sample.storyId)!;const partner=partners.find(p=>p.id===sample.partnerId)!;return <div className="v-partner-wrap" key={story.id}><button className="v-partner" aria-expanded={expanded===story.id} aria-controls={'sample-'+story.id} onClick={()=>setExpanded(expanded===story.id?null:story.id)}><span className={'v-partner-mark mark-'+i} aria-hidden="true">✦</span><span className="v-partner-copy"><strong>{story.title}</strong><small>{partner.name} · {partner.type}</small></span><span className="v-match-score">Sample</span></button>{expanded===story.id&&<div className="v-match-reason" id={'sample-'+story.id}><h2>Why this match?</h2><p>{sample.explanation}</p><p className="v-small">{sample.caveat}</p><div className="v-demo-links"><Link href={'/design/detail?story='+story.id}>View project →</Link><Link href={'/design/industry?person='+partner.id}>View industry profile →</Link><Link href={'/design/interest?story='+story.id}>Simulate interest →</Link></div></div>}</div>})}</div><p className="v-preview-note">Switch to Real mode for genuine Gemini recommendations based on your industry profile. Sample matches are not AI-generated results.</p></section>}
 </div>
}
