import { listProjects } from '@/lib/data'
import { Discovery } from '@/components/discovery'
export default async function DiscoverPage() { const {projects,unavailable}=await listProjects(); return <main className="section page discover-page"><p className="eyebrow">DISCOVER ORIGINAL VOICES</p><h1>Projects</h1><p className="lead">Discover original films, series and books from creators around the world.</p>{unavailable&&<p className="notice">Live projects are temporarily unavailable. You can still explore the labelled curated examples.</p>}<Discovery projects={projects}/></main> }
