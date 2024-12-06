import { ReactElement } from "react";
import { Socket } from "socket.io-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafeAny = any;
export type NavLink = {
	to: string;
	label: string;
	icon?: ReactElement;
	isSvg?: boolean;
};

export interface SocketSliceState {
	socket?: Socket;
	connected: boolean;
}

export interface ISortFilter<T> {
	sort?: "asc" | "desc";
	sort_by?: T;
}

export type TOrderBy = "asc" | "desc" | "";

export enum TabEnum {
	General = "General",
	Sales = "Sales",
	Orders = "Orders",
}

export interface WaiterHeaderProps {
	showGoBack?: boolean;
	onGoBack?: () => void;
	showSearch?: boolean;
	onSearch?: () => void;
	showMenu?: boolean;
	onMenu?: () => void;
	showFilter?: boolean;
	onFilter?: () => void;
	showCode?: boolean;
}

export type TabItemType = {
	label: string;
	value: string;
};
