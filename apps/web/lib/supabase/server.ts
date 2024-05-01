import { CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import z from 'zod'

export function createClient() {
	const cookie_store = cookies()

	const { supabase_anon_key, supabase_url } = z
		.object({
			supabase_url: z.string(),
			supabase_anon_key: z.string(),
		})
		.parse({
			supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
			supabase_anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		})

	return createServerClient(supabase_url, supabase_anon_key, {
		cookies: {
			get: (name: string) => cookie_store.get(name)?.value,
			set: (name: string, value: string, options: CookieOptions) => {
				try {
					cookie_store.set({ name, value, ...options })
				} catch (error) {
					console.error(error)
				}
			},
			remove: (name: string, options: CookieOptions) => {
				try {
					cookie_store.set({ name, value: '', ...options })
				} catch (error) {
					console.error(error)
				}
			},
		},
	})
}
