import Sidebar from '@/ui/sidebar'
import React from 'react'

export default function Template({
	children,
}: {
	children: Readonly<React.ReactNode>
}) {
	return (
		<div className="grid grid-cols-[300px_1fr] min-h-screen gap-4">
			<Sidebar />
			<div>{children}</div>
		</div>
	)
}
