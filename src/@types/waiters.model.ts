import { Socket } from "socket.io-client";
import { ISortFilter } from "./generic.model";
import { IPicture } from "./products.model";
import { IStore } from "./store.model";
import { IAttendance } from "./attendances.model";

export interface IWaiter {
	_id: string;
	name: string;
	phone: number;
	email: string;
	store: string | IStore;
	enabled: boolean;
	avatar: IPicture;
}

export interface UserState {
	waiter?: IWaiter;
	store?: IStore;
	isAdmin: boolean;
	isAuthenticated: boolean;
	loading: boolean;
	socket?: Socket;
	attendance?: IAttendance;
	hasValidatedAttendance?: boolean;
}

export interface WaitersFilters extends ISortFilter<"name"> {
	name?: string;
	is_enabled?: boolean;
}

export interface CreateWaiterPayload {
	name: string;
	email: string;
	phone: string;
	password: string;
}

export interface UpdateWaiterPayload {
	name?: string;
	email?: string;
	phone?: string;
	enabled?: boolean;
}

export type UpdateWaiterProfilePayload = Omit<UpdateWaiterPayload, "enabled">;

export interface UpdateWaiterPassword {
	newPassword: string;
	oldPassword: string;
}