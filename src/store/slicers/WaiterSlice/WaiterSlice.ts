import {
	ActionCreatorWithPayload,
	SliceCaseReducers,
	SliceSelectors,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { IOrder, OrdersFilter, WaiterState } from "../../../@types";
import { GenericAction, RootState } from "../../Store";
import { AxiosError } from "axios";
import { OrdersService } from "../../../api";

export const getMyOrders = createAsyncThunk<
	IOrder[],
	boolean | undefined,
	{ rejectValue: AxiosError }
>(
	"Waiter/getMyOrders",
	async (loading, { getState, rejectWithValue, dispatch }) => {
		try {
			
			dispatch(WaiterActions.setLoadingOrders(loading));
			
			const filters = (getState() as RootState).waiter.filters;


			const { data } = await OrdersService.fetchAll(filters);

			return data;
		} catch (error) {
			return rejectWithValue(error as AxiosError);
		}
	}
);

const WaiterSlice = createSlice<
	WaiterState,
	SliceCaseReducers<WaiterState>,
	"Waiter",
	SliceSelectors<WaiterState>
>({
	name: "Waiter",
	initialState: {
		orders: [],
		filters: {},
		loading_orders: false,
	},
	reducers: {
		setFilters: (state, action: GenericAction<OrdersFilter>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
		setLoadingOrders: (state, action: GenericAction<boolean>) => {
			state.loading_orders = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getMyOrders.fulfilled, (state, action) => {
			state.orders = action.payload;
			state.loading_orders = false;
		});
	},
});

const WaiterActions = WaiterSlice.actions as {
	setFilters: ActionCreatorWithPayload<OrdersFilter>;
	setLoadingOrders: ActionCreatorWithPayload<boolean | undefined>;
};

const WaiterReducer = WaiterSlice.reducer;

export { WaiterActions, WaiterReducer, WaiterSlice };
