import { useCallback, useEffect, useState } from "react";
import { FileMinus } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IListOrdersFilters, Pages, SafeAny, TOrderBy } from "../../@types";
import { Chip, MainContainer, OrderBy, Spinner } from "../../components";
import {
	AppDispatch,
	RootState,
	WaiterActions,
	WaiterThunks,
} from "../../store";
import { SalesWaitersOrder } from "../Sales";
import { WaiterOrdersCard } from "../WaiterHome";
import "./styles.scss";
import { useToast } from "leux";

interface WaiterMyOrdersPageProps {}

const WaiterMyOrdersPage: React.FC<WaiterMyOrdersPageProps> = () => {
	const { t } = useTranslation();
	const ToastService = useToast();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const {
		orders,
		loadingOrders,
		filters: orderFilters,
	} = useSelector((state: RootState) => state.waiter);
	const [showFilter, setShowFilter] = useState(false);

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

	const onChangeSort = (
		sort?: TOrderBy,
		sort_by?: IListOrdersFilters["sort_by"]
	) => {
		if (sort === "") {
			sort = undefined;
			sort_by = undefined;
		}

		dispatch(WaiterActions.setOrderFilters({ sort, sort_by }));
	};

	const onChangeStatusFilter = (
		status: IListOrdersFilters["status"] | undefined
	) => {
		dispatch(WaiterActions.setOrderFilters({ status }));
	};

	const loadOrders = useCallback(
		async (loader = true) => {
			await dispatch(
				WaiterThunks.getMyOrders({
					loading: loader,
					onError: (error) => {
						if (error.response) {
							const message = error.response.data as SafeAny;

							if (message && typeof message === "string") {
								const translateMessage = t(`Errors.${message}`);

								ToastService.createToast({
									label: translateMessage,
									colorScheme: "danger",
								});
							}
						}
					},
				})
			);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[orderFilters]
	);

	const goToOrder = (order_id: string) => {
		navigate(Pages.WaiterOrder.replace(":orderId", order_id.toString()));
	};

	useEffect(() => {
		dispatch(WaiterActions.setOrderFilters({ status: undefined }));
	}, []);

	useEffect(() => {
		if (!loadingOrders) {
			loadOrders();
		}
	}, [loadOrders]);

	return (
		<MainContainer showGoBack onGoBack={goBack}>
			<div className="w-orders">
				<main className="w-orders-content">
					<header className={`w-orders-header`}>
						<span
							className="page-title"
							dangerouslySetInnerHTML={{ __html: t("WaiterMyOrders.Title") }}
						></span>

						<div className="w-orders-filters">
							<Chip
								clickable
								active={orderFilters?.status === undefined}
								theme="secondary"
								onClick={() => onChangeStatusFilter(undefined)}
							>
								{t("WaiterHome.Filters.All")}
							</Chip>
							<Chip
								clickable
								active={orderFilters?.status === "FINISHED"}
								theme="secondary"
								onClick={() => onChangeStatusFilter("FINISHED")}
							>
								{t("WaiterMyOrders.Filters.Finished")}
							</Chip>
						</div>
						<div className="w-orders-filters">
							<OrderBy
								label="Total"
								onOrderChange={(sort) => onChangeSort(sort, "total")}
								reset={
									!orderFilters?.sort_by || orderFilters.sort_by !== "total"
								}
							/>

							<OrderBy
								label="Criado Em"
								onOrderChange={(sort) => onChangeSort(sort, "created_at")}
								reset={
									!orderFilters?.sort_by ||
									orderFilters.sort_by !== "created_at"
								}
							/>
						</div>
					</header>

					{!loadingOrders ? (
						<div className="w-orders-list no-scroll">
							{orders.map((order, index) => (
								<div key={index}>
									{order.status === "PENDING" && (
										<WaiterOrdersCard
											order={order}
											key={index}
											onClick={() => goToOrder(order._id)}
										/>
									)}
									{order.status === "FINISHED" && (
										<SalesWaitersOrder order={order} key={index} />
									)}
								</div>
							))}
							{orders.length === 0 && (
								<div className="empty-box">
									<FileMinus size={32} />
									<span>{t("Empty.Orders")}</span>
								</div>
							)}
						</div>
					) : (
						<div className="w-orders-loading">
							<Spinner size={32} theme="primary" />
							<span className="w-orders-loading-message">
								{t("Loaders.AttendanceOrders")}
							</span>
						</div>
					)}
				</main>
			</div>
		</MainContainer>
	);
};

export { WaiterMyOrdersPage };
