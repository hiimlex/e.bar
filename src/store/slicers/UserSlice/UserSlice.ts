import {
	ActionCreatorWithPayload,
	ActionCreatorWithoutPayload,
	SliceCaseReducers,
	SliceSelectors,
	createSlice,
} from "@reduxjs/toolkit";
import { IAttendance, IStore, IWaiter, UserState } from "../../../@types";
import { AUTH_TOKEN_KEY } from "../../../api";
import { GenericAction } from "../../Store";
import UserThunks from "./UserThunks";

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
		setAttendance: (state, action: GenericAction<IAttendance>) => {
			state.attendance = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(UserThunks.getCurrentUser.fulfilled, (state, action) => {
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

		builder.addCase(UserThunks.getCurrentUser.rejected, (state) => {
			localStorage.removeItem(AUTH_TOKEN_KEY);
			state.isAuthenticated = false;
			state.loading = false;
		});

		builder.addCase(
			UserThunks.validateWaiterAttendanceCode.fulfilled,
			(state, action) => {
				state.attendance = action.payload;
				state.loading = false;
				state.hasValidatedAttendance = true;
			}
		);

		builder.addCase(
			UserThunks.validateWaiterAttendanceCode.rejected,
			(state) => {
				state.attendance = undefined;
				state.loading = false;
				state.hasValidatedAttendance = true;
			}
		);
	},
});

export const UserActions = UserSlice.actions as {
	setWaiter: ActionCreatorWithPayload<IWaiter>;
	setStore: ActionCreatorWithPayload<IStore>;
	setLoadingUser: ActionCreatorWithPayload<boolean>;
	logout: ActionCreatorWithoutPayload;
	setIsAdmin: ActionCreatorWithPayload<boolean>;
	setAttendance: ActionCreatorWithPayload<IAttendance>;
};

const UserReducer = UserSlice.reducer;

export { UserReducer, UserSlice };
