import { SafeAny } from "./generic";
import { ProductCategory } from "./products";

export enum OrdersViewFilters {
	"Todos" = 0,
	"Pagos" = 1,
	"Entregues" = 2,
}

export const OrdersViewFiltersArray: { key: string; value: number | string }[] =
	[
		{ key: "Todos", value: OrdersViewFilters.Todos },
		{ key: "Pagos", value: OrdersViewFilters.Pagos },
		{ key: "Entregues", value: OrdersViewFilters.Entregues },
	];
export type OrdersViewType = keyof typeof OrdersViewFilters;

export interface CreateOrderPayload {
	table_id: number;
}

export interface OrdersFilter {
	view?: OrdersViewFilters;
	search?: string;
	tableNumber?: number;
	status?: OrderStatus;
	product_status?: OrderProductStatus;
	order_id?: number;
	waiter_id?: number;
	sort_by?: "table_id" | "total" | "created_at";
	sort_order?: "asc" | "desc";
}

export type OrderStatus = "pending" | "on_demand" | "finished";
export type OrderProductStatus = "ordered" | "delivered";
export type OrderPaymentMethod = "cash" | "card" | "pix";

export interface IOrder {
	id: number;
	table_id: number;
	waiter_id: number;
	waiter_name: string;
	status: OrderStatus;
	products: IGetOrderProduct[];
	created_at: string;
	updated_at: string;
	finished_at: string;
	payment_method: OrderPaymentMethod | null;
	total: number;
}

export interface IGetOrderProduct {
	category: ProductCategory;
	image_url: string;
	name: string;
	price: number;
	product_id: number;
	quantity: number;
	stock: number;
	status: "ordered" | "delivered";
}

export interface OrdersState {
	orders: SafeAny[];
	filters: OrdersFilter;
}

export interface OnOrderState {
	order?: IOrder;
}

export interface WaiterState {
	orders: IOrder[];
	filters?: OrdersFilter;
	loading_orders: boolean;
}

export const StatusToLabel: Record<OrderStatus, string> = {
	finished: "Finalizado",
	on_demand: "Em andamento",
	pending: "Pendente",
};