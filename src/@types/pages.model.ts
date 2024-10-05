export enum Pages {
	Login = "/login",

	StoreProducts = "/store/products",
	StoreAttendances = "/store/attendances",
	StoreAttendanceView = '/store/attendance/:attendanceId',
	StoreAttendanceGeneral = "/store/attendance/:attendanceId/general",
	StoreAttendanceOrders = "/store/attendance/:attendanceId/orders",
	StoreAttendanceSales = "/store/attendance/:attendanceId/sales",
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
	WaiterCode = "/waiter/code",
}
