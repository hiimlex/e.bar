import { SafeAny } from "../@types";

export function queryBuilder(
	url: string,
	params?: { [key: string]: SafeAny },
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
			Object.prototype.hasOwnProperty.bind(params, key) &&
			params[key] !== undefined &&
			params[key] !== null &&
			params[key] !== ""
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
