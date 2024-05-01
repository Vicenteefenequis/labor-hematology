/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: false,
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'dsovvfdmameehzfbihnl.supabase.co',
				pathname: '/**',
				port: '',
			},
			{
				protocol: 'https',
				hostname: '*.googleusercontent.com',
				pathname: '/**',
				port: '',
			},
		],
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Referrer-Policy',
						value: 'no-referrer-when-downgrade',
					},
					{
						key: 'X-DNS-Prefetch-Control',
						value: 'on',
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
				],
			},
		]
	},
	async redirects() {
		return [
			// 	{
			// 		source: '/',
			// 		has: [
			// 			{ type: 'host', value: 'preview.labor-hematology.online' },
			// 		],
			// 		destination: 'https://preview.labor-hematology.online',
			// 		permanent: true,
			// 		statusCode: 301,
			// 	},
			// 	{
			// 		source: '/',
			// 		has: [
			// 			{
			// 				type: 'host',
			// 				value: 'dashboard.labor-hematology.online',
			// 			},
			// 		],
			// 		destination: 'https://dasboard.labor-hematology.online',
			// 		permanent: true,
			// 		statusCode: 301,
			// 	},
		]
	},
}
