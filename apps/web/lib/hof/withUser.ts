import { fetchUserLoader } from '../actions/fetch-user'

export function withUser(
	routeFunc: (request: Request, user: any) => Promise<Response>,
) {
	return async function (request: Request) {
		const { user } = await fetchUserLoader()
		if (!user) {
			return Response.json({ message: 'Unauthorized' }, { status: 401 })
		}
		return routeFunc(request, user)
	}
}
