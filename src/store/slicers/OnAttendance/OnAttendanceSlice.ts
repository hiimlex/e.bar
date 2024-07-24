import {
	ActionCreatorWithPayload,
	SliceCaseReducers,
	SliceSelectors,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { IAttendance, OnAttendanceState } from "../../../@types";
import { GenericAction, RootState } from "../../Store";
import { AxiosError } from "axios";
import { AttendancesService } from "../../../api";

export const fetchAttendance = createAsyncThunk<
	IAttendance,
	boolean | undefined,
	{ rejectValue: AxiosError }
>(
	"Products/fetchProducts",
	async (loading, { getState, rejectWithValue, dispatch }) => {
		try {
			// dispatch(OnAttendanceActions.setIsLoadingProducts(loading));
			const id = (getState() as RootState).onAttendance.attendanceId;

			if (!id) {
				throw new Error("Attendance ID not found");
			}

			const { data } = await AttendancesService.getById(id.toString());

			return data;
		} catch (error) {
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
		setAttendanceId: (state, action: GenericAction<number>) => {
			state.attendanceId = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchAttendance.fulfilled, (state, action) => {
			state.attendance = action.payload;
		});
	},
});

const OnAttendanceActions = OnAttendanceSlicer.actions as {
	setAttendance: ActionCreatorWithPayload<IAttendance>;
	setAttendanceId: ActionCreatorWithPayload<number>;
};

const OnAttendanceReducer = OnAttendanceSlicer.reducer;

export { OnAttendanceActions, OnAttendanceReducer, OnAttendanceSlicer };
