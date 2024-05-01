'use client'
import { LoginSchema, loginFormSchema } from '@/lib/zod/login-form-schema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@labor/ui'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const intlErrors = new Map([
	[
		'Email rate limit exceeded',
		'Você já fez o cadastro, verifique seu e-mail',
	],
	['Invalid login credentials', 'E-mail ou senha incorreto'],
	[
		'Email link is invalid or has expired',
		'O Link de acesso é inválido ou já expirou',
	],
	['Auth session missing!', 'Sua sessaão expirou, faca o login novamente'],
])

export const LoginForm = () => {
	const searchParams = useSearchParams()
	const redir = searchParams?.get('redir')
	const error = searchParams?.get('error')
	const anounce = searchParams?.get('anounce')

	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginFormSchema),
	})
	const onSubmit: SubmitHandler<LoginSchema> = async ({
		email,
		password,
	}) => {
		const supabase = createClient()

		let path = redir || '/'

		const result = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (result.error) {
			path = `/?error=${result.error.message}`
		}

		window.location.replace(path)
	}

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-4 max-w-screen-sm"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				{!!error && (
					<div className="p-4 rounded border border-destructive bg-destructive/20 text-destructive">
						<b>Error: </b>{' '}
						{intlErrors.get(error) ||
							'Ocorreu algum error em nossos servidores, tente novamente mais tarde'}
					</div>
				)}

				{!!anounce && (
					<div className="p-4 rounded border border-primary bg-primary/20 text-primary">
						{anounce || 'Solicitado com sucesso'}
					</div>
				)}

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input placeholder="john@doe.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<Input
									placeholder="Senha secreta"
									type="password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-2 items-center justify-between">
					<div>
						<Button asChild variant="link">
							<Link href="/recuperar-senha">
								Esqueci minha senha
							</Link>
						</Button>
					</div>

					<Button type="submit">Acessar</Button>
				</div>
			</form>
		</Form>
	)
}
