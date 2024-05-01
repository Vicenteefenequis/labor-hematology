import { Header } from '@/ui/header'
import React, { Suspense } from 'react'

export default function Page() {
	return (
		<div>
			<Suspense fallback={'Carregando'}>
				<Header />
			</Suspense>

			<div>Aqui você está em uma página protegida</div>
		</div>
	)
}
