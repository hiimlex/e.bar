import { MainContainer, OrderBy } from "../../components";
import { SalesWaitersOrder } from "../Sales";
import "./styles.scss";

interface WaiterOrdersPageProps {}

const WaiterOrdersPage: React.FC<WaiterOrdersPageProps> = () => {
	return (
		<MainContainer>
			<div className="w-orders">
				<main className="w-orders-content">
					<header className={`w-orders-header`}>
						<span className="page-title">Minhas comandas</span>
						<div className="w-orders-filters">
							<OrderBy label="N Mesa" />
							<OrderBy label="Total" />
						</div>
					</header>

					<div className="w-orders-list">
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
