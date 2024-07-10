import {
	ActionCreatorWithPayload,
	SliceCaseReducers,
	SliceSelectors,
	createSlice,
} from "@reduxjs/toolkit";
import { IOrder, OrdersFilter, OrdersState } from "../../../@types";
import { GenericAction } from "../../Store";

const OrdersSlicer = createSlice<
	OrdersState,
	SliceCaseReducers<OrdersState>,
	"Orders",
	SliceSelectors<OrdersState>
>({
	name: "Orders",
	initialState: {
		orders: [],
		filters: {},
		is_loading_orders: false,
	},
	reducers: {
		setOrders: (state, action: GenericAction<IOrder[]>) => {
			state.orders = action.payload;
		},
		setFilters: (state, action: GenericAction<OrdersFilter>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
		setLoadingOrders: (state, action: GenericAction<boolean>) => {
			state.is_loading_orders = action.payload;
		},
	},
});

export const OrdersActions = OrdersSlicer.actions as {
	setFilters: ActionCreatorWithPayload<OrdersFilter>;
	setLoadingOrders: ActionCreatorWithPayload<boolean>;
	setOrders: ActionCreatorWithPayload<IOrder[]>;
};

const OrdersReducer = OrdersSlicer.reducer;

export { OrdersReducer, OrdersSlicer };
