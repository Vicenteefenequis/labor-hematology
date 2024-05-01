import '@/styles/globals.css'
import { ThemeProvider } from '@labor/ui'
import '@labor/ui/dist/index.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--inter' })

export const metadata: Metadata = {
	title: 'Labor Hematology',
	description: 'One application of labors',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}): JSX.Element {
	return (
		<html lang="en">
			<body className={inter.variable}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
