import { Record } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'
import { ZodError, z } from 'zod'
import { generateErrorMessage } from 'zod-error'

export const ErrorCode = z.enum([
	'bad_request',
	'internal_server_error',
	'unprocessable_entity',
	'not_found',
])

const ErrorCodeToHttpStatus: Record<z.infer<typeof ErrorCode>, number> = {
	bad_request: 400,
	not_found: 404,
	unprocessable_entity: 422,
	internal_server_error: 500,
}

export type ErrorCodes = z.infer<typeof ErrorCode>

const docErrorUrl = 'https://labor.io/docs/api-reference/errors'

export class LaborApiError extends Error {
	public readonly code: z.infer<typeof ErrorCode>

	public readonly docUrl?: string

	constructor({
		code,
		message,
		docUrl,
	}: {
		code: z.infer<typeof ErrorCode>
		message: string
		docUrl?: string
	}) {
		super(message)
		this.code = code
		this.docUrl = docUrl ?? `${docErrorUrl}#${code}`
	}
}

const ErrorSchema = z.object({
	error: z.object({
		code: ErrorCode,
		message: z.string(),
		doc_url: z.string().optional(),
	}),
})

export type ErrorResponse = z.infer<typeof ErrorSchema>

export function fromZodError(error: ZodError): ErrorResponse {
	return {
		error: {
			code: 'unprocessable_entity',
			message: generateErrorMessage(error.issues, {
				maxErrors: 1,
				delimiter: {
					component: ': ',
				},
				path: {
					enabled: true,
					type: 'objectNotation',
					label: '',
				},
				code: {
					enabled: true,
					label: '',
				},
				message: {
					enabled: true,
					label: '',
				},
			}),
			doc_url: `${docErrorUrl}#unprocessable_entity`,
		},
	}
}

export function handleApiError(error: any): ErrorResponse & { status: number } {
	if (error instanceof ZodError) {
		return {
			...fromZodError(error),
			status: 422,
		}
	}

	if (error instanceof LaborApiError) {
		return {
			error: {
				code: error.code,
				message: error.message,
				doc_url: error.docUrl,
			},
			status: ErrorCodeToHttpStatus[error.code],
		}
	}

	return {
		error: {
			code: 'internal_server_error',
			message:
				'A internal server error occurred. Please contact our support if the problem persists.',
			doc_url: `${docErrorUrl}#internal_server_error`,
		},
		status: 500,
	}
}

export function handleAndReturnErrorResponse(
	err: unknown,
	headers?: Record<string, string>,
) {
	const { error, status } = handleApiError(err)
	return NextResponse.json<ErrorResponse>({ error }, { headers, status })
}
