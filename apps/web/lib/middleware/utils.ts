import { NextRequest } from 'next/server'
import { SHORT_DOMAIN } from '@labor/utils'

export const parse = (request: NextRequest) => {
	let domain = request.headers.get('host') as string
	domain = domain.replace('www.', '') // remove www. from domain
	if (domain === '' || domain.endsWith('.vercel.app')) {
		domain = SHORT_DOMAIN
	}

	// path is the path of the URL (e.g. labor.co/dashboard/laudos -> /dashboard/laudos)
	let path = request.nextUrl.pathname

	// fullPath is the full URL path (along with search params)
	const searchParams = request.nextUrl.searchParams.toString()
	const fullPath = `${path}?${searchParams.length > 0 ? searchParams : ''}`

	const key = decodeURIComponent(path.split('/')[1]) // key is the first path segment of the path (e.g. labor.co/dashboard/laudos -> dashboard)
	const fullKey = decodeURIComponent(path.slice(1)) // fullKey is the full path without the first slash

	return { domain, path, fullPath, key, fullKey }
}
