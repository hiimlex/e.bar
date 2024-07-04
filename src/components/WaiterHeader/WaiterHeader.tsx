import { Brands } from "../Brands";
import "./styles.scss";

interface WaiterHeaderProps {}

const WaiterHeader: React.FC<WaiterHeaderProps> = () => {
	return (
		<header className={`w-app-header`}>
			<div className="flex-1"></div>
			<div className="w-app-header-brand">
				<Brands.SocialSipsBrand size={120} />
			</div>
			<div className="flex-1"></div>
		</header>
	);
};

export { WaiterHeader };
