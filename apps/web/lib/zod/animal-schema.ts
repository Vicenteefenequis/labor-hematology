import { z } from 'zod'

export const animalSchema = z.object({
	name: z.string({ required_error: 'name is required' }),
	trackingMark: z.string().optional(),
	markType: z
		.enum(['MICROCHIP', 'WASHER', 'UNMARKED'], {
			message: 'mark type should be one of MICROCHP, WASHER or UNMARKED',
		})
		.optional(),
	age: z
		.enum(['CUB', 'YOUNG', 'ADULT', 'ELDERLY'], {
			message: 'age should be one of CUB, YOUNG, ADULT, ELDERLY',
		})
		.optional(),
	gender: z.enum(['MALE', 'FEMALE', 'UNDEFINED'], {
		required_error: 'gender should be one of MALE, FEMALE or UNDEFINED',
	}),
})
