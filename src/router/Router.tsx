import { Navigate, createBrowserRouter } from "react-router-dom";
import { Pages } from "../@types";
import {
	LoginPage,
	StoreAttendanceGeneral,
	StoreAttendanceView,
	StoreAttendancesPage,
	StoreProductsPage,
	WaiterAddProductsPage,
	WaiterCodePage,
	WaiterHomePage,
	WaiterMyOrdersPage,
	WaiterNewOrderPage,
	WaiterOrderPage,
	WaiterOrderPaymentPage,
	WaiterOrderProductsPage,
	WaiterOrderServePage,
	WaiterProductsPage,
} from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";

const router = createBrowserRouter([
	{
		path: "",
		element: <Navigate to={Pages.Login} />,
	},
	{
		path: Pages.Login,
		element: <LoginPage />,
	},
	{
		path: Pages.StoreProducts,
		element: (
			<ProtectedRoute>
				<StoreProductsPage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.StoreAttendances,
		element: (
			<ProtectedRoute>
				<StoreAttendancesPage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.StoreAttendanceView,
		element: (
			<ProtectedRoute>
				<StoreAttendanceView />
			</ProtectedRoute>
		),
		children: [
			{
				path: Pages.StoreAttendanceGeneral,
				element: <StoreAttendanceGeneral />,
			},
			{
				path: "*",
				element: <Navigate to={Pages.StoreAttendances} />,
			},
		],
	},

	// {
	// 	path: Pages.Sales,
	// 	element: (
	// 		<ProtectedRoute>
	// 			<SalesPage />
	// 		</ProtectedRoute>
	// 	),
	// },
	// {
	// 	path: Pages.Attendance,
	// 	element: (
	// 		<ProtectedRoute>
	// 			<AttendancePage />
	// 		</ProtectedRoute>
	// 	),
	// },
	// {
	// 	path: Pages.Orders,
	// 	element: (
	// 		<ProtectedRoute>
	// 			<OrdersPage />
	// 		</ProtectedRoute>
	// 	),
	// },
	{
		path: Pages.WaiterCode,
		element: (
			<ProtectedRoute>
				<WaiterCodePage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.WaiterHome,
		element: (
			<ProtectedRoute>
				<WaiterHomePage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.WaiterMyOrders,
		element: (
			<ProtectedRoute>
				<WaiterMyOrdersPage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.WaiterProducts,
		element: (
			<ProtectedRoute>
				<WaiterProductsPage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.WaiterNewOrder,
		element: (
			<ProtectedRoute>
				<WaiterNewOrderPage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.WaiterOrder,
		element: (
			<ProtectedRoute>
				<WaiterOrderPage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.WaiterOrderProducts,
		element: (
			<ProtectedRoute>
				<WaiterOrderProductsPage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.WaiterAddProducts,
		element: (
			<ProtectedRoute>
				<WaiterAddProductsPage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.WaiterOrderServe,
		element: (
			<ProtectedRoute>
				<WaiterOrderServePage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.WaiterOrderPayment,
		element: (
			<ProtectedRoute>
				<WaiterOrderPaymentPage />
			</ProtectedRoute>
		),
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
]);

export { router };
