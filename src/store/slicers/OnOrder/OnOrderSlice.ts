import {
	ActionCreatorWithPayload,
	SliceCaseReducers,
	SliceSelectors,
	createSlice,
} from "@reduxjs/toolkit";
import { IOrder, OnOrderState } from "../../../@types";
import { GenericAction } from "../../Store";

const OnOrderSlice = createSlice<
	OnOrderState,
	SliceCaseReducers<OnOrderState>,
	"OnOrder",
	SliceSelectors<OnOrderState>
>({
	name: "OnOrder",
	initialState: {
		order: undefined,
	},
	reducers: {
		setOrder: (state, action: GenericAction<IOrder>) => {
			state.order = action.payload;
		},
	},
});

const OnOrderActions = OnOrderSlice.actions as {
	setOrder: ActionCreatorWithPayload<IOrder>;
};

const OnOrderReducer = OnOrderSlice.reducer;

export { OnOrderActions, OnOrderReducer, OnOrderSlice };
