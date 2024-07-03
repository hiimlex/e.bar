import { configureStore } from "@reduxjs/toolkit";
import { OrdersReducer, ProductsReducer } from "./slicers";

export const store = configureStore({
	reducer: {
		products: ProductsReducer,
		orders: OrdersReducer,
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
