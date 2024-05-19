'use server'

import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'

export async function fetchUserLoader() {
	const supabase = createClient()

	const {
		error,
		data: { user },
	} = await supabase.auth.getUser()

	if (error || !user) return { error, user: null }

	const dbUser = await prisma.user.findFirst({
		where: {
			id: user.id,
		},
	})

	return { error: null, user: dbUser }
}

export const fetchUser = cache(fetchUserLoader)
