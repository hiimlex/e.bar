import { OrderByType } from "../components";

export interface ITable {
	id: number;
	in_use: boolean;
	active: boolean;
	waiter_id?: number;
}

export interface TableFilters {
	direcao?: OrderByType;
	ordem?: "numero";
}
