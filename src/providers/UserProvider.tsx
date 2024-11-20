import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pages, SafeAny } from "../@types";
import { AUTH_TOKEN_KEY } from "../api";
import { LoaderPage } from "../pages";
import { router } from "../router";
import { AppDispatch, RootState, UserThunks } from "../store";
import { useTranslation } from "react-i18next";
import { useToast } from "leux";

const UserProvider: React.FC = () => {
	const { t } = useTranslation();
	const ToastService = useToast();
	const {
		isAuthenticated,
		waiter,
		attendance,
		loading,
		hasValidatedAttendance,
	} = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = router.navigate;

	const getPersistedUser = useCallback(async () => {
		const token = localStorage.getItem(AUTH_TOKEN_KEY);

		if (token) {
			await dispatch(
				UserThunks.getCurrentUser({
					onError: (error) => {
						if (error.response) {
							const message = error.response.data as SafeAny;

							if (message && typeof message === "string") {
								const translateMessage = t(`Errors.${message}`);

								ToastService.createToast({
									label: translateMessage,
									colorScheme: "danger",
								});
							}
						}
					},
				})
			);
		}
	}, []);

	const validateWaiterAttendanceCookie = async () => {
		await dispatch(
			UserThunks.validateWaiterAttendanceCode({
				onError: (error) => {
					if (error.response) {
						const message = error.response.data as SafeAny;

						if (message && typeof message === "string") {
							const translateMessage = t(`Errors.${message}`);

							ToastService.createToast({
								label: translateMessage,
								colorScheme: "danger",
							});
						}
					}
				},
			})
		);
	};

	useEffect(() => {
		getPersistedUser();
	}, [getPersistedUser]);

	useEffect(() => {
		if (waiter && isAuthenticated) {
			validateWaiterAttendanceCookie();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [waiter, isAuthenticated]);

	useEffect(() => {
		if (
			isAuthenticated &&
			waiter &&
			!attendance &&
			!loading &&
			hasValidatedAttendance
		) {
			navigate(Pages.WaiterCode);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [attendance, hasValidatedAttendance]);

	useEffect(() => {
		// socket.on("connect", () => {
		// 	dispatch(SocketActions.setConnected(true));
		// 	console.log("Connected to server");
		// });
		// socket.on("disconnect", () => {
		// 	dispatch(SocketActions.setConnected(false));
		// 	console.log("Disconnected to server");
		// });
		// socket.connect();
		// socket.on("login", (data) => {
		// 	console.log(data);
		// });
	}, []);

	return loading ? <LoaderPage /> : null;
};

export { UserProvider };
