'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@labor/ui'
import { LogOut } from 'lucide-react'

interface LogoutButtonProps {
	className?: string
}

export const LogoutButton = ({ className }: LogoutButtonProps) => {
	const signOut = async () => {
		const supabase = createClient()
		await supabase.auth.signOut()
		window.location.replace('/login')
	}

	return (
		<Button variant="destructive" onClick={signOut} className={className}>
			<LogOut />
			Sair
		</Button>
	)
}
