import { Button } from '@labor/ui'
import { APP_DOMAIN } from '@labor/utils'
import Link from 'next/link'
import { CircleArrowLeft } from 'lucide-react'

export default function NotFound() {
	return (
		<div className="grid place-content-center h-screen">
			<h1 className="text-9xl leading-snug font-bold">Oops!</h1>
			<h2 className="text-2xl">
				A página que você estava procurando não foi encontrada.
			</h2>

			<div className="mt-12">
				<Button asChild className="text-base" size="lg">
					<Link href={`${APP_DOMAIN}`}>
						<CircleArrowLeft />
						Ir para a tela inicial
					</Link>
				</Button>
			</div>
		</div>
	)
}
