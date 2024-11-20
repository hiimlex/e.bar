import {
	ActionCreatorWithPayload,
	SliceCaseReducers,
	SliceSelectors,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { IAttendance, OnAttendanceState, ThunkOnError } from "../../../@types";
import { GenericAction, RootState } from "../../Store";
import { AxiosError } from "axios";
import { AttendancesService } from "../../../api";

export const onAttendancefetchAttendance = createAsyncThunk<
	IAttendance,
	ThunkOnError | undefined,
	{ rejectValue: AxiosError }
>(
	"OnAttendance/fetchAttendance",
	async (payload, { getState, rejectWithValue, dispatch }) => {
		try {
			const id = (getState() as RootState).onAttendance.attendanceId;

			if (!id) {
				throw new Error("Attendance ID not found");
			}

			const { data } = await AttendancesService.getById(id.toString());

			return data;
		} catch (error) {
			const { onError } = payload || {};
			if (onError) {
				onError(error as AxiosError);
			}
			return rejectWithValue(error as AxiosError);
		}
	}
);

const OnAttendanceSlicer = createSlice<
	OnAttendanceState,
	SliceCaseReducers<OnAttendanceState>,
	"OnAttendance",
	SliceSelectors<OnAttendanceState>
>({
	name: "OnAttendance",
	initialState: {
		attendance: null,
		attendanceId: null,
	},
	reducers: {
		setAttendance: (state, action: GenericAction<IAttendance>) => {
			state.attendance = action.payload;
		},
		setAttendanceId: (state, action: GenericAction<string>) => {
			state.attendanceId = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(onAttendancefetchAttendance.fulfilled, (state, action) => {
			state.attendance = action.payload;
		});
	},
});

const OnAttendanceActions = OnAttendanceSlicer.actions as {
	setAttendance: ActionCreatorWithPayload<IAttendance>;
	setAttendanceId: ActionCreatorWithPayload<string>;
};

const OnAttendanceReducer = OnAttendanceSlicer.reducer;

export { OnAttendanceActions, OnAttendanceReducer, OnAttendanceSlicer };
