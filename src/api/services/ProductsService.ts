import { AxiosResponse } from "axios";
import { api } from "../api";
import {
	CreateProductPayload,
	IListProductsFilters,
	IPaginationResponse,
	IProduct,
} from "../../@types";
import { Endpoints } from "../endpoints";
import { queryBuilder } from "../../utils";

const fetchAll = async (
	filters?: IListProductsFilters
): Promise<AxiosResponse<IPaginationResponse<IProduct>>> => {
	try {
		const url = queryBuilder(Endpoints.ProductList, filters);

		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const create = async (
	product: CreateProductPayload,
	file: File
): Promise<AxiosResponse<IProduct>> => {
	try {
		const formData = new FormData();

		formData.append("file", file);
		Object.entries(product).forEach(([key, value]) => {
			formData.append(key, value);
		});

		const res = await api.post(Endpoints.ProductCreate, formData);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const update = async (
	productId: string,
	product: Partial<CreateProductPayload>,
	file?: File | null
): Promise<AxiosResponse<IProduct>> => {
	try {
		const formData = new FormData();

		if (file) {
			formData.append("image", file);
		}

		Object.entries(product).forEach(([key, value]) => {
			formData.append(key, value.toString());
		});

		const url = queryBuilder(Endpoints.ProductUpdate, {}, { id: productId });
		const res = await api.put(url, formData);

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
