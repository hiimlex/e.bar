import { ICategory } from "./categories.model";
import { ISortFilter } from "./generic.model";
import { IStore } from "./store.model";

export enum ProductCategories {
	"Cervejas" = "Cervejas",
	"Comidas" = "Comidas",
	"Refrigerantes" = "Refrigerantes",
	"Petiscos" = "Petiscos",
	"Destilados" = "Destilados",
}

export const ProductCategoriesArray: { key: string; value: ProductCategory }[] =
	[
		{ key: "Cervejas", value: "Cervejas" },
		{ key: "Comidas", value: "Comidas" },
		{ key: "Refrigerantes", value: "Refrigerantes" },
		{ key: "Petiscos", value: "Petiscos" },
		{ key: "Destilados", value: "Destilados" },
	];
export type ProductCategory = keyof typeof ProductCategories;

export interface IListProductsFilters
	extends ISortFilter<"name" | "created_at" | "stock" | "price"> {
	store_id?: string;
	category_id?: string;
	name?: string;
	no_stock?: boolean;
}

export interface ProductsState {
	products: IProduct[];
	filters: IListProductsFilters;
	isLoadingProducts?: boolean;
	categories: ICategory[];
}

export interface IPicture {
	url: string;
	original_name: string;
}

export interface IProduct {
	_id: string;
	name: string;
	stock: number;
	category: string | ICategory;
	store: string | IStore;
	category_name: string;
	enabled: boolean;
	price: number;
	picture?: IPicture;
	created_at: string;
	updated_at: string;
}

export interface CreateProductPayload {
	name: string;
	category: string;
	price: number;
	stock: number;
}

export interface WaiterAddProductsPageProps {}

export interface ConfirmAddProductsProps {
	orderId: string;
	productList: AddProduct;
	cancel?: () => void;
	onChange?: (productList: AddProduct) => void;
	onConfirm?: () => void;
}

export type AddProduct = Record<
	string,
	{ product: IProduct; quantity: number }
>;
