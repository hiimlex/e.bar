import { ArrowLeft, Search } from "react-feather";
import { Brands } from "../Brands";
import "./styles.scss";

export interface WaiterHeaderProps {
	waiterHeaderGoBack?: boolean;
	waiterHeaderOnBack?: () => void;
	waiterHeaderSearch?: boolean;
	waiterHeaderOnSearch?: () => void;
}

const WaiterHeader: React.FC<WaiterHeaderProps> = ({
	waiterHeaderGoBack = false,
	waiterHeaderOnBack,
	waiterHeaderOnSearch,
	waiterHeaderSearch = false,
}) => {
	return (
		<header className={`w-app-header`}>
			<div className="flex-1 w-app-header-action">
				{waiterHeaderGoBack && (
					<button className="w-app-header-button" onClick={waiterHeaderOnBack}>
						<ArrowLeft size={26} strokeWidth={1.5} />
					</button>
				)}
			</div>
			<div className="w-app-header-brand">
				<Brands.SocialSipsBrand size={120} />
			</div>
			<div className="flex-1 w-app-header-action">
				{waiterHeaderSearch && (
					<button
						className="w-app-header-button"
						onClick={waiterHeaderOnSearch}
					>
						<Search size={22} strokeWidth={1.5} />
					</button>
				)}
			</div>
		</header>
	);
};

export { WaiterHeader };
