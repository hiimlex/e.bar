/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum Endpoints {
	// Products
	GetProducts = "/products",
	GetProduct = "/products/:productId",
	CreateProduct = "/products",
	UpdateProduct = "/products/:productId",
	DeleteProduct = "/products/:productId",

	// Auth
	Login = "/auth/login",
	Me = "/auth/me",

	// Tables
	GetTables = "/tables",
	GetTable = "/tables/:id",
	CreateTable = "/tables",
	UpdateTable = "/tables/:tableId",
	DeleteTable = "/tables/:tableId",

	// Waiters
	GetWaiters = "/waiters",
	GetWaiter = "/waiters/:waiterId",
	CreateWaiter = "/waiters",
	UpdateWaiter = "/waiters/:waiterId",
	DeleteWaiter = "/waiters/:waiterId",

	// Orders
	GetOrders = "/orders",
	GetOrder = "/orders/:orderId",
	CreateOrder = "/orders",
	UpdateOrder = "/orders/:orderId",
	DeleteOrder = "/orders/:orderId",
	AddOrderProducts = "/order-products/:orderId/add",
	ServeOrderProducts = "/order-products/:orderId/deliver",

	//Attendances
	GetAttendances = "/attendances",
	GetAttendance = "/attendances/:attendanceId",
	CreateAttendance = "/attendances",
	UpdateAttendance = "/attendances/:attendanceId",
	DeleteAttendance = "/attendances/:attendanceId",

	// Socket
	SocketGetOrders = "/socket/orders",
}
