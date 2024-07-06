import { Navigate, createBrowserRouter } from "react-router-dom";
import { Pages } from "../@types";
import {
	AttendancePage,
	LoginPage,
	OrdersPage,
	ProductsPage,
	SalesPage,
	WaiterAddProductsPage,
	WaiterHomePage,
	WaiterNewOrderPage,
	WaiterOrderPage,
	WaiterOrderProductsPage,
	WaiterOrdersPage,
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
		path: Pages.Products,
		element: (
			<ProtectedRoute>
				<ProductsPage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.Sales,
		element: (
			<ProtectedRoute>
				<SalesPage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.Attendance,
		element: (
			<ProtectedRoute>
				<AttendancePage />
			</ProtectedRoute>
		),
	},
	{
		path: Pages.Orders,
		element: (
			<ProtectedRoute>
				<OrdersPage />
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
		path: Pages.WaiterOrders,
		element: (
			<ProtectedRoute>
				<WaiterOrdersPage />
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
		path: "*",
		element: <Navigate to="/" />,
	},
]);

export default router;
