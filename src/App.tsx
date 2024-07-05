import { Provider as StoreProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./global.scss";
import { ModalProvider, UserProvider } from "./providers";
import router from "./router/Router";
import { store } from "./store";

function App() {
	return (
		<StoreProvider store={store}>
			<UserProvider />
			<ModalProvider>
				<RouterProvider router={router} />
			</ModalProvider>
		</StoreProvider>
	);
}

export default App;
