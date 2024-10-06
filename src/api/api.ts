import axios, { AxiosError } from "axios";
import { SafeAny } from "../@types";

export function errToAxiosError(err: SafeAny): AxiosError {
	const { message, code, config, request, response } = err;

	return new AxiosError(message, code, config, request, response);
}

export let BASE_URL = "http://localhost:3000" ;
BASE_URL = "http://192.168.1.116:3000";

export const api = axios.create({
	// baseURL: "http://127.0.0.1:8080",
	baseURL: BASE_URL,
	withCredentials: true,
});

export const AUTH_TOKEN_KEY = "auth-token";

api.interceptors.request.use(async (config) => {
	const token = localStorage.getItem(AUTH_TOKEN_KEY);

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});
