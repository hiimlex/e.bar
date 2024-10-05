import { AxiosResponse } from "axios";
import {
	CreateOrderProductPayload,
	IOrder,
	IPaginationResponse,
	OrdersFilter,
	ServeOrderProductPayload,
} from "../../@types";
import { queryBuilder } from "../../utils";
import { api } from "../api";
import { Endpoints } from "../endpoints";

const fetchAll = async (
	filters?: OrdersFilter
): Promise<AxiosResponse<IPaginationResponse<IOrder>>> => {
	try {
		const url = queryBuilder(Endpoints.WaiterOrderList, filters);

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
		const res = await api.post(Endpoints.WaiterOrderCreate, { table_id, customers });

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const add_order_products = async (
	orderId: string,
	products: CreateOrderProductPayload[]
): Promise<AxiosResponse<IOrder>> => {
	try {
		const url = queryBuilder(Endpoints.AddOrderProducts, {}, { orderId });

		const res = await api.put(url, {
			products,
		});

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const serve_order_products = async (
	orderId: string,
	order_products: ServeOrderProductPayload[]
): Promise<AxiosResponse<IOrder>> => {
	try {
		const url = queryBuilder(Endpoints.ServeOrderProducts, {}, { orderId });

		const res = await api.post(url, {
			order_products,
		});

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

export default {
	fetchAll,
	create,
	add_order_products,
	serve_order_products,
};
