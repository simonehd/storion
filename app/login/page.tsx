import Link from 'next/link'
import { ActionForm } from '@/components/action-form'
import { signIn,signUp } from '@/lib/actions'
export default async function Login({searchParams}:{searchParams:Promise<{mode?:string}>}){
 const demoMode=process.env.REGISTRATION_MODE==='demo'
 const signup=(await searchParams).mode==='signup'&&!demoMode
 return <main className="section page"><div className="narrow"><p className="eyebrow">YOUR NEXT CHAPTER</p><h1>{signup?'Join Storion.':'Welcome back.'}</h1><p className="muted">Connect your story with a world of opportunity.</p>{demoMode&&<p className="notice">This invention sprint uses confirmed demonstration accounts. Sign in with the account supplied for your demo. Public registration is not open yet.</p>}<ActionForm action={signup?signUp:signIn} label={signup?'Create account':'Sign in'}><label><span>Email</span><input name="email" type="email" autoComplete="email" required maxLength={254}/></label><label><span>Password {signup?'(at least 10 characters)':''}</span><input name="password" type="password" minLength={signup?10:1} maxLength={256} autoComplete={signup?'new-password':'current-password'} required/></label></ActionForm>{!demoMode&&<Link className="text-link" href={signup?'/login':'/login?mode=signup'}>{signup?'Already a member? Sign in':'New to Storion? Create an account'} →</Link>}</div></main>
}
