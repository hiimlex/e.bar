import { useDispatch } from "react-redux";
import { AppDispatch, getCurrentUser } from "../store";
import { AUTH_TOKEN_KEY } from "../api";
import { useEffect } from "react";

const UserProvider: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const getPersistedUser = () => {
		const token = localStorage.getItem(AUTH_TOKEN_KEY);

		if (token) {
			dispatch(getCurrentUser());
		}
	};

	useEffect(() => {
		getPersistedUser();
	}, []);

	return <></>;
};

export { UserProvider };
