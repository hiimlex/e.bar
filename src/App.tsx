import { ToastProvider } from "leux";
import { Provider as StoreProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./styles/global.scss";
import "./i18n/index";
import { ModalProvider, UserProvider } from "./providers";
import { router } from "./router/Router";
import { store } from "./store";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/globalStyles";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<StoreProvider store={store}>
				<UserProvider />
				<ToastProvider duration={3000}>
					<ModalProvider>
						<RouterProvider router={router} />
					</ModalProvider>
				</ToastProvider>
			</StoreProvider>
		</ThemeProvider>
	);
}

export default App;
