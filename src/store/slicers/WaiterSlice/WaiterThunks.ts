import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrder, IPaginationResponse, ThunkOnError } from "../../../@types";
import { AxiosError } from "axios";
import { WaiterActions } from "./WaiterSlice";
import { RootState } from "../../Store";
import { WaiterOrdersService } from "../../../api";

export const getMyOrders = createAsyncThunk<
	IPaginationResponse<IOrder>,
	({ loading: boolean } & ThunkOnError) | undefined,
	{ rejectValue: AxiosError }
>(
	"Waiter/getMyOrders",
	async (payload, { getState, rejectWithValue, dispatch }) => {
		try {
			const loading = payload?.loading;
			dispatch(WaiterActions.setLoadingOrders(loading));

			const filters = (getState() as RootState).waiter.filters;

			const { data } = await WaiterOrdersService.fetchAll(filters);

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

export const WaiterThunks = {
	getMyOrders,
};
