import { PropsWithChildren } from "react";
import { Header } from "../Header";
import "./styles.scss";
import { ScrollToTop } from "../ScrollToTop";
import { useBreakpoint } from "../../hooks";
import { WaiterHeader } from "../WaiterHeader";
interface MainContainerProps extends PropsWithChildren {
	showAdminHeader?: boolean;
}

const MainContainer: React.FC<MainContainerProps> = ({
	showAdminHeader,
	children,
}) => {
	const { breakpoint } = useBreakpoint();

	const isWaiter = true;

	return (
		<div className={`wrapper wrapper-${breakpoint}`}>
			{!isWaiter && (
				<>
					{showAdminHeader && <Header />}
					<main className={`wrapper-content wrapper-content-${breakpoint}`}>
						{children}
					</main>
					<ScrollToTop />
				</>
			)}
			{isWaiter && (
				<>
					{<WaiterHeader />}
					<main className={`wrapper-content wrapper-content-${breakpoint}`}>
						{children}
					</main>
				</>
			)}
		</div>
	);
};

export { MainContainer };
