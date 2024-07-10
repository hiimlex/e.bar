import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pages, ProductCategoriesArray, ProductCategory } from "../../@types";
import { Chip, MainContainer, Spinner } from "../../components";
import {
	AppDispatch,
	ProductsActions,
	RootState,
	fetchProducts,
} from "../../store";
import { ProductsRowCard } from "./components";
import "./styles.scss";

interface WaiterProductsPageProps {}

const WaiterProductsPage: React.FC<WaiterProductsPageProps> = () => {
	const { filters, products, isLoadingProducts } = useSelector(
		(state: RootState) => state.products
	);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

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
		<MainContainer
			wrapperRef={wrapperRef}
			showGoBack
			onGoBack={goBack}
			showSearch
		>
			<div className="w-products">
				<main className="w-products-content">
					<header className={`w-products-header`}>
						<span className="page-title">
							Lista de
							<br />
							Produtos
						</span>
						<div className="w-products-filters">
							<div className="w-products-filters-chips scrollable-x no-scroll">
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
										active={category.value === filters.categoria}
										clickable
										theme="secondary"
										onClick={() => onSelectCategory(category.value)}
									>
										{category.key}
									</Chip>
								))}
							</div>
						</div>
					</header>

					{!isLoadingProducts ? (
						<div className="w-products-list no-scroll">
							{products.map((product, index) => (
								<ProductsRowCard product={product} key={index} />
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
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterProductsPage;
