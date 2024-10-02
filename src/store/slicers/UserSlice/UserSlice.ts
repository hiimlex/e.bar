import {
	ActionCreatorWithPayload,
	ActionCreatorWithoutPayload,
	SliceCaseReducers,
	SliceSelectors,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IMeResponse, IStore, IWaiter, UserState } from "../../../@types";
import { AUTH_TOKEN_KEY, AuthService } from "../../../api";
import { GenericAction } from "../../Store";

const thunkGetCurrentUser = createAsyncThunk<
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
		setWaiter: (state, action: GenericAction<IWaiter>) => {
			state.waiter = action.payload;
			state.isAuthenticated = true;
			state.loading = false;
		},
		setStore: (state, action: GenericAction<IStore>) => {
			state.store = action.payload;
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
		builder.addCase(thunkGetCurrentUser.fulfilled, (state, action) => {
			if (action.payload.is_store && action.payload.store) {
				state.store = action.payload.store;
			}
			if (!action.payload.is_store && action.payload.waiter) {
				state.waiter = action.payload.waiter;
			}

			state.isAdmin = action.payload.is_store;
			state.isAuthenticated = true;
			state.loading = false;
		});

		builder.addCase(thunkGetCurrentUser.rejected, (state) => {
			localStorage.removeItem(AUTH_TOKEN_KEY);
			state.isAuthenticated = false;
			state.loading = false;
		});
	},
});

export const UserActions = UserSlice.actions as {
	setUser: ActionCreatorWithPayload<IWaiter>;
	setStore: ActionCreatorWithPayload<IStore>;
	setLoadingUser: ActionCreatorWithPayload<boolean>;
	logout: ActionCreatorWithoutPayload;
	setIsAdmin: ActionCreatorWithPayload<boolean>;
};

const UserReducer = UserSlice.reducer;

export { UserReducer, UserSlice, thunkGetCurrentUser };
