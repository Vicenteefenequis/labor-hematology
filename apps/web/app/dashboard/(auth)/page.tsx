import { Header } from '@/ui/header'
import { LogoutButton } from '@/ui/logout-button'
import React, { Suspense } from 'react'

export default function Page() {
	return (
		<div>
			<Suspense fallback={'Carregando'}>
				<Header />
			</Suspense>
			Aqui você está em uma página protegida
			<LogoutButton />
		</div>
	)
}
