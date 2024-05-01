import { RegisterForm } from '@/ui/register-form'
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
					<CardTitle>Registre-se</CardTitle>
					<CardDescription>
						Registre-se e acesse o sistema
					</CardDescription>
				</CardHeader>

				<CardContent className="flex flex-col gap-4 max-w-screen-sm w-full">
					<RegisterForm />
				</CardContent>

				<CardFooter>
					<Link href="/" className="text-primary hover:underline">
						Já possui conta? Acesse
					</Link>
				</CardFooter>
			</Card>
		</div>
	)
}
