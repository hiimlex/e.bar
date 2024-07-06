import {
	ActionCreatorWithPayload,
	SliceCaseReducers,
	SliceSelectors,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IProduct, ProductsFilter, ProductsState } from "../../../@types";
import { ProductsService } from "../../../api";
import { GenericAction, RootState } from "../../Store";

const fetchProducts = createAsyncThunk<
	IProduct[],
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
	},
	reducers: {
		setIsLoadingProducts: (state, action: GenericAction<boolean>) => {
			state.isLoadingProducts = action.payload;
		},
		setFilters: (state, action: GenericAction<ProductsFilter>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.products = action.payload;
			state.isLoadingProducts = false;
		});

		builder.addCase(fetchProducts.rejected, (state) => {
			state.products = [];
			state.isLoadingProducts = false;
		});
	},
});

export const ProductsActions = ProductsSlicer.actions as {
	setFilters: ActionCreatorWithPayload<ProductsFilter>;
	setIsLoadingProducts: ActionCreatorWithPayload<boolean | undefined>;
};

const ProductsReducer = ProductsSlicer.reducer;

export { ProductsReducer, ProductsSlicer, fetchProducts };
