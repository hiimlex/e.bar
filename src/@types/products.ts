export enum ProductCategories {
	"Bebidas" = 1,
	"Comidas" = 2,
	"Refrigerantes" = 3,
	"Petiscos" = 4,
	"Destilados" = 5,
}

export enum ProductCategoriesFilters {
	"Todos" = 0,
	"Bebidas" = 1,
	"Comidas" = 2,
	"Refrigerantes" = 3,
	"Petiscos" = 4,
	"Destilados" = 5,
	"S/ Estoque" = 6,
}

export const ProductCategoriesArray: { key: string; value: number | string }[] =
	[
		{ key: "Todos", value: 0 },
		{ key: "Bebidas", value: 1 },
		{ key: "Comidas", value: 2 },
		{ key: "Refrigerantes", value: 3 },
		{ key: "Petiscos", value: 4 },
		{ key: "Destilados", value: 5 },
		{ key: "S/ Estoque", value: 6 },
	];
export type ProductCategory = keyof typeof ProductCategories;

export interface ProductsFilter {
	category?: ProductCategoriesFilters;
	search?: string;
}

export interface ProductsState {
	products: any[];
	filters: ProductsFilter;
}
