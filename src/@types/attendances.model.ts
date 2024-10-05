import { ISortFilter } from "./generic.model";
import { IStore } from "./store.model";
import { IWaiter } from "./waiters.model";

export enum TAttendanceStatus {
	OPEN = "OPEN",
	CANCELLED = "CANCELLED",
	CLOSED = "CLOSED",
}

export interface IAttendance {
	_id: string;
	store: string | IStore;

	started_at: string;
	closed_at?: string;
	created_at: string;
	updated_at: string;

	code: string;
	is_active: boolean;
	tables_count: number;
	status: TAttendanceStatus;
	working_at: string[] | IWaiter[];
}

export interface GetAttendanceFilters
	extends ISortFilter<"created_at" | "started_at"> {
	status?: TAttendanceStatus;
}

export interface ICreateAttendancePayload {
	code?: string;
	finish_active_attendances?: boolean;
	tables_count: number;
}

export interface OnAttendanceState {
	attendance: IAttendance | null;
	attendanceId: string | null;
}

export type TStoreAttendanceGeneralView = 'tables' | 'waiters'