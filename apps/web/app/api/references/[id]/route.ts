import { LaborApiError, handleAndReturnErrorResponse } from '@/lib/api/errors'
import prisma from '@/lib/prisma'
import { referenceSchema } from '@/lib/zod/reference-schema'

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const { id } = params

		const reference = await prisma.reference.findFirst({
			where: {
				id,
			},
		})

		if (!reference)
			throw new LaborApiError({
				code: 'not_found',
				message: 'reference not found',
			})

		return Response.json(reference)
	} catch (error) {
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
		const references = referenceSchema.partial().parse(body)

		await prisma.reference.update({
			where: { id },
			data: references,
		})

		return new Response(null, { status: 204 })
	} catch (error) {
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
		const reference = referenceSchema.parse(body)

		await prisma.reference.update({
			where: { id },
			data: reference,
		})

		return new Response(null, { status: 204 })
	} catch (error) {
		return handleAndReturnErrorResponse(error)
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const { id } = params

		await prisma.reference.update({
			where: { id },
			data: { deletedAt: new Date() },
		})

		return new Response(null, { status: 204 })
	} catch (error) {
		return handleAndReturnErrorResponse(error)
	}
}
