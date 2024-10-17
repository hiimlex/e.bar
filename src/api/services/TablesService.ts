import { AxiosResponse } from "axios";
import { IPaginationResponse, ITable, ITableFilters } from "../../@types";
import { queryBuilder } from "../../utils";
import { api } from "../api";
import { Endpoints } from "../endpoints";

const fetchAll = async (
	filters?: ITableFilters
): Promise<AxiosResponse<IPaginationResponse<ITable>>> => {
	try {
		const url = queryBuilder(Endpoints.TableList, filters);

		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const fetchAvailable = async (
	filters?: ITableFilters
): Promise<AxiosResponse<IPaginationResponse<ITable>>> => {
	try {
		const url = queryBuilder(Endpoints.TableListAvailables, filters);

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
		const url = queryBuilder(Endpoints.TableUpdate, {}, { id: tableId });

		const res = await api.put(url, data);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const TablesService = {
	fetchAll,
	fetchAvailable,
	create,
	update,
};
