import { redirect,notFound } from 'next/navigation'
import { db } from '@/lib/supabase'
import { getProject } from '@/lib/data'
import { ProjectForm } from '@/components/project-form'
export default async function Edit({params}:{params:Promise<{id:string}>}){const {id}=await params;const client=await db();const {data:{user}}=await client.auth.getUser();if(!user)redirect('/login');const p=await getProject(id);if(!p||p.owner_id!==user.id)notFound();return <main className="section page"><h1>Edit your project</h1><ProjectForm project={p}/></main>}
