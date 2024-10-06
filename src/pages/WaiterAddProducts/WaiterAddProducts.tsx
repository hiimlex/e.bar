import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileMinus } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounceValue } from "usehooks-ts";
import { IProduct, Pages } from "../../@types";
import { WaiterOrdersService } from "../../api";
import { Button, Chip, Input, MainContainer, Spinner } from "../../components";
import {
	AppDispatch,
	OnOrderActions,
	ProductsActions,
	ProductsThunks,
	RootState,
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
	const { t } = useTranslation();

	const { filters, products, categories, isLoadingProducts } = useSelector(
		(state: RootState) => state.products
	);

	const [toAddProducts, setToAddProducts] = useState<AddProduct>({});

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [value, setValue] = useState("");
	const [search, setSearch] = useDebounceValue("", 300);

	useEffect(() => {
		dispatch(ProductsActions.setFilters({ name: search }));
	}, [search]);

	const goBack = () => {
		const to = Pages.WaiterOrderProducts.replace(":orderId", orderId || "");

		navigate(to);
	};

	const canAddProducts = useMemo(
		() => Object.keys(toAddProducts).length > 0,
		[toAddProducts]
	);

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

	const onAddProduct = (product: IProduct, quantity: number) => {
		const newToAddProducts = { ...toAddProducts };
		if (!newToAddProducts[product._id]) {
			newToAddProducts[product._id] = { product, quantity };
		}
		if (newToAddProducts[product._id]) {
			newToAddProducts[product._id].quantity = quantity;
			if (quantity === 0) {
				delete newToAddProducts[product._id];
			}
		}
		setToAddProducts(newToAddProducts);
	};

	const loadProducts = useCallback(
		async (enableLoader = true) => {
			await dispatch(ProductsThunks.fetchProducts(enableLoader));
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filters]
	);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	const loadStoreCategories = useCallback(async () => {
		try {
			await dispatch(ProductsThunks.fetchStoreCategories());
		} catch (error) {
			console.error(error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		loadStoreCategories();
	}, [loadStoreCategories]);

	const getOrder = useCallback(async () => {
		try {
			if (!orderId) {
				return;
			}

			const { data } = await WaiterOrdersService.getById(orderId);

			if (data) {
				dispatch(OnOrderActions.setOrder(data));
			} else {
				navigate(Pages.WaiterHome);
			}
		} catch (error) {
			navigate(Pages.WaiterHome);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getOrder();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// const value = search !== "" ? search : undefined;
		// dispatch(ProductsActions.setFilters({ nome: value }));
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
						<span
							className="page-title"
							dangerouslySetInnerHTML={{ __html: t("WaiterAddProducts.Title") }}
						></span>
						{showSearch && (
							<Input
								placeholder="Buscar produto..."
								onChangeValue={(value) => {
									setValue(value);
									setSearch(value);
								}}
								hideLabel
								value={value}
							/>
						)}
						<div className="w-a-products-filters-chips scrollable-x no-scroll">
							<Chip
								active={!filters.category_id && !filters.no_stock}
								clickable
								theme="secondary"
								onClick={clearFilters}
							>
								{t("WaiterAddProducts.Filters.All")}
							</Chip>
							<Chip
								active={filters.no_stock}
								clickable
								theme="secondary"
								onClick={onStockFilter}
							>
								{t("WaiterAddProducts.Filters.NoStock")}
							</Chip>
							{categories.map((category, index) => (
								<Chip
									key={index}
									active={category._id === filters.category_id}
									clickable
									theme="secondary"
									onClick={() => onSelectCategory(category._id)}
								>
									{category.name}
								</Chip>
							))}
						</div>
					</header>

					{!isLoadingProducts && products.length === 0 && (
						<div className="empty-box">
							<FileMinus size={32} />
							<span>{t("Empty.Products")}</span>
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
									quantity={toAddProducts[product._id]?.quantity ?? 0}
								/>
							))}
						</div>
					)}
					{isLoadingProducts && (
						<div className="w-a-products-loading">
							<Spinner size={32} theme="primary" />
							<span className="w-a-products-loading-message">
								{t("Loaders.Products")}
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
								{t("Generics.Buttons.Add")}
							</Button>
						</footer>
					)}
				</main>
			</div>
			{showConfirmModal && orderId && (
				<ConfirmAddProducts
					orderId={orderId}
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
