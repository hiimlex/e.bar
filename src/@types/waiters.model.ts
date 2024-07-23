import { Socket } from "socket.io-client";
import { OrderByType } from "../components";

export interface IWaiter {
	id: number;
	name: string;
	email: string;
	is_admin?: boolean;
	active: boolean;
	phone: string;
}

export interface UserState {
	waiter?: IWaiter;
	isAdmin: boolean;
	isAuthenticated: boolean;
	loading: boolean;
	socket?: Socket;
}
export interface WaitersFilters {
	direcao?: OrderByType;
	ordem?: "nome";
	nome?: string;
	ativos?: boolean;
	is_admin?: boolean;
}

export interface CreateWaiterPayload {
	name: string;
	email: string;
	phone: string;
	password: string;
	is_admin?: boolean;
}