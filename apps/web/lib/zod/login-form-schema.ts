import z from 'zod'

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 64

export const loginFormSchema = z.object({
	email: z
		.string({ required_error: 'O e-mail é obrigatório' })
		.email('O e-mail deve ser válido'),
	password: z
		.string({ required_error: 'A senha é obrigatória' })
		.min(
			PASSWORD_MIN_LENGTH,
			`A senha deve conter pelo menos ${PASSWORD_MIN_LENGTH} caracteres`,
		)
		.max(
			PASSWORD_MAX_LENGTH,
			`A senha deve conter no maximo ${PASSWORD_MAX_LENGTH} caracteres`,
		),
})

export type LoginSchema = z.infer<typeof loginFormSchema>
