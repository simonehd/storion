import { db } from './supabase'
import { demoProjects } from './demo'
import type { Project } from './types'
export async function listProjects(): Promise<{projects: Project[]; unavailable: boolean}> {
  try {
    const client = await db()
    const { data, error } = await client.from('projects').select('*').eq('visibility','public').order('created_at',{ascending:false}).limit(100)
    return {projects:[...(data || []) as Project[], ...demoProjects], unavailable:!!error}
  } catch { return {projects:demoProjects,unavailable:true} }
}
export async function getProject(id: string): Promise<Project | null> {
  const demo = demoProjects.find(p=>p.id===id)
  if (demo) return demo
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null
  const client = await db()
  const {data} = await client.from('projects').select('*').eq('id',id).maybeSingle()
  return data as Project | null
}
