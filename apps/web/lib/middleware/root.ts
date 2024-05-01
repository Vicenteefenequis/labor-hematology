import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export default async function RootMiddleware(
	request: NextRequest,
	ev: NextFetchEvent,
) {
	console.log('Is RootMiddleware')
	return NextResponse.next()
}
