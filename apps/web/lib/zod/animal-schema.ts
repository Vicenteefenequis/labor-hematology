import { z } from 'zod'

export const animalSchema = z.object({
	name: z.string({ required_error: 'name is required' }),
	trackingMark: z.string().optional(),
	markType: z
		.enum(['MICROCHIP', 'WASHER', 'UNMARKED'], {
			message: 'mark type should be one of MICROCHP, WASHER or UNMARKED',
		})
		.optional(),
	age: z.number({ required_error: 'age should be a number' }).positive({
		message: 'age should be a positive integer',
	}),
	gender: z.enum(['MALE', 'FEMALE', 'UNDEFINED'], {
		required_error: 'gender should be one of MALE, FEMALE or UNDEFINED',
	}),
})
