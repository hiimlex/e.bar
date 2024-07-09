import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { useBreakpoint } from "../../hooks";
import { RootState } from "../../store";
import { Header } from "../Header";
import { ScrollToTop } from "../ScrollToTop";
import { WaiterHeader, WaiterHeaderProps } from "../WaiterHeader";
import "./styles.scss";
import { BottomNav } from "../BottomNav/BottomNav";
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
