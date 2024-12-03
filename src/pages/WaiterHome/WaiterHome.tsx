import { Box, useToast } from "leux";
import { useCallback, useEffect } from "react";
import { FileMinus } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IOrder, Pages, SafeAny } from "../../@types";
import { Button, Chip, MainContainer, Spinner } from "../../components";
import {
	AppDispatch,
	OnOrderActions,
	ProductsActions,
	ProductsThunks,
	RootState,
	WaiterActions,
	WaiterThunks,
} from "../../store";
import { WaiterOrdersCard, WaiterProductCard } from "./components";

import S from "./WaiterHome.styles";
import { Styled } from "../../styles";

interface WaiterHomePageProps {}

const WaiterHomePage: React.FC<WaiterHomePageProps> = () => {
	const { t } = useTranslation();
	const ToastService = useToast();
	const { filters, products, isLoadingProducts, categories } = useSelector(
		(state: RootState) => state.products
	);
	const { waiter } = useSelector((state: RootState) => state.user);
	const {
		orders,
		loadingOrders,
		filters: orderFilters,
	} = useSelector((state: RootState) => state.waiter);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(
			WaiterActions.setOrderFilters({
				status: ["PENDING", "DELIVERED"],
			})
		);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSelectCategory = (category_id?: string) => {
		dispatch(ProductsActions.setFilters({ category_id, no_stock: undefined }));
	};

	const onStockFilter = () => {
		let newFilter: boolean | undefined = !filters.no_stock;
		if (!newFilter) {
			newFilter = undefined;
		}
		dispatch(
			ProductsActions.setFilters({
				no_stock: newFilter,
				category_id: undefined,
			})
		);
	};

	const clearFilters = () => {
		dispatch(
			ProductsActions.setFilters({
				no_stock: undefined,
				category_id: undefined,
			})
		);
	};

	const loadCategories = useCallback(async () => {
		await dispatch(
			ProductsThunks.fetchStoreCategories({
				loading: true,
				onError: (error) => {
					if (error.response?.data) {
						const { message } = error.response.data as SafeAny;

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
	}, []);

	const loadProducts = useCallback(
		async (enableLoader = true) => {
			await dispatch(
				ProductsThunks.fetchProducts({
					loading: enableLoader,
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
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filters]
	);

	const loadOrders = useCallback(async () => {
		await dispatch(
			WaiterThunks.getMyOrders({
				loading: true,
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
	}, [orderFilters]);

	const navigateToOrder = (order: IOrder) => {
		const to = Pages.WaiterOrder.replace(":orderId", order._id.toString());
		dispatch(OnOrderActions.setOrder(order));

		navigate(to);
	};

	useEffect(() => {
		loadCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!loadingOrders) {
			loadOrders();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadOrders]);

	useEffect(() => {
		if (!isLoadingProducts) {
			loadProducts();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadProducts]);

	return (
		<MainContainer showCode>
			<S.Container>
				<S.Content>
					<Styled.Typography.Title textColor="darker">
						{t("WaiterHome.Subtitle", { name: waiter?.name })}
					</Styled.Typography.Title>
					<Button
						className="fill-row"
						onClick={() => navigate(Pages.WaiterNewOrder)}
					>
						{t("WaiterHome.Buttons.NewOrder")}
					</Button>

					<S.Section>
						<S.SectionHeader>
							<Styled.Typography.Subtitle textColor="darker">
								{t("WaiterHome.Labels.MyOrders")}
							</Styled.Typography.Subtitle>
							<Styled.Typography.Link
								textColored="secondary"
								role="button"
								onClick={() => navigate(Pages.WaiterMyOrders)}
							>
								{t("WaiterHome.Labels.SeeAll")}
							</Styled.Typography.Link>
						</S.SectionHeader>

						{!loadingOrders && (
							<S.Grid>
								{orders.map((order, index) => (
									<WaiterOrdersCard
										order={order}
										onClick={navigateToOrder}
										key={index}
									/>
								))}
							</S.Grid>
						)}

						{!loadingOrders && orders.length === 0 && (
							<Styled.Empty>
								<FileMinus strokeWidth={2} size={32} />
								<Box>{t("Empty.Orders")}</Box>
							</Styled.Empty>
						)}

						{loadingOrders && (
							<Styled.LoadingContainer>
								<Spinner size={32} theme="primary" />
								<Styled.Typography.Caption>
									{t("Loaders.Orders")}
								</Styled.Typography.Caption>
							</Styled.LoadingContainer>
						)}
					</S.Section>
					<S.Section>
						<S.SectionHeader>
							<Styled.Typography.Subtitle textColor="darker">
								{t("WaiterHome.Labels.Products")}
							</Styled.Typography.Subtitle>
							<Styled.Typography.Link
								role="button"
								textColored="secondary"
								onClick={() => navigate(Pages.WaiterProducts)}
							>
								{t("WaiterHome.Labels.SeeAll")}
							</Styled.Typography.Link>
						</S.SectionHeader>
						<S.Filters className="w-home-grid">
							<Chip
								active={!filters.category_id && !filters.no_stock}
								clickable
								theme="secondary"
								onClick={clearFilters}
							>
								{t("WaiterHome.Filters.All")}
							</Chip>
							<Chip
								active={filters.no_stock}
								clickable
								theme="secondary"
								onClick={onStockFilter}
							>
								{t("WaiterHome.Filters.NoStock")}
							</Chip>
							{categories.map((category, index) => (
								<Chip
									key={index}
									clickable
									theme="secondary"
									active={filters.category_id === category._id}
									onClick={() => onSelectCategory(category._id)}
								>
									{category.name}
								</Chip>
							))}
						</S.Filters>
						{!isLoadingProducts && (
							<S.Grid className="w-home-grid">
								{products.map((product) => (
									<WaiterProductCard product={product} key={product._id} />
								))}
							</S.Grid>
						)}
						{isLoadingProducts && (
							<Styled.LoadingContainer className="w-home-loading">
								<Spinner size={32} theme="primary" />
								<span className="w-home-loading-message">
									{t("Loaders.Products")}
								</span>
							</Styled.LoadingContainer>
						)}
						{!isLoadingProducts && products.length === 0 && (
							<Styled.Empty className="w-home-empty">
								<FileMinus strokeWidth={2} size={32} />
								<Styled.Typography.Caption>
									{t("Empty.Products")}
								</Styled.Typography.Caption>
							</Styled.Empty>
						)}
					</S.Section>
				</S.Content>
			</S.Container>
		</MainContainer>
	);
};

export default WaiterHomePage;
