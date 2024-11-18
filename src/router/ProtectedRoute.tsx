import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pages } from "../@types";
import { AUTH_TOKEN_KEY } from "../api";
import { RootState } from "../store";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated } = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();

	const token = localStorage.getItem(AUTH_TOKEN_KEY);

	useEffect(() => {
		if (!token && !isAuthenticated) {
			navigate(Pages.Login);
		}
	}, [isAuthenticated]);

	return children;
};

export { ProtectedRoute };
