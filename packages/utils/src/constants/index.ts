export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Labor Hematology'
export const SHORT_DOMAIN =
	process.env.NEXT_PUBLIC_SHORT_DOMAIN || 'laborator.io'
export const HOME_DOMAIN = `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`

export const APP_HOSTNAMES = new Set([
	`${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`localhost:3000`,
	`localhost`,
])

export const APP_DOMAIN =
	process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
		? `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`
		: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
			? `https://preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
			: `http://localhost:3000`

export const DASHBOARD_HOSTNAMES = new Set([
	`dashboard.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`preview-dashboard.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`dashboard.localhost:3000`,
])

export const DASHBOARD_DOMAIN =
	process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
		? `https://dashboard.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
		: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
			? `https://preview-dashboard.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
			: `http://dashboard.localhost:3000`

export const API_HOSTNAMES = new Set([
	`api.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`api-staging.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`api.${SHORT_DOMAIN}`,
	`api.localhost:3000`,
])

export const API_DOMAIN =
	process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
		? `https://api.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
		: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
			? `https://api-staging.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
			: `http://api.localhost:3000`
