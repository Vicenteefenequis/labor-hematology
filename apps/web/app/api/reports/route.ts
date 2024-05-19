import { handleAndReturnErrorResponse } from '@/lib/api/errors'
import { speciesSchema } from '@/lib/zod/species-schema'
import prisma from '@/lib/prisma'
import { logError } from '@/lib/pino/logger'
import { reportsSchema } from '@/lib/zod/reports-schema'
import { supabaseMiddleware } from '@/lib/supabase/middleware'
import { NextRequest } from 'next/server'

export async function POST(request: Request) {
	try {
		const supabase = await supabaseMiddleware(request as NextRequest)

		const {
			error,
			data: { user },
		} = await supabase.auth.getUser()

		console.log({ user })

		// const body = await request.json()
		// const reports = reportsSchema.parse(body)
		// const result = await prisma.report.create({
		// 	data: reports,
		// 	select: {
		// 		id: true,
		// 	},
		// })
		// return Response.json(result, { status: 201 })
	} catch (error) {
		logError(error, 'post: animals resource error')
		return handleAndReturnErrorResponse(error)
	}
}
