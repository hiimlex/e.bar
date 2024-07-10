import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	IProduct,
	Pages,
	ProductCategoriesArray,
	ProductCategory,
} from "../../@types";
import { Button, Chip, MainContainer, Spinner } from "../../components";
import {
	AppDispatch,
	ProductsActions,
	RootState,
	fetchProducts,
} from "../../store";
import { ProductsRowCard } from "../WaiterProducts/components";
import "./styles.scss";

interface WaiterAddProductsPageProps {}

const WaiterAddProductsPage: React.FC<WaiterAddProductsPageProps> = () => {
	const { orderId } = useParams();

	const { filters, products, isLoadingProducts } = useSelector(
		(state: RootState) => state.products
	);

	const [toAddProducts, setToAddProducts] = useState<
		Record<string, { product: IProduct; quantity: number }>
	>({});

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const goBack = () => {
		const to = Pages.WaiterOrderProducts.replace(":orderId", orderId || "");

		navigate(to);
	};

	const canAddProducts = useMemo(
		() => Object.keys(toAddProducts).length > 0,
		[toAddProducts]
	);

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

	const onAddProduct = (product: IProduct, quantity: number) => {
		const newToAddProducts = { ...toAddProducts };

		if (newToAddProducts[product.id]) {
			newToAddProducts[product.id].quantity = quantity;
		}

		if (!newToAddProducts[product.id]) {
			newToAddProducts[product.id] = { product, quantity };
		}

		setToAddProducts(newToAddProducts);
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
			<div className="w-a-products">
				<main className="w-a-products-content">
					<header className={`w-a-products-header`}>
						<span className="page-title">
							Produtos na
							<br />
							Comanda
						</span>
						<div className="w-a-products-filters">
							<div className="w-a-products-filters-chips scrollable-x no-scroll">
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
						<div className={`w-a-products-list no-scroll ${canAddProducts ? 'margin-bottom' : ''}`}>
							{products.map((product, index) => (
								<ProductsRowCard
									product={product}
									key={index}
									showAdd={true}
									onAdd={onAddProduct}
									selected={toAddProducts[product.id]?.quantity ?? 0}
								/>
							))}
						</div>
					) : (
						<div className="w-a-products-loading">
							<Spinner size={32} theme="primary" />
							<span className="w-a-products-loading-message">
								Carregando produtos...
							</span>
						</div>
					)}

					{canAddProducts && (
						<footer className="w-a-products-footer">
							<Button className="fill-row">Adicionar</Button>
						</footer>
					)}
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterAddProductsPage;
