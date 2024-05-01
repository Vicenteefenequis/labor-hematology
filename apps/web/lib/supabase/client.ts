import { createBrowserClient } from '@supabase/ssr'
import z from 'zod'

export function createClient() {
	const { supabase_anon_key, supabase_url } = z
		.object({
			supabase_url: z.string(),
			supabase_anon_key: z.string(),
		})
		.parse({
			supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
			supabase_anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		})
	return createBrowserClient(supabase_url, supabase_anon_key)
}
