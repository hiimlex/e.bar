import { PropsWithChildren, useState } from "react";
import { useSelector } from "react-redux";
import { useBreakpoint } from "../../hooks";
import { RootState } from "../../store";
import { Header } from "../Header";
import { ScrollToTop } from "../ScrollToTop";
import { Sidebar } from "../Sidebar";
import { WaiterHeader, WaiterHeaderProps } from "../WaiterHeader";
import "./styles.scss";
interface MainContainerProps extends PropsWithChildren, WaiterHeaderProps {
	showAdminHeader?: boolean;
	wrapperRef?: React.RefObject<HTMLDivElement>;
}

const MainContainer: React.FC<MainContainerProps> = ({
	showAdminHeader,
	children,
	wrapperRef,
	showMenu = true,
	...waiterHeaderProps
}) => {
	const { breakpoint } = useBreakpoint();

	const { isAdmin, isAuthenticated } = useSelector(
		(state: RootState) => state.user
	);
	const [showSidebar, setShowSidebar] = useState(false);

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
					<WaiterHeader
						showMenu={showMenu}
						{...waiterHeaderProps}
						onMenu={() => setShowSidebar((curr) => !curr)}
					/>
					<main
						ref={wrapperRef}
						className={`wrapper-content wrapper-content-${breakpoint}`}
					>
						{children}
					</main>
					<Sidebar
						show={showSidebar}
						onClose={() => setShowSidebar(false)}
					/>
				</>
			)}
			<ScrollToTop />
		</div>
	);
};

export { MainContainer };
