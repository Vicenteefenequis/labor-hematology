import { Button } from '@labor/ui'
import Image from 'next/image'
import React from 'react'
import doglove from '@/assets/lovely-woman-pedigree-dog-love.jpg'

export default function Page() {
	return (
		<div className="flex flex-col items-center h-full max-w-screen-xl mx-auto place-content-center relative">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 px-4 py-8 items-center">
				<div className="grid gap-8">
					<h1 className="text-5xl leading-tight font-semibold">
						Modernizando o cuidado veterinário{' '}
						<span className="text-primary">para pets</span>
					</h1>

					<p className="text-muted-foreground">
						Re-imagine o cuidado animal
					</p>

					<div className="flex gap-2 justify-center">
						<Button size="lg" className="text-lg">
							Assinar
						</Button>

						<Button
							size="lg"
							className="text-lg"
							variant="secondary"
						>
							Funções
						</Button>
					</div>
				</div>

				<div>
					<Image
						alt="Mulher adorável com cabelo encaracolado de olhos fechados, fazendo biquinho de beijo abraça cão pedigree expressando amor, vestida com sutéter vermelho de malha e um lenço ao redor do pescoço segura ramos verdes"
						src={doglove}
						fetchPriority="high"
						className="rounded-lg shadow-lg"
					/>
				</div>
			</div>

			<div className="p-10">
				Aqui dá pra adicionar varias imagens de pessoas e pets bem
				legais
			</div>
		</div>
	)
}
