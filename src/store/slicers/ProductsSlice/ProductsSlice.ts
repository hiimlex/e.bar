import {
	ActionCreatorWithPayload,
	SliceCaseReducers,
	SliceSelectors,
	createSlice,
} from "@reduxjs/toolkit";
import { IListProductsFilters, ProductsState } from "../../../@types";
import { GenericAction } from "../../Store";
import { ProductsThunks } from "./ProductsThunks";

const ProductsSlicer = createSlice<
	ProductsState,
	SliceCaseReducers<ProductsState>,
	"Products",
	SliceSelectors<ProductsState>
>({
	name: "Products",
	initialState: {
		filters: {},
		products: [],
		isLoadingProducts: false,
		categories: [],
	},
	reducers: {
		setIsLoadingProducts: (state, action: GenericAction<boolean>) => {
			state.isLoadingProducts = action.payload;
		},
		setFilters: (state, action: GenericAction<IListProductsFilters>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(ProductsThunks.fetchProducts.fulfilled, (state, action) => {
			state.products = action.payload.content;
			state.isLoadingProducts = false;
		});

		builder.addCase(ProductsThunks.fetchProducts.rejected, (state, payload) => {
			state.isLoadingProducts = false;
		});

		builder.addCase(
			ProductsThunks.fetchStoreCategories.fulfilled,
			(state, action) => {
				state.categories = action.payload.content;
			}
		);
	},
});

export const ProductsActions = ProductsSlicer.actions as {
	setFilters: ActionCreatorWithPayload<IListProductsFilters>;
	setIsLoadingProducts: ActionCreatorWithPayload<boolean | undefined>;
};

const ProductsReducer = ProductsSlicer.reducer;

export { ProductsReducer, ProductsSlicer };
