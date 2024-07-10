import {
	ActionCreatorWithPayload,
	SliceCaseReducers,
	SliceSelectors,
	createSlice,
} from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { SafeAny, SocketSliceState } from "../../../@types";
import { GenericAction } from "../../Store";

const SocketSlice = createSlice<
	SocketSliceState,
	SliceCaseReducers<SocketSliceState>,
	"Socket",
	SliceSelectors<SocketSliceState>
>({
	name: "Socket",
	initialState: {
		connected: false,
		socket: undefined,
	},
	reducers: {
		setConnected: (state, action: GenericAction<boolean>) => {
			state.connected = action.payload;
		},
		setSocket: (state, action: GenericAction<Socket>) => {
			state.socket = action.payload as SafeAny;
		},
	},
});

const SocketActions = SocketSlice.actions as {
	setConnected: ActionCreatorWithPayload<boolean>;
	setSocket: ActionCreatorWithPayload<Socket<SafeAny>>;
};

const SocketReducer = SocketSlice.reducer;

export { SocketActions, SocketReducer, SocketSlice };
