import { useCallback, useEffect } from "react";
import { FileMinus, RefreshCw } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { IListOrdersFilters, TOrderBy, TOrderStatusType } from "../../@types";
import { Endpoints, WaiterOrdersService } from "../../api";
import { Button, Chip, MainContainer, OrderBy } from "../../components";
import { socket } from "../../socket/socket";
import { AppDispatch, OrdersActions, RootState } from "../../store";
import { OrderCard } from "./components";
import "./styles.scss";

interface OrdersPageProps {}

const OrdersPage: React.FC<OrdersPageProps> = () => {
	const { orders, filters, is_loading_orders } = useSelector(
		(state: RootState) => state.orders
	);
	const dispatch = useDispatch<AppDispatch>();

	const loadOrders = useCallback(
		async (loading = true) => {
			dispatch(OrdersActions.setLoadingOrders(loading));

			try {
				const { data } = await WaiterOrdersService.fetchAll(filters);

				if (data) {
					dispatch(OrdersActions.setOrders(data.content));
				}

				dispatch(OrdersActions.setLoadingOrders(false));
			} catch (error) {
				console.log("Error loading orders", error);
				dispatch(OrdersActions.setLoadingOrders(false));
			}
		},
		[filters]
	);

	useEffect(() => {
		loadOrders();
	}, [loadOrders]);

	useEffect(() => {
		socket.on(Endpoints.SocketGetOrders, () => loadOrders(false));
	}, []);

	const onSelectView = (status: TOrderStatusType | undefined) => {
		dispatch(OrdersActions.setFilters({ status }));
	};

	const onOrderChange = (
		sort?: TOrderBy,
		sort_by?: IListOrdersFilters["sort_by"]
	) => {
		if (sort === "") {
			// sort = undefined;
			// sort_by = undefined;
		}

		// dispatch(OrdersActions.setFilters({ sort_by, sort_order }));
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
						<Chip
							active={filters.status === undefined}
							clickable
							theme="secondary"
							onClick={() => onSelectView(undefined)}
						>
							Todos
						</Chip>
						<Chip
							// active={filters.status === "finished"}
							clickable
							theme="secondary"
							onClick={() => onSelectView("FINISHED")}
						>
							Finalizados
						</Chip>
					</div>
					<div className="orders-actions">
						<OrderBy
							label="Total"
							onOrderChange={(sort) => onOrderChange(sort, "total")}
						/>
						{/* <OrderBy
							label="N° Mesa"
							onOrderChange={(sort) =>
								onOrderChange(sort, '')
							}
						/> */}
						{/* <OrderBy
							label="Criado em"
							onOrderChange={(sort_order) =>
								onOrderChange("created_at", sort_order)
							}
						/> */}
						<Button theme="secondary" onClick={loadOrders}>
							<RefreshCw size={18} /> Atualizar
						</Button>
					</div>
				</div>

				{!is_loading_orders && orders.length === 0 && (
					<div className="empty-box">
						<FileMinus size={32} />
						<span>Nenhum pedido encontrado...</span>
					</div>
				)}

				<div className="orders-grid">
					{!is_loading_orders &&
						orders.map((order, index) => (
							<OrderCard key={index} order={order} />
						))}
				</div>
			</div>
		</MainContainer>
	);
};

export { OrdersPage };
