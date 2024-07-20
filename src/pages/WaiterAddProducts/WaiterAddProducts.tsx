import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileMinus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounceValue } from "usehooks-ts";
import {
	IProduct,
	Pages,
	ProductCategoriesArray,
	ProductCategory,
} from "../../@types";
import { OrdersService } from "../../api";
import { Button, Chip, Input, MainContainer, Spinner } from "../../components";
import {
	AppDispatch,
	OnOrderActions,
	ProductsActions,
	RootState,
	fetchProducts,
} from "../../store";
import { ProductsRowCard } from "../WaiterProducts/components";
import { ConfirmAddProducts } from "./components";
import "./styles.scss";

interface WaiterAddProductsPageProps {}

export type AddProduct = Record<
	string,
	{ product: IProduct; quantity: number }
>;

const WaiterAddProductsPage: React.FC<WaiterAddProductsPageProps> = () => {
	const { orderId } = useParams();

	const { filters, products, isLoadingProducts } = useSelector(
		(state: RootState) => state.products
	);

	const [toAddProducts, setToAddProducts] = useState<AddProduct>({});

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [search, setSearch] = useDebounceValue("", 300);

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

		if (!newToAddProducts[product.id]) {
			newToAddProducts[product.id] = { product, quantity };
		}

		if (newToAddProducts[product.id]) {
			newToAddProducts[product.id].quantity = quantity;

			if (quantity === 0) {
				delete newToAddProducts[product.id];
			}
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

	const getOrder = useCallback(async () => {
		try {
			if (!orderId) {
				return;
			}

			const { data } = await OrdersService.fetchAll({ order_id: +orderId });

			if (data) {
				dispatch(OnOrderActions.setOrder(data[0]));
			} else {
				navigate(Pages.WaiterHome);
			}
		} catch (error) {
			navigate(Pages.WaiterHome);
		}
	}, []);

	useEffect(() => {
		getOrder();
	}, []);

	useEffect(() => {
		const value = search !== "" ? search : undefined;

		dispatch(ProductsActions.setFilters({ nome: value }));
	}, [search]);

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			showGoBack
			onGoBack={goBack}
			showSearch
			onSearch={() => setShowSearch((curr) => !curr)}
		>
			<div className="w-a-products">
				<main className="w-a-products-content">
					<header className={`w-a-products-header`}>
						<span className="page-title">
							Adicionar items ao
							<br />
							Pedido
						</span>
						{showSearch && (
							<Input
								placeholder="Buscar produto..."
								onChangeValue={(value) => setSearch(value)}
							/>
						)}
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
					</header>

					{!isLoadingProducts && products.length === 0 && (
						<div className="empty-box">
							<FileMinus size={32} />
							<span>Nenhum produto encontrado...</span>
						</div>
					)}

					{!isLoadingProducts && (
						<div
							className={`w-a-products-list no-scroll ${
								canAddProducts ? "margin-bottom" : ""
							}`}
						>
							{products.map((product, index) => (
								<ProductsRowCard
									product={product}
									key={index}
									showChangeButtons={true}
									onChange={onAddProduct}
									quantity={toAddProducts[product.id]?.quantity ?? 0}
								/>
							))}
						</div>
					)}
					{isLoadingProducts && (
						<div className="w-a-products-loading">
							<Spinner size={32} theme="primary" />
							<span className="w-a-products-loading-message">
								Carregando produtos...
							</span>
						</div>
					)}

					{canAddProducts && (
						<footer className="w-a-products-footer">
							<Button
								theme="secondary"
								className="fill-row"
								onClick={() => setShowConfirmModal(true)}
							>
								Adicionar
							</Button>
						</footer>
					)}
				</main>
			</div>
			{showConfirmModal && orderId && (
				<ConfirmAddProducts
					orderId={+orderId}
					productList={toAddProducts}
					cancel={() => setShowConfirmModal(false)}
					onChange={(newToAddProducts) => setToAddProducts(newToAddProducts)}
					onConfirm={() => {
						setShowConfirmModal(false);
						goBack();
					}}
				/>
			)}
		</MainContainer>
	);
};

export default WaiterAddProductsPage;
