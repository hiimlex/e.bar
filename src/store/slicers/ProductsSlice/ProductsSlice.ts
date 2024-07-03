import {
	ActionCreatorWithPayload,
	SliceCaseReducers,
	SliceSelectors,
	createSlice,
} from "@reduxjs/toolkit";
import {
	ProductCategoriesFilters,
	ProductsFilter,
	ProductsState,
} from "../../../@types";
import { GenericAction } from "../../Store";

const ProductsSlicer = createSlice<
	ProductsState,
	SliceCaseReducers<ProductsState>,
	"Products",
	SliceSelectors<ProductsState>
>({
	name: "Products",
	initialState: {
		filters: {
			category: ProductCategoriesFilters.Todos,
		},
		products: [],
	},
	reducers: {
		setFilters: (state, action: GenericAction<ProductsFilter>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
	},
});

export const ProductsActions = ProductsSlicer.actions as {
	setFilters: ActionCreatorWithPayload<ProductsFilter>;
};

const ProductsReducer = ProductsSlicer.reducer;

export { ProductsSlicer, ProductsReducer };
