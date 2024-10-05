import { ReactNode } from "react";
import { Socket } from "socket.io-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafeAny = any;
export type NavLink = { to: string; label: string; icon?: string | ReactNode };

export interface SocketSliceState {
	socket?: Socket;
	connected: boolean;
}

export interface ISortFilter<T> {
	sort?: "asc" | "desc";
	sort_by?: T;
}

export type TOrderBy = "asc" | "desc" | "";
