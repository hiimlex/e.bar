import { ISortFilter } from "./generic.model";
import { IOrder } from "./orders.model";
import { IPaginationFilters } from "./pagination.model";
import { IStore } from "./store.model";
import { IWaiter } from "./waiters.model";

export interface ITable {
	_id: string;
	in_use: boolean;
	in_use_by: string | IWaiter;
	enabled: boolean;
	store: string | IStore;
	number: number;
	order?: string | IOrder;
}

export interface ITableFilters
	extends ISortFilter<"number">,
		IPaginationFilters {
	is_enabled?: boolean;
	in_use?: boolean;
	store_id?: string;
}
