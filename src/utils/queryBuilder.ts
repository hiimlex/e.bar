export function queryBuilder(
	url: string,
	params?: { [key: string]: any },
	pathVariables?: Record<string, string>
): string {
	if (pathVariables) {
		Object.keys(pathVariables).forEach((key) => {
			url = url.replace(`:${key}`, pathVariables[key]);
		});
	}

	const query = [];
	for (const key in params) {
		if (
			params.hasOwnProperty(key) &&
			params[key] !== undefined &&
			params[key] !== null
		) {
			query.push(`${key}=${params[key]}`);
		}
	}
	const queryString = query.join("&");

	if (queryString) {
		return `${url}?${queryString}`;
	}

	return url;
}
