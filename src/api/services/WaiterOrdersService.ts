import { AxiosResponse } from "axios";
import {
	CreateOrderProductPayload,
	IOrder,
	IPaginationResponse,
	IListOrdersFilters,
	UpdateOrderProductPayload,
} from "../../@types";
import { queryBuilder } from "../../utils";
import { api } from "../api";
import { Endpoints } from "../endpoints";

const fetchAll = async (
	filters?: IListOrdersFilters
): Promise<AxiosResponse<IPaginationResponse<IOrder>>> => {
	try {
		const url = queryBuilder(Endpoints.WaiterOrderList, filters);

		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getById = async (
	orderId: string,
	filters?: IListOrdersFilters
): Promise<AxiosResponse<IOrder>> => {
	try {
		const url = queryBuilder(Endpoints.WaiterOrderShowById, filters, {
			id: orderId,
		});

		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const create = async (
	table_id: string,
	customers: number
): Promise<AxiosResponse<IOrder>> => {
	try {
		const res = await api.post(Endpoints.WaiterOrderCreate, {
			table_id,
			customers,
		});

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const add_order_products = async (
	orderId: string,
	items: CreateOrderProductPayload[]
): Promise<AxiosResponse<IOrder>> => {
	try {
		const url = queryBuilder(Endpoints.WaiterOrderAddItem, {}, { id: orderId });

		const res = await api.put(url, {
			items,
		});

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const update_order_products = async (
	orderId: string,
	items: UpdateOrderProductPayload[]
): Promise<AxiosResponse<IOrder>> => {
	try {
		const url = queryBuilder(
			Endpoints.WaiterOrderUpdateItem,
			{},
			{ id: orderId }
		);

		const res = await api.put(url, {
			items,
		});

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const cancel = async (orderId: string): Promise<AxiosResponse<IOrder>> => {
	try {
		const url = queryBuilder(Endpoints.WaiterOrderCancel, {}, { id: orderId });

		const res = await api.put(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const WaiterOrdersService = {
	fetchAll,
	create,
	add_order_products,
	update_order_products,
	getById,
	cancel,
};
