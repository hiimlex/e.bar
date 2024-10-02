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

export interface ProductsFilter {
	categoria?: ProductCategory;
	nome?: string;
	sem_estoque?: boolean;
	direcao?: "asc" | "desc";
	ordem?: "nome" | "estoque" | "preco";
}

export interface ProductsState {
	products: IProduct[];
	filters: ProductsFilter;
	isLoadingProducts?: boolean;
}

export interface ICategory {
	_id: string;
	name: string;
	store: string | IStore;
}

export interface IPicture {
	url: string;
	original_name: string;
}

export interface IProduct {
	_id: number;
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
