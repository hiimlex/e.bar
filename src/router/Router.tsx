import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import { Pages } from "../@types";
import {
	BarAttendancesPage,
	BarOnAttendanceGeneral,
	BarOnAttendancePage,
	LoginPage,
	StoreProductsPage,
	WaiterAddProductsPage,
	WaiterHomePage,
	WaiterMyOrdersPage,
	WaiterNewOrderPage,
	WaiterOrderPage,
	WaiterOrderProductsPage,
	WaiterProductsPage,
} from "../pages";
import { WaiterOrderServePage } from "../pages/WaiterOrderServe";
import { ProtectedRoute } from "./ProtectedRoute";

const ADMIN_ROUTES: RouteObject[] = [
	{
		path: Pages.StoreProducts,
		element: (
			<ProtectedRoute>
				<StoreProductsPage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.BarAttendances,
		element: (
			<ProtectedRoute>
				<BarAttendancesPage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.BarAttendanceView,
		element: (
			<ProtectedRoute>
				<BarOnAttendancePage />
			</ProtectedRoute>
		),
		children: [
			{
				path: Pages.BarAttendanceGeneral,
				element: <BarOnAttendanceGeneral />,
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
];

const router = createBrowserRouter([
	{
		path: "",
		element: <Navigate to={Pages.Login} />,
	},
	{
		path: Pages.Login,
		element: <LoginPage />,
	},
	...ADMIN_ROUTES,

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
		path: "*",
		element: <Navigate to="/" />,
	},
]);

export default router;
