import { createBrowserRouter } from "react-router-dom";
import { Pages } from "../@types";
import {
	AttendancePage,
	LoginPage,
	OrdersPage,
	ProductsPage,
	SalesPage,
	WaiterHomePage,
	WaiterOrdersPage,
} from "../pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginPage />,
	},
	{
		path: Pages.Products,
		element: <ProductsPage />,
	},
	{
		path: Pages.Sales,
		element: <SalesPage />,
	},
	{
		path: Pages.Attendance,
		element: <AttendancePage />,
	},
	{
		path: Pages.Orders,
		element: <OrdersPage />,
	},
	{
		path: Pages.WaiterHome,
		element: <WaiterHomePage />,
	},
	{
		path: Pages.WaiterOrders,
		element: <WaiterOrdersPage />,
	}
]);

export default router;
