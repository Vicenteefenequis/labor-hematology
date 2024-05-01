import { NextRequest, NextResponse } from 'next/server'
import { parse } from './utils'

export default async function ApiMiddleware(request: NextRequest) {
	const { fullPath } = parse(request)

	// Note: we don't have to account for paths starting with `/api`
	// since they are automatically excluded via our middleware matcher
	return NextResponse.rewrite(new URL(`/api${fullPath}`, request.url))
}
