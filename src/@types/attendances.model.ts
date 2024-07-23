export type AttendanceStatusType = "on" | "off";

export interface IAttendance {
	id: number;
	bar_id: number;
	start_date: string;
	updated_at: string;
	end_date?: string;
	code: string;
	tables_count: number;
	status: AttendanceStatusType;
}

export interface GetAttendanceFilters {
	status?: AttendanceStatusType;
	sort_by?: "start_date" | "end_date";
	sort_order?: "asc" | "desc";
}

export interface StartAttendancePayload {
	code: string;
	finish_active_attendances: boolean;
	tables_count: number;
}
