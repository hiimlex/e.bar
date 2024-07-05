import { createBrowserRouter } from "react-router-dom";
import { Pages } from "../@types";
import {
	AttendancePage,
	LoginPage,
	OrdersPage,
	ProductsPage,
	SalesPage,
	WaiterHomePage,
	WaiterNewOrderPage,
	WaiterOnOrderAddProductPage,
	WaiterOnOrderPage,
	WaiterOrdersPage,
	WaiterProductsPage,
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
	},
	{
		path: Pages.WaiterProducts,
		element: <WaiterProductsPage />,
	},
	{
		path: Pages.WaiterNewOrder,
		element: <WaiterNewOrderPage />,
	},
	{
		path: Pages.WaiterOnOrder,
		element: <WaiterOnOrderPage />,
	},
	{
		path: Pages.WaiterOnOrderAddProduct,
		element: <WaiterOnOrderAddProductPage />,
	},
]);

export default router;
