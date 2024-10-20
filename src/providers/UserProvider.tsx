import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pages } from "../@types";
import { AUTH_TOKEN_KEY } from "../api";
import { router } from "../router";
import { AppDispatch, RootState, UserThunks } from "../store";

const UserProvider: React.FC = () => {
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
			await dispatch(UserThunks.getCurrentUser());
		}
	}, []);

	const validateWaiterAttendanceCookie = async () => {
		await dispatch(UserThunks.validateWaiterAttendanceCode());
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
			console.log("Waiter is authenticated but has no attendance cookie");
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

	return <></>;
};

export { UserProvider };
