import { z } from 'zod'

export const speciesSchema = z.object({
	commonName: z.string().optional(),
	classification: z.enum(['BIRD', 'REPTILE', 'MAMMAL'], {
		message: 'classification should be one of BIRD, REPITLE or MAMMAL',
	}),
	scientificName: z.string({ required_error: 'scientif name is required' }),
})
