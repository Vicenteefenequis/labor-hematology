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
}
