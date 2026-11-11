import Link from 'next/link'
import { Logo } from '@/components/shell'
import { CinemaIcon } from '@/components/cinema'
export default function Welcome(){return <main className="welcome-screen"><div className="welcome-brand"><Logo/><h1>A universe of stories.</h1><p>The global marketplace connecting<br/>stories with opportunities.</p><Link href="/featured-discover" className="button">Discover original stories →</Link></div><div className="welcome-origin"><CinemaIcon kind="globe"/><p>A global platform<br/>with African roots.</p></div></main>}
