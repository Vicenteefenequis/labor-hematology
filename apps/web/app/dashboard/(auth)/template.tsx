import { Header } from '@/ui/header'
import Sidebar from '@/ui/sidebar'
import React, { Suspense } from 'react'

export default function Template({
	children,
}: {
	children: Readonly<React.ReactNode>
}) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-[clamp(232px,100%,300px)_1fr] min-h-screen gap-4">
			<Suspense>
				<Sidebar />
			</Suspense>

			<div className="flex flex-col px-4">
				<Header />

				{children}
			</div>
		</div>
	)
}
