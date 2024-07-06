export enum Pages {
	Login = "/login",
	Products = "/admin/products",
	Attendance = "/admin/attendance",
	Orders = "/admin/orders",
	Sales = "/admin/sales",

	WaiterHome = "/waiter",
	WaiterOrders = "/waiter/orders",
	WaiterNewOrder = "/waiter/new-order",
	WaiterOrder = "/waiter/order/:orderId",
	WaiterAddProducts = "/waiter/order/:orderId/add-product",
	WaiterOrderProducts = "/waiter/order/:orderId/products",
	WaiterProducts =	"/waiter/products",
	WaiterReports = "/waiter/reports",
	WaiterSettings = "/waiter/settings",
	WaiterProfile = "/waiter/profile",
	WaiterIntro = "/waiter/intro",
}
