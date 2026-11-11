import {notFound} from 'next/navigation'
import {DesignPreview} from '@/components/design-preview'
import {creators,partners,storyById} from '@/lib/design-demo'
import './review.css'
const screens=['spotlight','motion','home','discover','detail','matches','interest','welcome','featured','people','creator','industry','favourites']
export default async function DesignScreen({params,searchParams}:{params:Promise<{screen:string}>;searchParams:Promise<{story?:string;person?:string}>}){
 const {screen}=await params;const {story,person}=await searchParams
 if(!screens.includes(screen))notFound()
 if(['detail','interest'].includes(screen)&&story&&!storyById(story))notFound()
 if(screen==='creator'&&person&&!creators.some(c=>c.id===person))notFound()
 if(screen==='industry'&&person&&!partners.some(p=>p.id===person))notFound()
 return <DesignPreview key={screen+'-'+story+'-'+person} screen={screen} storyId={story} personId={person}/>
}
