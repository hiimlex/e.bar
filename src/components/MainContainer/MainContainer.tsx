import { PropsWithChildren, useMemo } from "react";
import { Header } from "../Header";
import "./styles.scss";
import { ScrollToTop } from "../ScrollToTop";
import { useBreakpoint } from "../../hooks";
import { WaiterHeader, WaiterHeaderProps } from "../WaiterHeader";
import { BottomNav } from "../BottomNav/BottomNav";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
interface MainContainerProps extends PropsWithChildren, WaiterHeaderProps {
	showAdminHeader?: boolean;
	wrapperRef?: React.RefObject<HTMLDivElement>;
}

const MainContainer: React.FC<MainContainerProps> = ({
	showAdminHeader,
	children,
	wrapperRef,
	...waiterHeaderProps
}) => {
	const { breakpoint } = useBreakpoint();

	const { isAdmin, isAuthenticated } = useSelector(
		(state: RootState) => state.user
	);

	return (
		<div className={`wrapper wrapper-${breakpoint}`}>
			{isAdmin && isAuthenticated && (
				<>
					{showAdminHeader && <Header />}
					<main
						ref={wrapperRef}
						className={`wrapper-content wrapper-content-${breakpoint}`}
					>
						{children}
					</main>
				</>
			)}
			{!isAdmin && isAuthenticated && (
				<>
					<WaiterHeader {...waiterHeaderProps} />
					<main
						ref={wrapperRef}
						className={`wrapper-content wrapper-content-${breakpoint}`}
					>
						{children}
					</main>
					<BottomNav />
				</>
			)}
			<ScrollToTop />
		</div>
	);
};

export { MainContainer };
