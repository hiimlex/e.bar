import { AxiosResponse } from "axios";
import { CreateWaiterPayload, IWaiter, WaitersFilters } from "../../@types";
import { queryBuilder } from "../../utils";
import { api } from "../api";
import { Endpoints } from "../endpoints";

const fetchAll = async (
	filters?: WaitersFilters
): Promise<AxiosResponse<IWaiter[]>> => {
	try {
		const url = queryBuilder(Endpoints.GetWaiters, filters);

		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const create = async (
	data: CreateWaiterPayload,
): Promise<AxiosResponse<IWaiter>> => {
	try {
		const res = await api.post(Endpoints.CreateWaiter, data);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const update = async (
	waiterId: string,
	data: Partial<CreateWaiterPayload>
): Promise<AxiosResponse<IWaiter>> => {
	try {
		const url = queryBuilder(Endpoints.UpdateWaiter, {}, { waiterId });

		const res = await api.put(url, data);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const active = async (
	waiterId: string,
	active: boolean
): Promise<AxiosResponse<IWaiter>> => {
	try {
		const url = queryBuilder(Endpoints.UpdateWaiter, {}, { waiterId });

		const res = await api.put(url, { active });

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

export default {
	fetchAll,
	create,
	update,
	active,
};
