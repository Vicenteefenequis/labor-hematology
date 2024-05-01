export const getSearchParams = (url: string) => {
	let params = {} as Record<string, string>

	new URL(url).searchParams.forEach(function (value, key) {
		params[key] = value
	})

	return params
}

export const getPagination = (url: string) => {
	const params = getSearchParams(url)
	let offset = 0
	let limit = 30

	if (params.offset && !isNaN(+params.offset)) {
		offset = +params.offset
	}

	if (params.limit && !isNaN(+params.limit)) {
		limit =
			+params.limit > 100 ? 100 : +params.limit <= 0 ? 30 : +params.limit
	}

	return {
		offset,
		limit,
	}
}

export const getBaseUrl = (url: string) => {
	const parsedUrl = new URL(url)
	return `${parsedUrl.protocol}//${parsedUrl.host}`
}

export const getPathname = (url: string) => {
	return new URL(url).pathname
}

export const actionsToMapObject = (
	actions: Array<{
		rel: string
		method: string
		href: string
	}>,
) => {
	const act = new Map<string, { rel: string; method: string; href: string }>(
		[],
	)

	actions.forEach(action => {
		act.set(action.rel, action)
	})

	return act
}

export const mountBaseUrl = (
	url: string,
	searchParams: URLSearchParams,
): string => {
	const uri = new URL(url)
	return `${uri.protocol}//${uri.host}${uri.pathname}?${searchParams.toString()}`
}

export const handlePaginate = (url: string, total: number) => {
	const { offset, limit } = getPagination(url)
	let prevPage = null
	let nextPage = null
	const firstPage = 0
	let lastPage = null

	if (total % limit > 0 && total - (total % limit) !== offset) {
		lastPage = total - (total % limit)
	}

	if (offset - limit >= 0) {
		prevPage = offset - limit
	}

	if (offset + limit < total) {
		nextPage = offset + limit
	}

	const firstPageSearchParams = new URLSearchParams({
		...getSearchParams(url),
		offset: firstPage.toString(),
		limit: limit.toString(),
	})

	let prev_page = null

	if (prevPage !== null) {
		prev_page = mountBaseUrl(
			url,
			new URLSearchParams({
				...getSearchParams(url),
				offset: prevPage.toString(),
				limit: limit.toString(),
			}),
		)
	}

	let next_page = null

	if (nextPage) {
		next_page = mountBaseUrl(
			url,
			new URLSearchParams({
				...getSearchParams(url),
				offset: nextPage.toString(),
				limit: limit.toString(),
			}),
		)
	}

	let last_page = null

	if (lastPage) {
		last_page = mountBaseUrl(
			url,
			new URLSearchParams({
				...getSearchParams(url),
				offset: lastPage.toString(),
				limit: limit.toString(),
			}),
		)
	}

	return {
		prev_page,
		next_page,
		last_page,
		first_page: mountBaseUrl(url, firstPageSearchParams),
		self: url,
		total,
	}
}
