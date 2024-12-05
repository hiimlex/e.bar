import { ArrowLeft, Filter, Menu, Search } from "react-feather";
import { useBreakpoint } from "../../hooks";
import { Brands } from "../Brands";
import "./styles.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { WaiterHeaderProps } from "../../@types";
import { ChipStatus } from "../ChipStatus";

const WaiterHeader: React.FC<WaiterHeaderProps> = ({
	onGoBack,
	onMenu,
	onSearch,
	showGoBack,
	showSearch,
	showMenu,
	showFilter,
	onFilter,
	showCode,
}) => {
	const { breakpoint } = useBreakpoint();
	const { attendance } = useSelector((state: RootState) => state.user);

	return (
		<div className="w-app-header-wrapper">
			{showCode && !!attendance && (
				<ChipStatus
					variant="outlined"
					colorScheme="success"
					className="text-center self-center"
				>
					#{attendance.code}
				</ChipStatus>
			)}
			<header className={`w-app-header w-app-header-${breakpoint}`}>
				<div className="flex-1 w-app-header-action">
					{showGoBack && (
						<button className="w-app-header-button" onClick={onGoBack}>
							<ArrowLeft size={28} strokeWidth={1.5} />
						</button>
					)}
				</div>
				<div className="w-app-header-brand">
					<Brands.EBarWaiterBrand />
				</div>
				<div className="flex-1 w-app-header-actions">
					{showSearch && (
						<button className="w-app-header-button" onClick={onSearch}>
							<Search size={24} strokeWidth={1.5} />
						</button>
					)}
					{showFilter && (
						<button className="w-app-header-button" onClick={onFilter}>
							<Filter size={24} strokeWidth={1.5} />
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
