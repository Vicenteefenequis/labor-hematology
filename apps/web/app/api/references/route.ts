import prisma from '@/lib/prisma'
import { handleAndReturnErrorResponse } from '@/lib/api/errors'
import { referenceSchema } from '@/lib/zod/reference-schema'
import { getPagination, getSearchParams, handlePaginate } from '@labor/utils'
import { logError } from '@/lib/pino/logger'

export async function POST(request: Request) {
	try {
		const body = await request.json()

		const reference = referenceSchema.parse(body)

		const result = await prisma.reference.create({
			data: reference,
			select: {
				id: true,
			},
		})
		return Response.json(result, { status: 201 })
	} catch (error) {
		logError(error, 'post: animals resource error')
		return handleAndReturnErrorResponse(error)
	}
}

export async function GET(request: Request) {
	try {
		const pagination = getPagination(request.url)
		const params = getSearchParams(request.url)

		const inTrash = params.in_trash === '1'

		let deletedAt: object | null = null

		if (inTrash) {
			const now = new Date()
			now.setHours(0, 0, 0, 0)
			now.setDate(now.getDate() - 30)
			deletedAt = { gte: now.toISOString() }
		}

		const [references, count] = await prisma.$transaction([
			prisma.reference.findMany({
				take: pagination.limit,
				skip: pagination.offset,
				where: {
					AND: {
						deletedAt,
					},
				},
				orderBy: {
					updatedAt: 'desc',
				},
			}),
			prisma.species.count({ where: { deletedAt } }),
		])

		return Response.json({
			content: references,
			pagination: handlePaginate(request.url, count),
		})
	} catch (error) {
		logError(error, 'get: animals resource error')
		return handleAndReturnErrorResponse(error)
	}
}
