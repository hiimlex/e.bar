/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum Endpoints {
	GetProducts = "/products",
	GetProduct = "/products/:productId",
	CreateProduct = "/products",
	UpdateProduct = "/products/:productId",
	DeleteProduct = "/products/:productId",

	Login = "/login",
	Me = "/me",

	GetTables = "/tables",
	GetTable = "/tables/:id",
	CreateTable = "/tables",
	UpdateTable = "/tables/:tableId",
	DeleteTable = "/tables/:tableId",

	GetWaiters = "/waiters",
	GetWaiter = "/waiters/:waiterId",
	CreateWaiter = "/waiters",
	UpdateWaiter = "/waiters/:waiterId",
	DeleteWaiter = "/waiters/:waiterId",

	GetOrders = "/orders",
	GetOrder = "/orders/:orderId",
	CreateOrder = "/orders",
	UpdateOrder = "/orders/:orderId",
	DeleteOrder = "/orders/:orderId",
	UpdateOrderProducts = "/orders/:orderId/products",
}
