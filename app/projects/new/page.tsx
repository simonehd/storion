import Link from 'next/link'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import { ProjectForm } from '@/components/project-form'
export default async function NewProject(){const client=await db();const {data:{user}}=await client.auth.getUser();if(!user)redirect('/login');return <main className="section page"><p className="eyebrow">CREATE · SHARE · PROGRESS</p><h1>Give your story a home.</h1><p className="muted">Complete <Link className="text-link" href="/profile/edit">your profile</Link> first. Your project stays private until you choose to publish.</p><ProjectForm/></main>}
