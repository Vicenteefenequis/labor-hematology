import { z } from 'zod'
import { jsonSchema } from './json-schema'

export const reportsSchema = z.object({
	userId: z.string({ required_error: 'user id is required' }),
	specieId: z.string({ required_error: 'specie id is required' }),
	gender: z.enum(['MALE', 'FEMALE', 'UNDEFINED'], {
		required_error: 'gender should be one of MALE, FEMALE or UNDEFINED',
	}),
	age: z
		.enum(['CUB', 'YOUNG', 'ADULT', 'ELDERLY'], {
			message: 'age should be one of CUB, YOUNG, ADULT, ELDERLY',
		})
		.optional(),
	examType: z.string(),
	values: jsonSchema,
})
