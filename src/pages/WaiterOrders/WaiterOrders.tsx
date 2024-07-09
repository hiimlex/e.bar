import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OrdersFilter, Pages } from "../../@types";
import { MainContainer, OrderBy, OrderByType, Spinner } from "../../components";
import {
	AppDispatch,
	getMyOrders,
	RootState,
	WaiterActions,
} from "../../store";
import { SalesWaitersOrder } from "../Sales";
import "./styles.scss";

interface WaiterOrdersPageProps {}

const WaiterOrdersPage: React.FC<WaiterOrdersPageProps> = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const { orders, loading_orders, filters } = useSelector(
		(state: RootState) => state.waiter
	);
	const { waiter } = useSelector((state: RootState) => state.user);

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

	useEffect(() => {
		if (waiter) {
			dispatch(WaiterActions.setFilters({ waiter_id: waiter.id }));
		}
	}, [dispatch, waiter]);

	const onChangeFilter = (
		sort_by?: OrdersFilter["sort_by"],
		sort_order?: OrderByType
	) => {
		if (sort_order === "") {
			sort_order = undefined;
			sort_by = undefined;
		}

		dispatch(WaiterActions.setFilters({ sort_order, sort_by }));
	};

	const loadOrders = useCallback(
		async (loader = true) => {
			await dispatch(getMyOrders(loader));
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[filters]
	);

	useEffect(() => {
		loadOrders();
	}, [loadOrders]);

	return (
		<MainContainer waiterHeaderGoBack waiterHeaderOnBack={goBack}>
			<div className="w-orders">
				<main className="w-orders-content">
					<header className={`w-orders-header`}>
						<span className="page-title">
							Meus
							<br />
							Pedidos
						</span>
						<div className="w-orders-filters">
							<OrderBy
								label="Total"
								onOrderChange={(order) => onChangeFilter("total", order)}
							/>
							<OrderBy
								label="N Mesa"
								onOrderChange={(order) => onChangeFilter("table_id", order)}
							/>
							<OrderBy
								label="Criado Em"
								onOrderChange={(order) => onChangeFilter("created_at", order)}
							/>
						</div>
					</header>

					{!loading_orders ? (
						<div className="w-orders-list no-scroll">
							{orders.map((order, index) => (
								<SalesWaitersOrder order={order} key={index} />
							))}
						</div>
					) : (
						<div className="w-orders-loading">
							<Spinner size={32} theme="primary" />
							<span className="w-orders-loading-message">
								Carregando pedidos...
							</span>
						</div>
					)}
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterOrdersPage;
