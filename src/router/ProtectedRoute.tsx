import { PropsWithChildren } from "react";
import { AUTH_TOKEN_KEY } from "../api";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spinner } from "../components";
import { LoaderPage } from "../pages";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated, loading } = useSelector(
		(state: RootState) => state.user
	);

	const token = localStorage.getItem(AUTH_TOKEN_KEY);

	if (!token && !isAuthenticated) {
		return <Navigate to="/" />;
	}

	if (loading) {
		return <LoaderPage />;
	}

	if (!loading && !isAuthenticated) {
		return <Navigate to="/" />;
	}

	return children;
};

export { ProtectedRoute };
