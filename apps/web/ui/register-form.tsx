'use client'
import {
	RegisterSchema,
	registerFormSchema,
} from '@/lib/zod/register-form-schema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import {
	Button,
	Form,
	FormControl,
	FormDescription,
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
])

export const RegisterForm = () => {
	const searchParams = useSearchParams()
	const redir = searchParams?.get('redir')
	const error = searchParams?.get('error')
	const anounce = searchParams?.get('anounce')

	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerFormSchema),
	})
	const onSubmit: SubmitHandler<RegisterSchema> = async ({
		email,
		password,
	}) => {
		const supabase = createClient()
		let path = redir || '/'
		const result = await supabase.auth.signUp({
			email,
			password,
		})

		if (result.error) {
			path = `/register?error=${result.error.message}`
		} else if (!result.data.session) {
			path = `/register?anounce=${encodeURIComponent('Um link de confirmação foi enviado para o seu e-mail')}`
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
				<FormField
					control={form.control}
					name="confirm_password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirme sua senha</FormLabel>
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

				<FormDescription>
					Ao registrar-se você declara que leu e aceita os{' '}
					<Link
						className="text-primary hover:underline underline-offset-4"
						href="#"
					>
						Termos de privacidade
					</Link>{' '}
				</FormDescription>

				<Button type="submit">Registrar</Button>
			</form>
		</Form>
	)
}
