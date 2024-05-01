import { fetchUser } from '@/lib/actions/fetch-user'
import Image from 'next/image'

export async function Header() {
	const { error, user } = await fetchUser()

	if (error || !user) {
		return (
			<header className="py-6">
				<div>Não foi possível carregar dados de usuário</div>
			</header>
		)
	}

	return (
		<header className="py-6">
			<div className="flex items-center gap-4">
				<Image
					src={user.image || ''}
					alt="Foto de perfil do usuário"
					width={40}
					height={40}
					className="rounded-full"
				/>

				<span>Bem vindo(a), {user.name || user.email}</span>
			</div>
		</header>
	)
}
