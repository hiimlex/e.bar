import { useCallback, useEffect } from "react";
import { FileMinus } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IOrder, Pages } from "../../@types";
import { Button, Chip, MainContainer, Spinner } from "../../components";
import {
	AppDispatch,
	OnOrderActions,
	ProductsActions,
	ProductsThunks,
	RootState,
	WaiterThunks,
} from "../../store";
import { WaiterOrdersCard, WaiterProductCard } from "./components";
import "./styles.scss";

interface WaiterHomePageProps {}

const WaiterHomePage: React.FC<WaiterHomePageProps> = () => {
	const { t } = useTranslation();
	const { filters, products, isLoadingProducts, categories } = useSelector(
		(state: RootState) => state.products
	);
	const { waiter } = useSelector((state: RootState) => state.user);
	const { orders, loadingOrders } = useSelector(
		(state: RootState) => state.waiter
	);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const onSelectCategory = (category_id?: string) => {
		console.log(category_id);
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
		await dispatch(ProductsThunks.fetchStoreCategories());
	}, []);

	const loadProducts = useCallback(
		async (enableLoader = true) => {
			await dispatch(ProductsThunks.fetchProducts(enableLoader));
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filters]
	);

	const loadOrders = useCallback(async () => {
		await dispatch(WaiterThunks.getMyOrders());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
			<div className="w-home">
				<main className="w-home-content">
					<span className="page-title">
						{t("WaiterHome.Subtitle", { name: waiter?.name })}
					</span>
					<Button
						className="fill-row"
						onClick={() => navigate(Pages.WaiterNewOrder)}
					>
						{t("WaiterHome.Buttons.NewOrder")}
					</Button>

					<div className="w-home-orders">
						<div className="w-home-orders--header">
							<span className="w-home-subtitle">
								{t("WaiterHome.Labels.MyOrders")}
							</span>
							<span
								className="link link-secondary"
								role="button"
								onClick={() => navigate(Pages.WaiterMyOrders)}
							>
								{t("WaiterHome.Labels.SeeAll")}
							</span>
						</div>
						{!loadingOrders && orders.length === 0 && (
							<div className="w-home-empty">
								<FileMinus strokeWidth={2} size={32} />
								<div>{t("Empty.Orders")}</div>
							</div>
						)}
						{!loadingOrders && (
							<div className="w-home-grid">
								{orders.map((order, index) => (
									<WaiterOrdersCard
										order={order}
										onClick={navigateToOrder}
										key={index}
									/>
								))}
							</div>
						)}
						{loadingOrders && (
							<div className="w-home-loading">
								<Spinner size={32} theme="primary" />
								<span className="w-home-loading-message">
									<span>{t("Loaders.Orders")}</span>
								</span>
							</div>
						)}
					</div>
					<div className="w-home-products">
						<div className="w-home-products--header">
							<span className="w-home-subtitle">
								{t("WaiterHome.Labels.Products")}
							</span>
							<span
								role="button"
								className="link link-secondary"
								onClick={() => navigate(Pages.WaiterProducts)}
							>
								{t("WaiterHome.Labels.SeeAll")}
							</span>
						</div>
						<div className="w-home-grid">
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
						</div>
						{!isLoadingProducts && products.length === 0 && (
							<div className="w-home-empty">
								<FileMinus strokeWidth={2} size={32} />
								<div>{t("Empty.Products")}</div>
							</div>
						)}
						{!isLoadingProducts && (
							<div className="w-home-grid">
								{products.map((product) => (
									<WaiterProductCard product={product} key={product._id} />
								))}
							</div>
						)}
						{isLoadingProducts && (
							<div className="w-home-loading">
								<Spinner size={32} theme="primary" />
								<span className="w-home-loading-message">
									{t("Loaders.Products")}
								</span>
							</div>
						)}
					</div>
				</main>
			</div>
		</MainContainer>
	);
};

export { WaiterHomePage };
