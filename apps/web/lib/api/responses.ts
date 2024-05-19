import { z } from 'zod'
import {
	ageSchema,
	genderSchema,
	markTypeSchema,
} from '@/lib/zod/animal-schema'

const paginationResponseSchema = z.object({
	prev_page: z.string().nullable(),
	next_page: z.string().nullable(),
	last_page: z.string().nullable(),
	first_page: z.string(),
	self: z.string(),
	total: z.number().positive(),
})

export type PaginationResponse = z.infer<typeof paginationResponseSchema>

const animalContentResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	trackingMark: z.string().nullable(),
	markType: markTypeSchema.nullable(),
	age: ageSchema,
	gender: genderSchema,
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
	deletedAt: z.string().datetime().nullable(),
})

export type AnimalResponse = z.infer<typeof animalContentResponseSchema>

const animalResponseSchema = z.object({
	content: z.array(animalContentResponseSchema),
	pagination: paginationResponseSchema,
})

export type AnimalSearchResponse = z.infer<typeof animalResponseSchema>
