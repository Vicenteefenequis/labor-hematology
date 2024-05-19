import prisma from '@/lib/prisma'
import { handleAndReturnErrorResponse } from '@/lib/api/errors'
import { getPagination, getSearchParams, handlePaginate } from '@labor/utils'
import { animalSchema } from '@/lib/zod/animal-schema'
import { logError } from '@/lib/pino/logger'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
	try {
		const body = await request.json()

		const animal = animalSchema.parse(body)

		const result = await prisma.animal.create({
			data: animal,
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

		let search = {}

		if (params.search) {
			search = {
				OR: [
					{
						name: {
							contains: params.search,
						},
					},
					{
						trackingMark: {
							contains: params.search,
						},
					},
				],
			}
		}

		const [animals, count] = await prisma.$transaction([
			prisma.animal.findMany({
				take: pagination.limit,
				skip: pagination.offset,
				where: {
					...search,
					AND: {
						deletedAt,
					},
				},
				orderBy: {
					updatedAt: 'desc',
				},
			}),
			prisma.animal.count({ where: { deletedAt } }),
		])

		return Response.json({
			content: animals,
			pagination: handlePaginate(request.url, count),
		})
	} catch (error) {
		logError(error, 'get: animals resource error')
		return handleAndReturnErrorResponse(error)
	}
}
