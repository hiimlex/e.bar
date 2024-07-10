import { ArrowLeft, Menu, Search } from "react-feather";
import { useBreakpoint } from "../../hooks";
import { Brands } from "../Brands";
import "./styles.scss";

export interface WaiterHeaderProps {
	showGoBack?: boolean;
	onGoBack?: () => void;
	showSearch?: boolean;
	onSearch?: () => void;
	showMenu?: boolean;
	onMenu?: () => void;
}

const WaiterHeader: React.FC<WaiterHeaderProps> = ({
	onGoBack,
	onMenu,
	onSearch,
	showGoBack,
	showSearch,
	showMenu,
}) => {
	const { breakpoint } = useBreakpoint();

	return (
		<div className="w-app-header-wrapper">
			<header className={`w-app-header w-app-header-${breakpoint}`}>
				<div className="flex-1 w-app-header-action">
					{showGoBack && (
						<button className="w-app-header-button" onClick={onGoBack}>
							<ArrowLeft size={28} strokeWidth={1.5} />
						</button>
					)}
				</div>
				<div className="w-app-header-brand">
					<Brands.EBarBrand />
				</div>
				<div className="flex-1 w-app-header-action">
					{showSearch && (
						<button className="w-app-header-button" onClick={onSearch}>
							<Search size={24} strokeWidth={1.5} />
						</button>
					)}
					{showMenu && (
						<button className="w-app-header-button" onClick={onMenu}>
							<Menu size={24} strokeWidth={1.5} />
						</button>
					)}
				</div>
			</header>
		</div>
	);
};

export { WaiterHeader };
