import { LoginForm } from '@/ui/login-form'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@labor/ui'
import Link from 'next/link'
import React from 'react'

export default function Page() {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<Card className="w-full max-w-screen-sm shadow-stone-400 shadow-md">
				<CardHeader>
					<CardTitle>Acesse sua conta</CardTitle>
					<CardDescription>
						Você pode acessar sua conta a partir de aqui
					</CardDescription>
				</CardHeader>

				<CardContent className="flex flex-col gap-4 max-w-screen-sm w-full">
					<LoginForm />
				</CardContent>

				<CardFooter>
					<Link
						href="/register"
						className="text-primary hover:underline"
					>
						Não possui uma conta? Cadastre-se
					</Link>
				</CardFooter>
			</Card>
		</div>
	)
}
