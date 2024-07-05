import { AxiosResponse } from "axios";
import { ITable } from "../../@types";
import { queryBuilder } from "../../utils";
import { api } from "../api";
import { Endpoints } from "../endpoints";

const fetchAll = async (filters?: any): Promise<AxiosResponse<ITable[]>> => {
	try {
		const url = queryBuilder(Endpoints.GetTables, filters);

		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const create = async (): Promise<AxiosResponse<ITable>> => {
	try {
		const res = await api.post(Endpoints.CreateTable, {});

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const update = async (
	tableId: string,
	data: Partial<ITable>
): Promise<AxiosResponse<ITable>> => {
	try {
		const url = queryBuilder(Endpoints.UpdateTable, {}, { tableId });

		const res = await api.put(url, data);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

export default {
	fetchAll,
	create,
	update,
};
