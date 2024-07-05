import {
	SliceCaseReducers,
	SliceSelectors,
	createSlice,
} from "@reduxjs/toolkit";
import { AttendanceState } from "../../../@types";

const AttendanceSlice = createSlice<
	AttendanceState,
	SliceCaseReducers<AttendanceState>,
	"OnOrder",
	SliceSelectors<AttendanceState>
>({
	name: "OnOrder",
	initialState: {},
	reducers: {},
});

const AttendanceActions = AttendanceSlice.actions as {
	// setFilters: ActionCreatorWithPayload<OrdersFilter>;
};

const AttendanceReducer = AttendanceSlice.reducer;

export { AttendanceActions, AttendanceReducer, AttendanceSlice };
