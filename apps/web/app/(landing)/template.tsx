import Logo from '@/ui/logo'
import {
	Button,
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@labor/ui'
import { DASHBOARD_DOMAIN } from '@labor/utils'
import Link from 'next/link'

const components: Array<{ title: string; href: string; description: string }> =
	[
		{
			title: 'Exames laboratoriais',
			href: '#',
			description:
				'Gerencie e disponibilize os exames da sua clinica em um clique.',
		},
		{
			title: 'Valores de referência',
			href: '#',
			description:
				'Manipule e configure os valores de referencia da sua clinica de forma personalizada',
		},
		{
			title: 'Exames laboratoriais',
			href: '#',
			description:
				'Gerencie e disponibilize os exames da sua clinica em um clique.',
		},
		{
			title: 'Valores de referência',
			href: '#',
			description:
				'Manipule e configure os valores de referencia da sua clinica de forma personalizada',
		},
	]

const triggerStyle =
	'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'

export default function Template({
	children,
}: {
	children: Readonly<React.ReactNode>
}) {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-primary/10 to-background/60"></div>

			<header className="flex justify-around py-4">
				<div className="flex gap-2 h-12 items-center py-6">
					<Logo width={40} className="h-12" />
					<h1 className="text-2xl text-primary font-medium">
						Labor Hematology
					</h1>
				</div>

				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link href="#" className={triggerStyle}>
									Como funciona
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger>
								Funcionalidades
							</NavigationMenuTrigger>

							<NavigationMenuContent>
								<ul className="grid gap-4 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
									{components.map(
										({ title, href, description }) => (
											<NavigationMenuLink
												asChild
												key={title}
											>
												<Link href={href}>
													<b>{title}</b>
													<p className="text-sm text-muted-foreground">
														{description}
													</p>
												</Link>
											</NavigationMenuLink>
										),
									)}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link href="#" className={triggerStyle}>
									Assinar
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Button asChild size="sm">
									<Link href={`${DASHBOARD_DOMAIN}/login`}>
										Acessar
									</Link>
								</Button>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</header>

			<div className="flex-1 grid">{children}</div>
		</div>
	)
}
