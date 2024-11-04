import { ISortFilter, SafeAny } from "./generic.model";
import { IPaginationFilters } from "./pagination.model";
import { IProduct } from "./products.model";
import { IStore } from "./store.model";
import { ITable } from "./tables.model";
import { IWaiter } from "./waiters.model";

export interface CreateOrderPayload {
	table_id: number;
	customers: number;
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
	product_id: string;
	quantity: number;
}

export interface UpdateOrderProductPayload {
	order_product_id: string;
	quantity?: number;
	status?: TOrderProductStatusType;
}

export interface ServeOrderProductPayload {
	order_product_id?: string;
}

export interface OrdersState {
	orders: SafeAny[];
	filters: IListOrdersFilters;
	is_loading_orders: boolean;
}

export interface OnOrderState {
	order?: IOrder;
}

export interface WaiterState {
	orders: IOrder[];
	filters?: IListOrdersFilters;
	loadingOrders: boolean;
}

export interface IListOrdersFilters
	extends ISortFilter<"number" | "table_number" | "total" | "created_at">,
		IPaginationFilters {
	status?: keyof typeof TOrderStatus;
	order_product_status?: keyof typeof TOrderProductStatus;
}
