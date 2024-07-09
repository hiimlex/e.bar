import { configureStore } from "@reduxjs/toolkit";
import { SafeAny } from "../@types";
import {
	OnOrderReducer,
	OrdersReducer,
	ProductsReducer,
	UserReducer,
	WaiterReducer,
} from "./slicers";

export const store = configureStore({
	reducer: {
		products: ProductsReducer,
		orders: OrdersReducer,
		onOrder: OnOrderReducer,
		user: UserReducer,
		waiter: WaiterReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export interface GenericAction<T = SafeAny> {
	type: string;
	payload: T;
}
