import { OrderByType } from "../components";

export interface ITable {
	id: number;
	in_use: boolean;
	is_active: boolean;
	waiter_id?: number;
}

export interface TableFilters {
	sort?: OrderByType;
	sort_key?: "id";
	is_active?: boolean;
	in_use?: boolean;
}
