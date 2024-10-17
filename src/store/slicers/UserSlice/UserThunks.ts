import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IAttendance, IMeResponse } from "../../../@types";
import { AuthService } from "../../../api";
import { UserActions } from "./UserSlice";

const getCurrentUser = createAsyncThunk<
	IMeResponse,
	void,
	{ rejectValue: AxiosError }
>("User/getCurrentUser", async (_, { dispatch, rejectWithValue }) => {
	try {
		dispatch(UserActions.setLoadingUser(true));

		const response = await AuthService.getCurrentUser();
		return response.data;
	} catch (error) {
		return rejectWithValue(error as AxiosError);
	}
});

const validateWaiterAttendanceCode = createAsyncThunk<
	IAttendance,
	void,
	{ rejectValue: AxiosError }
>(
	"User/validateWaiterAttendanceCode",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			dispatch(UserActions.setLoadingUser(true));

			const response = await AuthService.validateWaiterAttendanceCode();
			return response.data;
		} catch (error) {
			return rejectWithValue(error as AxiosError);
		}
	}
);

export const UserThunks = {
	getCurrentUser,
	validateWaiterAttendanceCode,
};
