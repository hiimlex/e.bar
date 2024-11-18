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
		loadingOrders: false,
	},
	reducers: {
		setOrderFilters: (state, action: GenericAction<IListOrdersFilters>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
		setLoadingOrders: (state, action: GenericAction<boolean>) => {
			state.loadingOrders = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(WaiterThunks.getMyOrders.fulfilled, (state, action) => {
			state.orders = action.payload.content;
			state.loadingOrders = false;
		});
	},
});

const WaiterActions = WaiterSlice.actions as {
	setOrderFilters: ActionCreatorWithPayload<IListOrdersFilters>;
	setLoadingOrders: ActionCreatorWithPayload<boolean | undefined>;
};

const WaiterReducer = WaiterSlice.reducer;

export { WaiterActions, WaiterReducer, WaiterSlice };
