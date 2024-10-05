import { ISortFilter, SafeAny } from "./generic.model";
import { IProduct, ProductCategory } from "./products.model";
import { IStore } from "./store.model";
import { ITable } from "./tables.model";
import { IWaiter } from "./waiters.model";

export interface CreateOrderPayload {
	table_id: number;
	customers: number;
}

export interface OrdersFilter
	extends ISortFilter<"table_id" | "total" | "created_at"> {
	search?: string;
	table_number?: number;
	status?: TOrderStatusType;
	product_status?: TOrderProductStatusType;
	order_id?: number;
	waiter_id?: number;
}

export enum TOrderStatus {
	PENDING = "PENDING",
	DELIVERED = "DELIVERED",
	FINISHED = "FINISHED",
	CANCELED = "CANCELED",
}

export type TOrderStatusType = keyof typeof TOrderStatus;

export enum TOrderProductStatus {
	PENDING = "PENDING",
	DELIVERED = "DELIVERED",
}

export type TOrderProductStatusType = keyof typeof TOrderProductStatus;

export interface IOrderProduct {
	_id: string;
	product: string | IProduct;
	quantity: number;
	total: number;
	status: TOrderProductStatusType;
}

export interface IOrder {
	_id: string;
	table: string | ITable;
	store: string | IStore;
	requested_by: string | IWaiter;

	status: TOrderStatusType;
	items: IOrderProduct[];
	customers: number;
	total: number;
	number: number;

	created_at: string;
	updated_at: string;
	closed_at: string;
	// payment_method: OrderPaymentMethod | null;
}

export interface CreateOrderProductPayload {
	product_id: number;
	quantity: number;
	order_product_id?: number;
}

export interface ServeOrderProductPayload {
	order_product_id?: number;
}

export interface OrdersState {
	orders: SafeAny[];
	filters: OrdersFilter;
	is_loading_orders: boolean;
}

export interface OnOrderState {
	order?: IOrder;
}

export interface WaiterState {
	orders: IOrder[];
	filters?: OrdersFilter;
	loading_orders: boolean;
}
