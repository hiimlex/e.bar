import {
	ActionCreatorWithPayload,
	SliceCaseReducers,
	SliceSelectors,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
	IProduct,
	ProductCategoriesFilters,
	ProductsFilter,
	ProductsState,
} from "../../../@types";
import { ProductsService } from "../../../api";
import { GenericAction, RootState } from "../../Store";

const fetchProducts: any = createAsyncThunk<
	IProduct[],
	void,
	{ rejectValue: AxiosError }
>("Products/fetchProducts", async (_, { getState, rejectWithValue, dispatch }) => {
	try {
		dispatch(ProductsActions.setIsLoadingProducts(true));
		const filters = (getState() as RootState).products.filters;
		

		const { data } = await ProductsService.fetchAll(filters);

		return data;
	} catch (error) {
		return rejectWithValue(error as AxiosError);
	}
});

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

		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.products = [];
			state.isLoadingProducts = false;
		});
	},
});

export const ProductsActions = ProductsSlicer.actions as {
	setFilters: ActionCreatorWithPayload<ProductsFilter>;
	setIsLoadingProducts: ActionCreatorWithPayload<boolean>;
};

const ProductsReducer = ProductsSlicer.reducer;

export { ProductsReducer, ProductsSlicer, fetchProducts };
