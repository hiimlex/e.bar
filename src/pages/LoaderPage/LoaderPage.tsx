import { Spinner } from "../../components";

const LoaderPage = () => {
	return (
		<div className="loading-app">
			<Spinner theme="secondary" size={32} />
		</div>
	);
};

export { LoaderPage };
