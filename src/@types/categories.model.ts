import { IStore } from "./store.model";

export interface IListCategoriesFilters {
	store_id?: string;
}

export interface ICategory {
	_id: string;
	name: string;
	store: string | IStore;
}
