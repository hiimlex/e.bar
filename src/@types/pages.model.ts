export enum Pages {
	Login = "/login",

	StoreProducts = "/store/products",
	StoreAttendances = "/store/attendances",
	StoreAttendanceView = "/store/attendance/:attendanceId",
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
	WaiterOrderPayment = "/waiter/order/:orderId/payment",
	WaiterProducts = "/waiter/products",
	WaiterTables = "/waiter/tables",
	WaiterReports = "/waiter/reports",
	WaiterSettings = "/waiter/settings",
	WaiterSettingsProfile = "/waiter/settings/profile",
	WaiterSettingsPassword = "/waiter/settings/password",
	WaiterSettingsAttendance = "/waiter/settings/attendance",
	WaiterCode = "/waiter/code",
	WaiterOrderResume = "/waiter/order/:orderId/resume",
}
