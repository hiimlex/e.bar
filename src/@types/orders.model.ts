import { SafeAny } from "./generic.model";
import { ProductCategory } from "./products.model";



export interface CreateOrderPayload {
	table_id: number;
	customers: number;
}

export interface OrdersFilter {
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
	customers: number;
	total: number;
}

export interface IGetOrderProduct {
	category: ProductCategory;
	image_url: string;
	name: string;
	price: number;
	product_id: number;
	quantity: number;
	delivered: number;
	stock: number;
	status: "ordered" | "delivered";
	order_product_id: number;
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

export const StatusToLabel: Record<OrderStatus, string> = {
	finished: "Finalizado",
	on_demand: "Em andamento",
	pending: "Pendente",
};
