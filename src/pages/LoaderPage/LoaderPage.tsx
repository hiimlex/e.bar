import { Spinner } from "../../components";
import S from "./LoaderPage.styles";

const LoaderPage = () => {
	return (
		<S.LoadingApp className="loading-app">
			<Spinner theme="secondary" size={32} />
		</S.LoadingApp>
	);
};

export { LoaderPage };
