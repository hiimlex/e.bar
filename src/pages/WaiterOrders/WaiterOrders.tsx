import { useNavigate } from "react-router-dom";
import { MainContainer, OrderBy } from "../../components";
import { SalesWaitersOrder } from "../Sales";
import "./styles.scss";
import { Pages } from "../../@types";

interface WaiterOrdersPageProps {}

const WaiterOrdersPage: React.FC<WaiterOrdersPageProps> = () => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

	return (
		<MainContainer waiterHeaderGoBack waiterHeaderOnBack={goBack}>
			<div className="w-orders">
				<main className="w-orders-content">
					<header className={`w-orders-header`}>
						<span className="page-title">Minhas<br/>Comandas</span>
						<div className="w-orders-filters">
							<OrderBy label="N Mesa" />
							<OrderBy label="Total" />
						</div>
					</header>

					<div className="w-orders-list no-scroll">
						{Array.from({ length: 4 }).map((_, index) => (
							<SalesWaitersOrder id={index} key={index} />
						))}
					</div>
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterOrdersPage;
