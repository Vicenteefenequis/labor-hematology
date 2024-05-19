import pino from 'pino'
import { ZodError } from 'zod'
import { LaborApiError } from '@/lib/api/errors'
import { parse } from '@/lib/middleware/utils'
import { NextRequest } from 'next/server'

export const logger = pino({
	formatters: {
		level: label => ({
			level: label,
		}),
	},
	timestamp: () => `,"created_at":"${new Date(Date.now()).toISOString()}"`,
	messageKey: 'message',
})

export function logError(error: any, message: string, request?: Request) {
	if (error instanceof ZodError) return

	if (error instanceof LaborApiError) {
		let requestField = {}

		if (request) {
			const { fullPath } = parse(request as any)

			const [path, searchParams] = fullPath.split('?')

			requestField = {
				url: request.url,
				query_param: searchParams,
				pathname: path,
			}
		}

		logger.error(
			{
				error: error.message,
				stacktrace: error.stack,
				request: requestField,
				error_type: `LaborApiError`,
			},
			message,
		)
		return
	}

	logger.error(
		{
			error: error.message,
			stacktrace: error.stack,
			error_type: `GenericError`,
		},
		message,
	)
}
