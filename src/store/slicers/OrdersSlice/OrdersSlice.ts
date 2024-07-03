import {
	ActionCreatorWithPayload,
	SliceCaseReducers,
	SliceSelectors,
	createSlice,
} from "@reduxjs/toolkit";
import {
	OrdersFilter,
	OrdersState,
	ProductCategoriesFilters,
	ProductsFilter,
	ProductsState,
} from "../../../@types";
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
		filters: {
			view: 0,
		},
	},
	reducers: {
		setFilters: (state, action: GenericAction<OrdersFilter>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
	},
});

export const OrdersActions = OrdersSlicer.actions as {
	setFilters: ActionCreatorWithPayload<OrdersFilter>;
};

const OrdersReducer = OrdersSlicer.reducer;

export { OrdersSlicer, OrdersReducer };
