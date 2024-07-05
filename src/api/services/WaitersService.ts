import { AxiosResponse } from "axios";
import { IWaiter } from "../../@types";
import { queryBuilder } from "../../utils";
import { api } from "../api";
import { Endpoints } from "../endpoints";

const fetchAll = async (filters?: any): Promise<AxiosResponse<IWaiter[]>> => {
	try {
		const url = queryBuilder(Endpoints.GetWaiters, filters);

		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

export default {
	fetchAll,
};
