import { useNavigate } from "react-router-dom";
import { MainContainer, OrderBy } from "../../components";
import { SalesWaitersOrder } from "../Sales";
import "./styles.scss";
import { Pages } from "../../@types";

interface WaiterProductsPageProps {}

const WaiterProductsPage: React.FC<WaiterProductsPageProps> = () => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

	return (
		<MainContainer waiterHeaderGoBack waiterHeaderOnBack={goBack}>
			<div className="w-products">
				<main className="w-products-content">
					<header className={`w-products-header`}>
						<span className="page-title">Minhas comandas</span>
						<div className="w-products-filters">
							<OrderBy label="N Mesa" />
							<OrderBy label="Total" />
						</div>
					</header>

					<div className="w-products-list">
						{Array.from({ length: 4 }).map((_, index) => (
							<SalesWaitersOrder id={index} key={index} />
						))}
					</div>
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterProductsPage;
