import { useToast } from "leux";
import { useCallback, useEffect } from "react";
import { FileMinus } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IListOrdersFilters, Pages, SafeAny, TOrderBy } from "../../@types";
import { Chip, MainContainer, OrderBy, Spinner, WaiterOrderCard } from "../../components";
import {
	AppDispatch,
	RootState,
	WaiterActions,
	WaiterThunks,
} from "../../store";
import { Styled } from "../../styles";
import { SalesWaitersOrder } from "../Sales";
import S from "./WaiterMyOrders.styles";

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
		<MainContainer showGoBack onGoBack={() => navigate(-1)}>
			<S.Container className="w-orders">
				<S.Content className="w-orders-content">
					<S.Header className={`w-orders-header`}>
						<Styled.Typography.Title
							textColor="darker"
							dangerouslySetInnerHTML={{ __html: t("WaiterMyOrders.Title") }}
						></Styled.Typography.Title>

						<S.Filters className="w-orders-filters">
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
						</S.Filters>
						<S.Filters className="w-orders-filters">
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
						</S.Filters>
					</S.Header>

					{!loadingOrders ? (
						<S.List className="no-scroll">
							{orders.map((order, index) => (
								<div key={index}>
									{order.status !== "FINISHED" && (
										<WaiterOrderCard
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
								<Styled.Empty className="empty-box">
									<FileMinus size={32} />
									<span>{t("Empty.Orders")}</span>
								</Styled.Empty>
							)}
						</S.List>
					) : (
						<Styled.LoadingContainer className="w-orders-loading">
							<Spinner size={32} theme="primary" />
							<Styled.Typography.Caption className="w-orders-loading-message">
								{t("Loaders.AttendanceOrders")}
							</Styled.Typography.Caption>
						</Styled.LoadingContainer>
					)}
				</S.Content>
			</S.Container>
		</MainContainer>
	);
};

export { WaiterMyOrdersPage };
