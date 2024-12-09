import { ArrowLeft, Filter, Menu, Search } from "react-feather";
import { useSelector } from "react-redux";
import { WaiterHeaderProps } from "../../@types";
import { useBreakpoint } from "../../hooks";
import { RootState } from "../../store";
import { Brands } from "../Brands";
import { ChipStatus } from "../ChipStatus";

import { Box } from "leux";
import S from "./WaiterHeader.styles";

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
		<S.Wrapper>
			{showCode && !!attendance && (
				<ChipStatus
					variant="outlined"
					colorScheme="success"
					className="text-center self-center"
				>
					#{attendance.code}
				</ChipStatus>
			)}
			<S.Header breakpoint={breakpoint}>
				<Box
					flex
					flexDirection="row"
					customClass="gap-3"
					alignItems="center"
					justifyContent="flex-start"
				>
					{showGoBack && (
						<button className="w-app-header-button" onClick={onGoBack}>
							<ArrowLeft size={28} strokeWidth={1.5} />
						</button>
					)}
				</Box>
				<S.Centered>
					<Brands.EBarWaiterBrand />
				</S.Centered>
				<Box
					flex
					flexDirection="row"
					customClass="gap-3"
					alignItems="center"
					justifyContent="flex-end"
				>
					{showSearch && (
						<button onClick={onSearch}>
							<Search size={24} strokeWidth={1.5} />
						</button>
					)}
					{showFilter && (
						<button onClick={onFilter}>
							<Filter size={24} strokeWidth={1.5} />
						</button>
					)}
					{showMenu && (
						<button onClick={onMenu}>
							<Menu size={24} strokeWidth={1.5} />
						</button>
					)}
				</Box>
			</S.Header>
		</S.Wrapper>
	);
};

export { WaiterHeader };
