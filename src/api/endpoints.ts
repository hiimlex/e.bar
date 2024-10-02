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

	// New Endpoints

	// Auth
	AuthLogin = "/api/auth/login",
	AuthMe = "/api/auth/me",

	AuthSignup = "/api/auth/signup",
	AuthGetStore = "/api/auth/get-store",
	AuthGetWaiter = "/api/auth/get-waiter",
	AuthIsAuthenticated = "/api/auth/is-authenticated",

	// Store
	StoreCreate = "/api/stores",
	StoreUpdateAvatar = "/api/stores/avatar",
	StoreUpdateThumbnail = "/api/stores/thumbnail",
	StoreList = "/api/stores",
	StoreListById = "/api/stores/:id",
	StoreUpdate = "/api/stores/:id",
	StoreDelete = "/api/stores/:id",

	StoreListProducts = "/api/stores/products",
	StoreProfile = "/api/stores/profile",

	// Products
	ProductCreate = "/api/products",
	ProductList = "/api/products",
	ProductListById = "/api/products/:id",
	ProductUpdate = "/api/products/:id",
	ProductDelete = "/api/products/:id",

	// Categories
	CategoryCreate = "/api/categories",
	CategoryList = "/api/categories",
	CategoryListByStoreId = "/api/categories/:store_id",
	CategoryUpdate = "/api/categories/:id",
	CategoryDelete = "/api/categories/:id",

	// Waiters
	WaiterCreate = "/api/waiters",
	WaiterList = "/api/waiters",
	WaiterProfile = "/api/waiters/profile",
	WaiterUpdateProfile = "/api/waiters/profile/update",
	WaiterListById = "/api/waiters/:id",
	WaiterUpdate = "/api/waiters/:id",
	WaiterDelete = "/api/waiters/:id",

	// Orders
	OrderCreate = "/api/orders",
	OrderList = "/api/orders",
	OrderListById = "/api/orders/:id",
	OrderUpdate = "/api/orders/:id",
	OrderDelete = "/api/orders/:id",

	// Payments
	PaymentCreate = "/api/payments",
	PaymentList = "/api/payments",
	PaymentListById = "/api/payments/:id",
	PaymentUpdate = "/api/payments/:id",

	// Tables
	TableCreate = "/api/tables",
	TableList = "/api/tables",
	TableListById = "/api/tables/:id",
	TableUpdate = "/api/tables/:id",
	TableDelete = "/api/tables/:id",

	// Test
	TestUpload = "/api/test/upload",

	// Attendances
	AttendanceCreate = "/api/attendances",
	AttendanceList = "/api/attendances",
	AttendanceListById = "/api/attendances/:id",
	AttendanceUpdate = "/api/attendances/:id",
	AttendanceGetByCode = "/api/attendances/code/:code",
}
