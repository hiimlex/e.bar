import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AUTH_TOKEN_KEY } from "../api";
import { AppDispatch, thunkGetCurrentUser, SocketActions } from "../store";
import { socket } from "../socket/socket";

const UserProvider: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const getPersistedUser = () => {
		const token = localStorage.getItem(AUTH_TOKEN_KEY);

		if (token) {
			dispatch(thunkGetCurrentUser());
		}
	};

	useEffect(() => {
		getPersistedUser();
	}, []);

	useEffect(() => {
		socket.on("connect", () => {
			dispatch(SocketActions.setConnected(true));
			console.log("Connected to server");
		});

		socket.on("disconnect", () => {
			dispatch(SocketActions.setConnected(false));
			console.log("Disconnected to server");
		});

		// socket.connect();

		socket.on("login", (data) => {
			console.log(data);
		});
	}, []);

	return <></>;
};

export { UserProvider };
