import { OrderByType } from "../components";

export interface IWaiter {
	id: number;
	name: string;
	email: string;
	is_admin: boolean;
	active: boolean;
	phone: string;
}

export interface UserState {
	waiter?: IWaiter;
	isAdmin: boolean;
	isAuthenticated: boolean;
}
export interface WaitersFilters {
	direcao?: OrderByType;
	ordem?: "nome";
	nome?: string;
}
