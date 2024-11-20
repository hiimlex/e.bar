import { ToastProvider } from "leux";
import { Provider as StoreProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./global.scss";
import "./i18n/index";
import { ModalProvider, UserProvider } from "./providers";
import { router } from "./router/Router";
import { store } from "./store";

function App() {
	return (
		<StoreProvider store={store}>
			<UserProvider />
			<ToastProvider duration={3000}>
				<ModalProvider>
					<RouterProvider router={router} />
				</ModalProvider>
			</ToastProvider>
		</StoreProvider>
	);
}

export default App;
