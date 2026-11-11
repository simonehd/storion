import Link from 'next/link'
import type { Project } from '@/lib/types'
import { projectImage } from '@/lib/demo'
export function ProjectCard({project}:{project:Project}) { return <Link className="project-card" href={`/projects/${project.id}`} style={{backgroundImage:`linear-gradient(0deg,#080d11 2%,transparent 80%),url("${projectImage(project)}")`}}><div><span className="eyebrow">{project.demo ? 'Curated demo' : project.countries.join(' · ')}</span><h3>{project.title}</h3><p>{project.format} <span>·</span> {project.genres.join(', ')}</p></div><span className="card-arrow" aria-hidden="true"><svg viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 3h14v22l-7-5-7 5Z"/></svg></span></Link> }
