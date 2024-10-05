import { AxiosResponse } from "axios";
import { IAttendance, IMeResponse, IStore } from "../../@types";
import { api } from "../api";
import { Endpoints } from "../endpoints";

const login = async (
	email: string,
	password: string
): Promise<AxiosResponse<{ access_token: string; is_store: boolean }>> => {
	try {
		const res = await api.post(
			Endpoints.AuthLogin,
			{ email, password },
			{ withCredentials: false }
		);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getCurrentUser = async (): Promise<AxiosResponse<IMeResponse>> => {
	try {
		const res = await api.get(Endpoints.AuthMe);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getStore = async (): Promise<AxiosResponse<IStore>> => {
	try {
		const res = await api.get(Endpoints.AuthGetStore);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const validateWaiterAttendanceCode = async (): Promise<
	AxiosResponse<IAttendance>
> => {
	try {
		const res = await api.get(Endpoints.AuthValidateAttendanceCode);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

export default {
	login,
	getCurrentUser,
	getStore,
	validateWaiterAttendanceCode,
};
