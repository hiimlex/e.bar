import { configureStore } from "@reduxjs/toolkit";
import {
	AttendanceReducer,
	AttendanceSlice,
	OrdersReducer,
	ProductsReducer,
	UserReducer,
} from "./slicers";

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

export interface GenericAction<T = any> {
	type: string;
	payload: T;
}
