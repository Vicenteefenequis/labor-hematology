import { LaborApiError, handleAndReturnErrorResponse } from '@/lib/api/errors'
import { logError } from '@/lib/pino/logger'
import prisma from '@/lib/prisma'
import { speciesSchema } from '@/lib/zod/species-schema'

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const { id } = params

		const species = await prisma.species.findFirst({
			where: {
				id,
			},
		})

		if (!species)
			throw new LaborApiError({
				code: 'not_found',
				message: 'species not found',
			})

		return Response.json(species)
	} catch (error) {
		logError(error, 'get: animals resource error')
		return handleAndReturnErrorResponse(error)
	}
}

export async function PATCH(
	request: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const { id } = params
		const body = await request.json()
		const species = speciesSchema.partial().parse(body)

		await prisma.species.update({
			where: { id },
			data: species,
		})

		return new Response(null, { status: 204 })
	} catch (error) {
		logError(error, 'patch: animals resource error')
		return handleAndReturnErrorResponse(error)
	}
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const { id } = params
		const body = await request.json()
		const animal = speciesSchema.parse(body)

		await prisma.species.update({
			where: { id },
			data: animal,
		})

		return new Response(null, { status: 204 })
	} catch (error) {
		logError(error, 'put: animals resource error')
		return handleAndReturnErrorResponse(error)
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const { id } = params

		await prisma.species.update({
			where: { id },
			data: { deletedAt: new Date() },
		})

		return new Response(null, { status: 204 })
	} catch (error) {
		logError(error, 'delete: animals resource error')
		return handleAndReturnErrorResponse(error)
	}
}
