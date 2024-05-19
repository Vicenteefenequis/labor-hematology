import { fetchUser } from '@/lib/actions/fetch-user'
import { Avatar, AvatarFallback, AvatarImage } from '@labor/ui'

export async function Header() {
	const { error, user } = await fetchUser()

	if (error || !user) {
		return (
			<header className="py-6">
				<div>Não foi possível carregar dados de usuário</div>
			</header>
		)
	}

	const fallback = () => {
		let initials = ''

		initials = (user.name || '')
			.split(' ')
			.reduce((initials, name, idx) => {
				if (idx > 1) return initials

				if (initials.length === 0) {
					initials = name.substring(0, 2).toUpperCase()
				}

				if (initials?.length > 1 && idx > 0) {
					initials = initials[0] + name.substring(0, 1).toUpperCase()
				}

				return initials
			}, '')

		if (!user.name) {
			initials = user.email!.substring(0, 2).toUpperCase()
		}

		return initials
	}

	return (
		<header className="py-6">
			<div className="flex items-center gap-4">
				<Avatar>
					<AvatarImage
						src={user.image || undefined}
						alt="Foto de perfil do usuário"
						width={40}
						height={40}
						className="rounded-full"
					/>
					<AvatarFallback>{fallback()}</AvatarFallback>
				</Avatar>

				<span>Bem vindo(a), {user.name || user.email}</span>
			</div>
		</header>
	)
}
