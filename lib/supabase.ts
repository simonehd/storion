import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
export async function db() { return createClient(await cookies()) }
