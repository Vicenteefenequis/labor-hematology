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
				<Suspense
					fallback={
						<div className="h-[88px] flex gap-4 items-center">
							<div className="w-10 h-10 animate-pulse bg-muted-foreground/20 rounded-full"></div>
							<div className="w-64 h-5 animate-pulse bg-muted-foreground/20 rounded"></div>
						</div>
					}
				>
					<Header />
				</Suspense>

				{children}
			</div>
		</div>
	)
}
