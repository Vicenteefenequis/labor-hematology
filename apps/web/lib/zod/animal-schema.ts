import { z } from 'zod'

export const markTypeSchema = z.enum(['MICROCHIP', 'WASHER', 'UNMARKED'], {
	message: 'mark type should be one of MICROCHP, WASHER or UNMARKED',
})

export const ageSchema = z.enum(['CUB', 'YOUNG', 'ADULT', 'ELDERLY'], {
	message: 'age should be one of CUB, YOUNG, ADULT, ELDERLY',
})

export const genderSchema = z.enum(['MALE', 'FEMALE', 'UNDEFINED'], {
	required_error: 'gender should be one of MALE, FEMALE or UNDEFINED',
})

export const animalSchema = z.object({
	name: z.string({ required_error: 'name is required' }),
	trackingMark: z.string().optional(),
	markType: markTypeSchema.optional(),
	age: ageSchema.optional(),
	gender: genderSchema,
})

export type Animal = z.infer<typeof animalSchema>
