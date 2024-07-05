import { AxiosResponse } from "axios";
import { api } from "../api";
import { Endpoints } from "../endpoints";
import { IWaiter } from "../../@types";

const login = async (
	email: string,
	password: string
): Promise<AxiosResponse<{ access_token: string }>> => {
	try {
		const res = await api.post(
			Endpoints.Login,
			{ email, password },
			{ withCredentials: false }
		);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getCurrentUser = async (): Promise<AxiosResponse<IWaiter>> => {
	try {
		const res = await api.get(Endpoints.Me);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

export default {
	login,
	getCurrentUser,
};
