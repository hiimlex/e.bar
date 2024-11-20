import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios, AxiosError } from "axios";
import {
	ICategory,
	IPaginationResponse,
	IProduct,
	ThunkOnError,
} from "../../../@types";
import { CategoriesService, ProductsService } from "../../../api";
import { RootState } from "../../Store";
import { ProductsActions } from "./ProductsSlice";

const fetchProducts = createAsyncThunk<
	IPaginationResponse<IProduct>,
	({ loading: boolean } & ThunkOnError) | undefined,
	{ rejectValue: AxiosError }
>(
	"Products/fetchProducts",
	async (payload, { getState, rejectWithValue, dispatch }) => {
		const { loading, onError } = payload || {};
		try {
			dispatch(ProductsActions.setIsLoadingProducts(loading));
			const filters = (getState() as RootState).products.filters;

			const { data } = await ProductsService.fetchAll(filters);

			return data;
		} catch (error) {
			if (onError) {
				onError(error as AxiosError);
			}
			return rejectWithValue(error as AxiosError);
		}
	}
);

const fetchStoreCategories = createAsyncThunk<
	IPaginationResponse<ICategory>,
	({ loading: boolean } & ThunkOnError) | undefined,
	{ rejectValue: AxiosError }
>(
	"Products/fetchStoreCategories",
	async (payload, { getState, rejectWithValue, dispatch }) => {
		try {
			const loading = payload?.loading || false;
			dispatch(ProductsActions.setIsLoadingProducts(loading));
			const waiter_store = (getState() as RootState).user.waiter?.store;
			const waiter_store_id =
				typeof waiter_store === "string" ? waiter_store : waiter_store?._id;

			const admin_store_id = (getState() as RootState).user.store?._id;

			const store_id = waiter_store_id || admin_store_id;

			const { data } = await CategoriesService.fetchAll({ store_id });

			return data;
		} catch (error) {
			const onError = payload?.onError;
			if (onError) {
				onError(error as AxiosError);
			}
			return rejectWithValue(error as AxiosError);
		}
	}
);

export const ProductsThunks = { fetchProducts, fetchStoreCategories };
