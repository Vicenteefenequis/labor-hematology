import { handleAndReturnErrorResponse } from '@/lib/api/errors'
import { speciesSchema } from '@/lib/zod/species-schema'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const species = speciesSchema.parse(body)

		const result = await prisma.species.create({
			data: species,
			select: {
				id: true,
			},
		})

		return Response.json(result, { status: 201 })
	} catch (error) {
		console.log(error)
		return handleAndReturnErrorResponse(error)
	}
}
