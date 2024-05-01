import z from 'zod'

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 64

export const registerFormSchema = z
	.object({
		email: z
			.string({ required_error: 'O e-mail é obrigatório' })
			.email('O e-mail deve ser válido'),
		password: z
			.string({ required_error: 'A senha é obrigatória' })
			.min(PASSWORD_MIN_LENGTH)
			.max(PASSWORD_MAX_LENGTH),
		confirm_password: z.string({
			required_error: 'A confirmação de senha é obrigatória',
		}),
	})
	.refine(({ password, confirm_password }) => password === confirm_password, {
		message: 'As senhas devem ser iguais',
		path: ['confirm_password'],
	})

export type RegisterSchema = z.infer<typeof registerFormSchema>
