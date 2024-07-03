import { useDispatch, useSelector } from "react-redux";
import { OrdersViewFiltersArray } from "../../@types";
import { Button, Chip, MainContainer, OrderBy } from "../../components";
import { AppDispatch, OrdersActions, RootState } from "../../store";
import "./styles.scss";
import { OrderCard } from "./components";
import { RefreshCw } from "react-feather";

interface OrdersPageProps {}

const OrdersPage: React.FC<OrdersPageProps> = () => {
	const { filters } = useSelector((state: RootState) => state.orders);
	const dispatch = useDispatch<AppDispatch>();

	const onSelectView = (view: number) => {
		dispatch(OrdersActions.setFilters({ view }));
	};

	return (
		<MainContainer showAdminHeader>
			<div className="orders">
				<header className="orders-header">
					<h2 className="page-title">
						Pedidos em
						<br />
						Andamento
					</h2>
				</header>

				<div className="orders-filters">
					<div className="chips">
						{OrdersViewFiltersArray.map((view, index) => (
							<Chip
								key={index}
								active={+view.value === filters.view}
								clickable
								theme="secondary"
								onClick={() => onSelectView(+view.value)}
							>
								{view.key}
							</Chip>
						))}
					</div>
					<div className="orders-actions">
						<OrderBy label="N° Mesa" />
						<Button theme="secondary">
							<RefreshCw size={18} /> ATUALIZAR
						</Button>
					</div>
				</div>

				<div className="orders-grid">
					{Array.from({ length: 10 }).map((_, index) => (
						<OrderCard key={index} />
					))}
				</div>
			</div>
		</MainContainer>
	);
};

export default OrdersPage;
