import { configureStore } from "@reduxjs/toolkit";
import {
	AttendanceReducer,
	OrdersReducer,
	ProductsReducer,
	UserReducer,
} from "./slicers";
import { SafeAny } from "../@types";

export const store = configureStore({
	reducer: {
		products: ProductsReducer,
		orders: OrdersReducer,
		attendance: AttendanceReducer,
		user: UserReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export interface GenericAction<T = SafeAny> {
	type: string;
	payload: T;
}
