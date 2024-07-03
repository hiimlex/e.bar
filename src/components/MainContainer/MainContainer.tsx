import { PropsWithChildren } from "react";
import { Header } from "../Header";
import "./styles.scss";
interface MainContainerProps extends PropsWithChildren {
	showAdminHeader?: boolean;
}

const MainContainer: React.FC<MainContainerProps> = ({
	showAdminHeader,
	children,
}) => {
	return (
		<div className="wrapper">
			{showAdminHeader && <Header />}
			<main className="wrapper-content">{children}</main>
		</div>
	);
};

export { MainContainer };
