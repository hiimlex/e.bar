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

export interface IProduct {
	id: number;
	name: string;
	category: ProductCategory;
	price: number;
	stock: number;
	image_url: string;
}

export interface CreateProductPayload {
	name: string;
	category: string;
	price: number;
	stock: number;
	image_url: string;
}
