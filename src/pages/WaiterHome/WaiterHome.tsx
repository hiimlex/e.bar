import { useToast } from "leux";
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
					<S.PageTitle>
						{t("WaiterHome.Subtitle", { name: waiter?.name })}
					</S.PageTitle>
					<Button
						className="fill-row"
						onClick={() => navigate(Pages.WaiterNewOrder)}
					>
						{t("WaiterHome.Buttons.NewOrder")}
					</Button>

					<S.Section>
						<S.SectionHeader>
							<S.PageSubtitle>{t("WaiterHome.Labels.MyOrders")}</S.PageSubtitle>
							<span
								className="link link-secondary"
								role="button"
								onClick={() => navigate(Pages.WaiterMyOrders)}
							>
								{t("WaiterHome.Labels.SeeAll")}
							</span>
						</S.SectionHeader>
						{!loadingOrders && orders.length === 0 && (
							<S.Empty>
								<FileMinus strokeWidth={2} size={32} />
								<div>{t("Empty.Orders")}</div>
							</S.Empty>
						)}
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
						{loadingOrders && (
							<S.LoadingContainer>
								<Spinner size={32} theme="primary" />
								<span className="w-home-loading-message">
									<span>{t("Loaders.Orders")}</span>
								</span>
							</S.LoadingContainer>
						)}
					</S.Section>
					<S.Section>
						<S.SectionHeader>
							<S.PageSubtitle>{t("WaiterHome.Labels.Products")}</S.PageSubtitle>
							<span
								role="button"
								className="link link-secondary"
								onClick={() => navigate(Pages.WaiterProducts)}
							>
								{t("WaiterHome.Labels.SeeAll")}
							</span>
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
							<S.LoadingContainer className="w-home-loading">
								<Spinner size={32} theme="primary" />
								<span className="w-home-loading-message">
									{t("Loaders.Products")}
								</span>
							</S.LoadingContainer>
						)}
						{!isLoadingProducts && products.length === 0 && (
							<S.Empty className="w-home-empty">
								<FileMinus strokeWidth={2} size={32} />
								<div>{t("Empty.Products")}</div>
							</S.Empty>
						)}
					</S.Section>
				</S.Content>
			</S.Container>
		</MainContainer>
	);
};

export default WaiterHomePage;
