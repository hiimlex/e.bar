import { AxiosResponse } from "axios";
import {
	CreateWaiterPayload,
	IPaginationResponse,
	IWaiter,
	UpdateWaiterPassword,
	UpdateWaiterPayload,
	UpdateWaiterProfilePayload,
	WaitersFilters,
} from "../../@types";
import { queryBuilder } from "../../utils";
import { api } from "../api";
import { Endpoints } from "../endpoints";

const fetchAll = async (
	filters?: WaitersFilters
): Promise<AxiosResponse<IPaginationResponse<IWaiter>>> => {
	try {
		const url = queryBuilder(Endpoints.WaiterList, filters);

		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const create = async (
	data: CreateWaiterPayload
): Promise<AxiosResponse<IWaiter>> => {
	try {
		const res = await api.post(Endpoints.WaiterCreate, data);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const update = async (
	waiterId: string,
	data: Partial<UpdateWaiterPayload>
): Promise<AxiosResponse<IWaiter>> => {
	try {
		const url = queryBuilder(Endpoints.WaiterUpdate, {}, { id: waiterId });

		const res = await api.put(url, data);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const updateProfile = async (
	data: UpdateWaiterProfilePayload
): Promise<AxiosResponse<IWaiter>> => {
	try {
		const res = await api.put(Endpoints.WaiterUpdateProfile, data);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const change_password = async (
	data: UpdateWaiterPassword
): Promise<AxiosResponse<IWaiter>> => {
	try {
		const res = await api.put(Endpoints.WaiterChangePassword, data);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const WaitersService = {
	fetchAll,
	create,
	update,
	updateProfile,
	change_password,
};
