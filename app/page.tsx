import { redirect } from 'next/navigation'
import { DesignPreview } from '@/components/design-preview'
import './design/[screen]/review.css'

export default async function Page({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const { code } = await searchParams
  if (code) redirect(`/auth/callback?code=${encodeURIComponent(code)}`)
  return <DesignPreview screen="home" />
}
