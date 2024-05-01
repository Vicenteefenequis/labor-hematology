import { NextFetchEvent, type NextRequest } from 'next/server'
import { parse } from './lib/middleware/utils'
import { API_HOSTNAMES, DASHBOARD_HOSTNAMES } from '@labor/utils'
import RootMiddleware from './lib/middleware/root'
import DashboardMiddleware from './lib/middleware/dashboard'
import ApiMiddleware from './lib/middleware/api'

export async function middleware(request: NextRequest, ev: NextFetchEvent) {
	const { domain } = parse(request)

	// for API
	if (API_HOSTNAMES.has(domain)) {
		return ApiMiddleware(request)
	}

	// for Dashboard
	if (DASHBOARD_HOSTNAMES.has(domain)) {
		return DashboardMiddleware(request)
	}

	return RootMiddleware(request, ev)
}

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api/ routes
		 * 2. /_next/ (Next.js internals)
		 * 3. /_proxy/ (special page for OG tags proxying)
		 * 4. /_static (inside /public)
		 * 5. /_vercel (Vercel internals)
		 * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
		 */
		'/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)',
	],
}
