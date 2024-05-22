import { handleAndReturnErrorResponse } from '@/lib/api/errors'
import prisma from '@/lib/prisma'
import { logError } from '@/lib/pino/logger'
import { reportsSchema } from '@/lib/zod/reports-schema'
import { withUser } from '@/lib/hof/withUser'

export const POST = withUser(async function (request: Request, user: any) {
	try {
		const body = await request.json()
		const reports = reportsSchema.parse({ ...body, userId: user.id })
		const result = await prisma.report.create({
			data: reports,
			select: {
				id: true,
			},
		})

		return Response.json(result, { status: 201 })
	} catch (error) {
		logError(error, 'post: reports resource error')
		return handleAndReturnErrorResponse(error)
	}
})
