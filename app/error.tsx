'use client'
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="section page"><h1>Something interrupted the story.</h1><p>Please try again in a moment.</p><button className="button" onClick={reset}>Try again</button></main>}
