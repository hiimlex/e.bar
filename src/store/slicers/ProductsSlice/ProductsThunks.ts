import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory, IPaginationResponse, IProduct } from "../../../@types";
import { AxiosError } from "axios";
import { ProductsActions } from "./ProductsSlice";
import { RootState } from "../../Store";
import { CategoriesService, ProductsService } from "../../../api";

const fetchProducts = createAsyncThunk<
	IPaginationResponse<IProduct>,
	boolean | undefined,
	{ rejectValue: AxiosError }
>(
	"Products/fetchProducts",
	async (loading, { getState, rejectWithValue, dispatch }) => {
		try {
			dispatch(ProductsActions.setIsLoadingProducts(loading));
			const filters = (getState() as RootState).products.filters;

			const { data } = await ProductsService.fetchAll(filters);

			return data;
		} catch (error) {
			return rejectWithValue(error as AxiosError);
		}
	}
);

const fetchStoreCategories = createAsyncThunk<
	IPaginationResponse<ICategory>,
	boolean | undefined,
	{ rejectValue: AxiosError }
>(
	"Products/fetchStoreCategories",
	async (loading, { getState, rejectWithValue, dispatch }) => {
		try {
			dispatch(ProductsActions.setIsLoadingProducts(loading));
			const waiter_store = (getState() as RootState).user.waiter?.store;
			const waiter_store_id =
				typeof waiter_store === "string" ? waiter_store : waiter_store?._id;

			const admin_store_id = (getState() as RootState).user.store?._id;

			const store_id = waiter_store_id || admin_store_id;

			const { data } = await CategoriesService.fetchAll({ store_id });

			return data;
		} catch (error) {
			return rejectWithValue(error as AxiosError);
		}
	}
);

export default { fetchProducts, fetchStoreCategories };
