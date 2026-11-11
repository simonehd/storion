'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

type Match = { id: string; title: string; explanation: string; caveat: string }
type IndustryProfile = { display_name: string; role: string }

async function getMatchingSession() {
  const client = createClient()
  const { data: { user }, error: authError } = await client.auth.getUser()
  if (authError && authError.name !== 'AuthSessionMissingError') throw new Error('Your session could not be checked. Please try again.')
  if (!user) return { signedIn: false, profile: null }
  const { data, error } = await client.from('profiles').select('display_name,role').eq('id', user.id).maybeSingle()
  if (error) throw new Error('Your professional profile could not be loaded. Please try again.')
  return { signedIn: true, profile: data as IndustryProfile | null }
}

export function DesignRecommendations() {
  const [profile, setProfile] = useState<IndustryProfile | null>(null)
  const [signedIn, setSignedIn] = useState(false)
  const [checking, setChecking] = useState(true)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [consent, setConsent] = useState(false)
  const [matches, setMatches] = useState<Match[] | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [model, setModel] = useState('')

  async function loadProfile() {
    const session = await getMatchingSession()
    setSignedIn(session.signedIn)
    setProfile(session.profile)
  }

  useEffect(() => {
    let active = true
    getMatchingSession().then(session => {
      if (active) { setSignedIn(session.signedIn); setProfile(session.profile) }
    }).catch(e => {
      if (active) setError(e instanceof Error ? e.message : 'Your session could not be checked.')
    }).finally(() => { if (active) setChecking(false) })
    return () => { active = false }
  }, [])

  const eligible = profile && ['industry', 'company'].includes(profile.role)
  return <section className="v-match-panel" aria-busy={checking || pending}>
    <h1><span className="v-sparkles">✦</span> AI Matches <small>Beta</small></h1>
    <p>Original projects that fit your professional interests and acquisition criteria.</p>
    {checking ? <p role="status">Checking your Storion session…</p> : !signedIn ?
      <form className="v-ai-form" onSubmit={async e => {
        e.preventDefault(); setPending(true); setError('')
        const form = e.currentTarget
        const values = new FormData(form)
        try {
          const { error: loginError } = await createClient().auth.signInWithPassword({ email: String(values.get('email') || ''), password: String(values.get('password') || '') })
          if (loginError) throw new Error('Sign-in failed. Check your credentials and try again.')
          form.reset()
          await loadProfile()
        } catch (e) { setError(e instanceof Error ? e.message : 'Sign-in unavailable. Please try again.') }
        finally { setPending(false) }
      }}>
        <p className="v-small">Sign in with your existing Storion industry account to find real project recommendations.</p>
        <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
        <label>Password<input name="password" type="password" autoComplete="current-password" required maxLength={256}/></label>
        <button className="v-button" disabled={pending}>{pending ? 'Signing in…' : 'Sign in for AI matches'}</button>
      </form> : !eligible ? <div className="v-match-reason" role="status"><h2>Industry profile required</h2><p>Project recommendations are available to industry and company accounts with professional interests and acquisition criteria. Sign in with your existing industry demo account to use this feature.</p></div> :
      <form className="v-ai-form" onSubmit={async e => {
        e.preventDefault()
        if (!consent || pending) return
        setPending(true); setError(''); setMatches(null); setExpanded(null); setModel('')
        try {
          const response = await fetch('/api/recommendations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ consent: true }), cache: 'no-store' })
          const data = await response.json()
          if (response.status === 401) { setSignedIn(false); setProfile(null) }
          if (!response.ok) throw new Error(data.error || 'Recommendations are unavailable. Please try again.')
          if (!Array.isArray(data.matches)) throw new Error('The recommendation response could not be displayed. Please try again.')
          setMatches(data.matches); setExpanded(data.matches[0]?.id || null); setModel(data.model || '')
        } catch (e) { setError(e instanceof Error ? e.message : 'Recommendations are unavailable. Please try again.') }
        finally { setPending(false) }
      }}>
        <p className="v-small">Recommendations for {profile.display_name || 'your industry profile'}</p>
        <label className="v-ai-consent"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required disabled={pending}/><span>I agree to send my public professional criteria and public project information to Google Gemini. No private projects or documents are sent.</span></label>
        <button className="v-button" disabled={pending || !consent}>{pending ? 'Finding stories…' : '✦ Recommend projects'}</button>
      </form>}
    {pending && signedIn && <p role="status" className="v-small">Gemini is comparing public projects with your profile. This may take a moment.</p>}
    {error && <div className="v-match-reason" role="alert"><p>{error}</p>{!pending && !eligible && <button className="v-button secondary" onClick={async () => { setChecking(true); setError(''); try { await loadProfile() } catch { setError('Your session could not be checked. Please try again.') } finally { setChecking(false) } }}>Check session again</button>}</div>}
    {matches !== null && <div aria-live="polite">
      {!matches.length && <div className="v-match-reason"><h2>No relevant projects yet</h2><p>No suitable public projects were found among the available stories. Try again when more projects or profile criteria are available.</p></div>}
      <div className="v-partners">{matches.map((match, index) => <div className="v-partner-wrap" key={match.id}>
        <button className="v-partner" aria-expanded={expanded === match.id} aria-controls={`recommendation-${match.id}`} onClick={() => setExpanded(expanded === match.id ? null : match.id)}>
          <span className={`v-partner-mark mark-${index % 3}`} aria-hidden="true">✦</span>
          <span className="v-partner-copy"><strong>{match.title}</strong><small>Public Storion project</small></span>
          <span className="v-match-score">Gemini</span>
        </button>
        {expanded === match.id && <div className="v-match-reason" id={`recommendation-${match.id}`}><h2>Why this match?</h2><p>{match.explanation}</p><p className="v-small">Considerations: {match.caveat || 'Discuss suitability directly with the creator.'}</p></div>}
      </div>)}</div>
      <p className="v-preview-note">Generated by {model || 'Google Gemini'}. Advisory recommendations; no financing, availability or commitment is implied.</p>
    </div>}
  </section>
}
