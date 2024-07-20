export enum Pages {
	Login = "/login",

	BarProducts = "/bar/products",
	BarAttendances = "/bar/attendances",
	BarAttendanceGeneral = "/bar/attendance/:attendanceId/general",
	BarAttendanceOrders = "/bar/attendance/:attendanceId/orders",
	BarAttendanceSales = "/bar/attendance/:attendanceId/sales",
	BarSales = "/bar/sales",
	BarProfile = "/bar/profile",

	WaiterHome = "/waiter/home",
	WaiterMyOrders = "/waiter/my-orders",
	WaiterNewOrder = "/waiter/new-order",
	WaiterOrder = "/waiter/order/:orderId",
	WaiterOrderServe = "/waiter/order/:orderId/serve",
	WaiterAddProducts = "/waiter/order/:orderId/add-product",
	WaiterOrderProducts = "/waiter/order/:orderId/products",
	WaiterProducts =	"/waiter/products",
	WaiterReports = "/waiter/reports",
	WaiterSettings = "/waiter/settings",
	WaiterProfile = "/waiter/profile",
	WaiterIntro = "/waiter/intro",
}
