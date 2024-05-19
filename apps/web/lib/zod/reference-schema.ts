import { z } from 'zod'

const literalSchema = z.union([z.string(), z.number(), z.boolean()])
type Literal = z.infer<typeof literalSchema>
type Json = Literal | { [key: string]: Json } | Json[]

export const jsonSchema: z.ZodType<Json> = z.lazy(() =>
	z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
)

export const referenceSchema = z.object({
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
