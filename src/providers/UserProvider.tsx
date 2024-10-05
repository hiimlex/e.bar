import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_TOKEN_KEY } from "../api";
import { AppDispatch, RootState, UserThunks } from "../store";

const UserProvider: React.FC = () => {
	const { isAuthenticated } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();

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
		if (isAuthenticated) {
			validateWaiterAttendanceCookie();
		}
	}, [isAuthenticated]);

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
