import {
	ActionCreatorWithPayload,
	ActionCreatorWithoutPayload,
	SliceCaseReducers,
	SliceSelectors,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IWaiter, UserState } from "../../../@types";
import { AUTH_TOKEN_KEY, AuthService } from "../../../api";
import { GenericAction } from "../../Store";

const getCurrentUser = createAsyncThunk<
	IWaiter & {is_bar: boolean},
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

const UserSlice = createSlice<
	UserState,
	SliceCaseReducers<UserState>,
	"User",
	SliceSelectors<UserState>
>({
	name: "User",
	initialState: {
		isAdmin: false,
		isAuthenticated: false,
		loading: true,
	},
	reducers: {
		setUser: (state, action: GenericAction<IWaiter>) => {
			state.waiter = action.payload;
			state.isAuthenticated = true;
			state.loading = false;
		},
		setIsAdmin: (state, action: GenericAction<boolean>) => {
			state.isAdmin = action.payload;
		},
		setLoadingUser: (state, action: GenericAction<boolean>) => {
			state.loading = action.payload;
		},

		logout: (state) => {
			state.waiter = undefined;
			state.isAdmin = false;
			state.isAuthenticated;
			localStorage.removeItem(AUTH_TOKEN_KEY);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCurrentUser.fulfilled, (state, action) => {
			state.waiter = action.payload;
			state.isAdmin = action.payload.is_bar;
			state.isAuthenticated = true;
			state.loading = false;
		});

		builder.addCase(getCurrentUser.rejected, () => {
			localStorage.removeItem(AUTH_TOKEN_KEY);
		})
	},
});

export const UserActions = UserSlice.actions as {
	setUser: ActionCreatorWithPayload<IWaiter>;
	setLoadingUser: ActionCreatorWithPayload<boolean>;
	logout: ActionCreatorWithoutPayload;
	setIsAdmin: ActionCreatorWithPayload<boolean>;
};

const UserReducer = UserSlice.reducer;

export { UserReducer, UserSlice, getCurrentUser };
