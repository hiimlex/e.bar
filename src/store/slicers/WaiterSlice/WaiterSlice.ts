import {
	ActionCreatorWithPayload,
	SliceCaseReducers,
	SliceSelectors,
	createSlice,
} from "@reduxjs/toolkit";
import { IListOrdersFilters, WaiterState } from "../../../@types";
import { GenericAction } from "../../Store";
import { WaiterThunks } from "./WaiterThunks";

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
		setFilters: (state, action: GenericAction<IListOrdersFilters>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
		setLoadingOrders: (state, action: GenericAction<boolean>) => {
			state.loading_orders = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(WaiterThunks.getMyOrders.fulfilled, (state, action) => {
			state.orders = action.payload.content;
			state.loading_orders = false;
		});
	},
});

const WaiterActions = WaiterSlice.actions as {
	setFilters: ActionCreatorWithPayload<IListOrdersFilters>;
	setLoadingOrders: ActionCreatorWithPayload<boolean | undefined>;
};

const WaiterReducer = WaiterSlice.reducer;

export { WaiterActions, WaiterReducer, WaiterSlice };
