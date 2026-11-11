import { NextResponse, type NextRequest } from 'next/server'
import { db } from '@/lib/supabase'
export async function GET(request:NextRequest){const code=request.nextUrl.searchParams.get('code');if(code){const client=await db();const {error}=await client.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL('/dashboard',request.url))}return NextResponse.redirect(new URL('/login',request.url))}
