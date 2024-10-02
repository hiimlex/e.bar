import { IStore } from "./store.model";
import { IWaiter } from "./waiters.model";

export interface LoginPayload {
	email: string;
	password: string;
}
export interface IMeResponse {
	is_store: boolean;
	waiter?: IWaiter;
	store?: IStore;
}