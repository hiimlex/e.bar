import { Plus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pages, ProductCategoriesArray, ProductCategory } from "../../@types";
import { Button, Chip, MainContainer, Spinner } from "../../components";
import {
	AppDispatch,
	ProductsActions,
	RootState,
	fetchProducts,
} from "../../store";
import { WaiterOrdersCard, WaiterProductCard } from "./components";
import "./styles.scss";
import { useCallback, useEffect } from "react";

interface WaiterHomePageProps {}

const WaiterHomePage: React.FC<WaiterHomePageProps> = () => {
	const { filters, products, isLoadingProducts } = useSelector(
		(state: RootState) => state.products
	);
	const { waiter } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const onSelectCategory = (categoria?: ProductCategory) => {
		dispatch(ProductsActions.setFilters({ categoria, sem_estoque: undefined }));
	};

	const onStockFilter = () => {
		let newFilter: boolean | undefined = !filters.sem_estoque;

		if (!newFilter) {
			newFilter = undefined;
		}

		dispatch(
			ProductsActions.setFilters({
				sem_estoque: newFilter,
				categoria: undefined,
			})
		);
	};

	const clearFilters = () => {
		dispatch(
			ProductsActions.setFilters({
				sem_estoque: undefined,
				categoria: undefined,
			})
		);
	};

	const loadProducts = useCallback(
		async (enableLoader = true) => {
			await dispatch(fetchProducts(enableLoader));
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filters]
	);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	return (
		<MainContainer>
			<div className="w-home">
				<main className="w-home-content">
					<span className="page-title">Olá, {waiter?.name}</span>
					<Button
						className="fill-row"
						onClick={() => navigate(Pages.WaiterNewOrder)}
					>
						<Plus size={14} /> COMANDA
					</Button>

					<div className="w-home-orders">
						<div className="w-home-orders--header">
							<span className="w-home-subtitle">Minhas comandas</span>
							<span
								className="link link-secondary"
								role="button"
								onClick={() => navigate(Pages.WaiterOrders)}
							>
								ver todas
							</span>
						</div>
						<div className="w-home-grid">
							{Array.from({ length: 4 }).map((_, index) => (
								<WaiterOrdersCard id={index} key={index} />
							))}
						</div>
					</div>
					<div className="w-home-products">
						<div className="w-home-products--header">
							<span className="w-home-subtitle">Produtos</span>
							<span
								role="button"
								className="link link-secondary"
								onClick={() => navigate(Pages.WaiterProducts)}
							>
								ver todos
							</span>
						</div>
						<div className="w-home-grid">
							<Chip
								active={!filters.categoria && !filters.sem_estoque}
								clickable
								theme="secondary"
								onClick={clearFilters}
							>
								Todos
							</Chip>
							<Chip
								active={filters.sem_estoque}
								clickable
								theme="secondary"
								onClick={onStockFilter}
							>
								S/ Estoque
							</Chip>
							{ProductCategoriesArray.map((category, index) => (
								<Chip
									key={index}
									clickable
									theme="secondary"
									active={filters.categoria === category.value}
									onClick={() => onSelectCategory(category.value)}
								>
									{category.key}
								</Chip>
							))}
						</div>
						{!isLoadingProducts ? (
							<div className="w-home-grid">
								{products.map((product, index) => (
									<WaiterProductCard product={product} key={index} />
								))}
							</div>
						) : (
							<div className="w-home-loading">
								<Spinner size={32} theme="primary" />
								<span className="w-home-loading-message">
									Carregando produtos...
								</span>
							</div>
						)}
					</div>
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterHomePage;
