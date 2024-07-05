import axios, { AxiosError } from "axios";

export function errToAxiosError(err: any): AxiosError {
	const { message, code, config, request, response } = err;

	return new AxiosError(message, code, config, request, response);
}

export const api = axios.create({
	baseURL: "http://127.0.0.1:5000",
	});

export const AUTH_TOKEN_KEY = "auth-token";

api.interceptors.request.use(async (config) => {
	const token = localStorage.getItem(AUTH_TOKEN_KEY);

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});
