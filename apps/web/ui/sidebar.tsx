'use client'

import { Button } from '@labor/ui'
import { Cat, FileType, Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Logo from './logo'
import { usePathname } from 'next/navigation'
import { LogoutButton } from './logout-button'

const components: Array<{
	icon: React.ComponentType
	label: string
	href: string
}> = [
	{
		icon: Home,
		label: 'Inicio',
		href: '/',
	},
	{
		icon: Cat,
		label: 'Espécies',
		href: '/especies',
	},
	{
		icon: FileType,
		label: 'Exames',
		href: '/exames',
	},
]

export default function Sidebar() {
	const path = usePathname()

	const isActiveVariant = (href: string) => {
		return href === path ? 'default' : 'outline'
	}

	return (
		<div className="flex flex-col gap-6 p-4">
			<div className="flex justify-center items-center gap-2 h-12">
				<Logo width={40} />

				<span className="text-xl font-medium text-primary">
					Labor Hematology
				</span>
			</div>

			<div className="flex flex-col gap-4 flex-1">
				{components.map(({ icon: Icon, label, href }) => (
					<Button variant={isActiveVariant(href)} asChild>
						<Link href={href}>
							<Icon /> {label}
						</Link>
					</Button>
				))}
			</div>

			<div className="flex items-stretch">
				<LogoutButton className="w-full" />
			</div>
		</div>
	)
}
