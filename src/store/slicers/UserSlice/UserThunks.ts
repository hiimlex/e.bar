import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IAttendance, IMeResponse, ThunkOnError } from "../../../@types";
import { AuthService } from "../../../api";
import { UserActions } from "./UserSlice";

const getCurrentUser = createAsyncThunk<
	IMeResponse,
	ThunkOnError | undefined,
	{ rejectValue: AxiosError }
>("User/getCurrentUser", async (payload, { dispatch, rejectWithValue }) => {
	try {
		dispatch(UserActions.setLoadingUser(true));

		const response = await AuthService.getCurrentUser();
		return response.data;
	} catch (error) {
		const { onError } = payload || {};
		if (onError) {
			onError(error as AxiosError);
		}
		return rejectWithValue(error as AxiosError);
	}
});

const validateWaiterAttendanceCode = createAsyncThunk<
	IAttendance,
	ThunkOnError | undefined,
	{ rejectValue: AxiosError }
>(
	"User/validateWaiterAttendanceCode",
	async (payload, { dispatch, rejectWithValue }) => {
		try {
			dispatch(UserActions.setLoadingUser(true));

			const response = await AuthService.validateWaiterAttendanceCode();
			return response.data;
		} catch (error) {
			const { onError } = payload || {};
			if (onError) {
				onError(error as AxiosError);
			}
			return rejectWithValue(error as AxiosError);
		}
	}
);

export const UserThunks = {
	getCurrentUser,
	validateWaiterAttendanceCode,
};
