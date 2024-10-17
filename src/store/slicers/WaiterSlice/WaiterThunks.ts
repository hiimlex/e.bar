import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrder, IPaginationResponse } from "../../../@types";
import { AxiosError } from "axios";
import { WaiterActions } from "./WaiterSlice";
import { RootState } from "../../Store";
import { WaiterOrdersService } from "../../../api";

export const getMyOrders = createAsyncThunk<
	IPaginationResponse<IOrder>,
	boolean | undefined,
	{ rejectValue: AxiosError }
>(
	"Waiter/getMyOrders",
	async (loading, { getState, rejectWithValue, dispatch }) => {
		try {
			dispatch(WaiterActions.setLoadingOrders(loading));

			const filters = (getState() as RootState).waiter.filters;

			const { data } = await WaiterOrdersService.fetchAll(filters);

			return data;
		} catch (error) {
			return rejectWithValue(error as AxiosError);
		}
	}
);

export const WaiterThunks = {
	getMyOrders,
};
