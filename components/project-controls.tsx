import Link from 'next/link'
import { db } from '@/lib/supabase'
import { favourite } from '@/lib/actions'
import { ActionForm } from './action-form'
export async function ProjectControls({id,owner}:{id:string;owner:string}){
 const client=await db();const {data:{user}}=await client.auth.getUser()
 if(!user)return <Link className="text-link" href="/login">Sign in to save this project →</Link>
 return <div className="actions">{user.id===owner&&<Link className="button secondary" href={`/projects/${id}/edit`}>Edit project</Link>}<Link className="button secondary" href={`/projects/${id}/documents`}>Documents & permissions</Link><ActionForm action={favourite.bind(null,id)} label="Save favourite" className="inline-form"><span className="sr-only">Save this project</span></ActionForm></div>
}
