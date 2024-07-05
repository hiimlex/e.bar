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

export interface OrdersFilter {
	view?: OrdersViewFilters;
	search?: string;
	tableNumber?: number;
}

export interface OrdersState {
	orders: any[];
	filters: OrdersFilter;
}

export interface AttendanceState {
	order?: any;
}
