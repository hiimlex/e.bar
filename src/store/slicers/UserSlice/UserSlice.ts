import {
	ActionCreatorWithPayload,
	SliceCaseReducers,
	SliceSelectors,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { IWaiter, OrdersFilter, UserState } from "../../../@types";
import { GenericAction } from "../../Store";
import { AuthService } from "../../../api";
import { AxiosError } from "axios";

const getCurrentUser = createAsyncThunk<
	IWaiter,
	void,
	{ rejectValue: AxiosError }
>("User/getCurrentUser", async (_, { rejectWithValue }) => {
	try {
		const response = await AuthService.getCurrentUser();
		return response.data;
	} catch (error) {
		return rejectWithValue(error as AxiosError);
	}
});

const UserSlice = createSlice<
	UserState,
	SliceCaseReducers<UserState>,
	"Orders",
	SliceSelectors<UserState>
>({
	name: "Orders",
	initialState: {
		isAdmin: false,
		isAuthenticated: false,
	},
	reducers: {
		setUser: (state, action: GenericAction<IWaiter>) => {
			state.waiter = action.payload;
			state.isAdmin = action.payload.is_admin;
			state.isAuthenticated = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCurrentUser.fulfilled, (state, action) => {
			state.waiter = action.payload;
			state.isAdmin = action.payload.is_admin;
			state.isAuthenticated = true;
		});
	},
});

export const UserActions = UserSlice.actions as {
	setUser: ActionCreatorWithPayload<IWaiter>;
};

const UserReducer = UserSlice.reducer;

export { UserReducer, UserSlice, getCurrentUser };
