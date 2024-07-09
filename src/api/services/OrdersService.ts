import { AxiosResponse } from "axios";
import { IOrder, OrdersFilter } from "../../@types";
import { queryBuilder } from "../../utils";
import { api } from "../api";
import { Endpoints } from "../endpoints";

const fetchAll = async (
	filters?: OrdersFilter
): Promise<AxiosResponse<IOrder[]>> => {
	try {
		const url = queryBuilder(Endpoints.GetOrders, filters);

		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const create = async (table_id: number): Promise<AxiosResponse<IOrder>> => {
	try {
		const res = await api.post(Endpoints.CreateOrder, { table_id });

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const update_products = async (
	orderId: string,
	products: { product_id: number; quantity: number }[]
): Promise<AxiosResponse<IOrder>> => {
	try {
		const url = queryBuilder(Endpoints.UpdateOrderProducts, {}, { orderId });

		const res = await api.put(url, {
			products,
		});

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

export default {
	fetchAll,
	create,
	update_products,
};
