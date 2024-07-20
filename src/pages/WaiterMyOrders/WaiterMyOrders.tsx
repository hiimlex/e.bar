import { useCallback, useEffect, useState } from "react";
import { FileMinus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OrdersFilter, Pages } from "../../@types";
import {
	Chip,
	MainContainer,
	OrderBy,
	OrderByType,
	Spinner,
} from "../../components";
import {
	AppDispatch,
	getMyOrders,
	RootState,
	WaiterActions,
} from "../../store";
import { SalesWaitersOrder } from "../Sales";
import { WaiterOrdersCard } from "../WaiterHome";
import "./styles.scss";

interface WaiterMyOrdersPageProps {}

const WaiterMyOrdersPage: React.FC<WaiterMyOrdersPageProps> = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const { orders, loading_orders, filters } = useSelector(
		(state: RootState) => state.waiter
	);
	const [showFilter, setShowFilter] = useState(false);
	const { waiter } = useSelector((state: RootState) => state.user);

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

	useEffect(() => {
		if (waiter) {
			dispatch(WaiterActions.setFilters({ waiter_id: waiter.id }));
		}
	}, [dispatch, waiter]);

	const onChangeSort = (
		sort_by?: OrdersFilter["sort_by"],
		sort_order?: OrderByType
	) => {
		if (sort_order === "") {
			sort_order = undefined;
			sort_by = undefined;
		}

		dispatch(WaiterActions.setFilters({ sort_order, sort_by }));
	};

	const onChangeStatusFilter = (status: OrdersFilter["status"] | undefined) => {
		dispatch(WaiterActions.setFilters({ status }));
	};

	const loadOrders = useCallback(
		async (loader = true) => {
			await dispatch(getMyOrders(loader));
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[filters]
	);

	const goToOrder = (order_id: number) => {
		navigate(Pages.WaiterOrder.replace(":orderId", order_id.toString()));
	};

	useEffect(() => {
		loadOrders();
	}, [loadOrders]);

	return (
		<MainContainer
			showGoBack
			onGoBack={goBack}
			showFilter
			onFilter={() => setShowFilter((curr) => !curr)}
		>
			<div className="w-orders">
				<main className="w-orders-content">
					<header className={`w-orders-header`}>
						<span className="page-title">
							Meus
							<br />
							Pedidos
						</span>
						{showFilter && (
							<>
								<div className="w-orders-filters">
									<Chip
										clickable
										active={filters?.status === undefined}
										theme="secondary"
										onClick={() => onChangeStatusFilter(undefined)}
									>
										Todos
									</Chip>
									<Chip
										clickable
										active={filters?.status === "finished"}
										theme="secondary"
										onClick={() => onChangeStatusFilter("finished")}
									>
										Finalizados
									</Chip>
								</div>
								<div className="w-orders-filters">
									<OrderBy
										label="Total"
										onOrderChange={(order) => onChangeSort("total", order)}
									/>
									<OrderBy
										label="N Mesa"
										onOrderChange={(order) => onChangeSort("table_id", order)}
									/>
									<OrderBy
										label="Criado Em"
										onOrderChange={(order) => onChangeSort("created_at", order)}
									/>
								</div>
							</>
						)}
					</header>

					{!loading_orders ? (
						<div className="w-orders-list no-scroll">
							{orders.map((order, index) => (
								<>
									{(order.status === "on_demand" ||
										order.status === "pending") && (
										<WaiterOrdersCard
											order={order}
											key={index}
											onClick={() => goToOrder(order.id)}
										/>
									)}
									{order.status === "finished" && (
										<SalesWaitersOrder order={order} key={index} />
									)}
								</>
							))}
							{orders.length === 0 && (
								<div className="empty-box">
									<FileMinus size={32} />
									<span>Nenhum pedido encontrado</span>
								</div>
							)}
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

export default WaiterMyOrdersPage;
