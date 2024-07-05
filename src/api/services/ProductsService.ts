import { AxiosResponse } from "axios";
import { api } from "../api";
import { CreateProductPayload, IProduct, ProductsFilter } from "../../@types";
import { Endpoints } from "../endpoints";
import { queryBuilder } from "../../utils";

const fetchAll = async (
	filters?: ProductsFilter
): Promise<AxiosResponse<IProduct[]>> => {
	try {
		const url = queryBuilder(Endpoints.GetProducts, filters);

		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const create = async (
	product: CreateProductPayload
): Promise<AxiosResponse<IProduct>> => {
	try {
		const res = await api.post(Endpoints.CreateProduct, product);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const update = async (
	productId: string,
	product: Partial<CreateProductPayload>
): Promise<AxiosResponse<IProduct>> => {
	try {
		const url = queryBuilder(Endpoints.UpdateProduct, {}, { productId });
		const res = await api.put(url, product);

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
