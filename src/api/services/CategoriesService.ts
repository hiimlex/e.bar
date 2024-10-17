import { AxiosResponse } from "axios";
import {
	ICategory,
	IListCategoriesFilters,
	IPaginationResponse,
} from "../../@types";
import { queryBuilder } from "../../utils";
import { api } from "../api";
import { Endpoints } from "../endpoints";

const fetchAll = async (
	filters?: IListCategoriesFilters
): Promise<AxiosResponse<IPaginationResponse<ICategory>>> => {
	try {
		const url = queryBuilder(Endpoints.CategoryList, filters);

		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const CategoriesService = { fetchAll };
