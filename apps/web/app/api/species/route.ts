import { handleAndReturnErrorResponse } from '@/lib/api/errors'
import { speciesSchema } from '@/lib/zod/species-schema'
import prisma from '@/lib/prisma'
import { getPagination, getSearchParams, handlePaginate } from '@labor/utils'

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
						commonName: {
							contains: params.search,
						},
					},
					{
						scientificName: {
							contains: params.search,
						},
					},
				],
			}
		}

		const [species, count] = await prisma.$transaction([
			prisma.species.findMany({
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
			prisma.species.count({ where: { deletedAt } }),
		])

		return Response.json({
			content: species,
			pagination: handlePaginate(request.url, count),
		})
	} catch (error) {
		return handleAndReturnErrorResponse(error)
	}
}
