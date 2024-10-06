import { useCallback, useEffect, useRef, useState } from "react";
import { FileMinus } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../@types";
import { Chip, Input, MainContainer, Spinner } from "../../components";
import {
	AppDispatch,
	ProductsActions,
	ProductsThunks,
	RootState,
} from "../../store";
import { ProductsRowCard } from "./components";
import "./styles.scss";
import { useDebounceValue } from "usehooks-ts";

interface WaiterProductsPageProps {}

const WaiterProductsPage: React.FC<WaiterProductsPageProps> = () => {
	const { t } = useTranslation();
	const { filters, products, isLoadingProducts, categories } = useSelector(
		(state: RootState) => state.products
	);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const [showSearch, setShowSearch] = useState(false);
	const [value, setValue] = useState("");
	const [search, setSearch] = useDebounceValue("", 300);

	useEffect(() => {
		dispatch(ProductsActions.setFilters({ name: search }));
	}, [search]);

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

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
		await dispatch(ProductsThunks.fetchStoreCategories());
	}, []);

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

	useEffect(() => {
		loadCategories();
	}, []);

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			showGoBack
			onGoBack={goBack}
			showSearch
			onSearch={() => setShowSearch((curr) => !curr)}
		>
			<div className="w-products">
				<main className="w-products-content">
					<header className={`w-products-header`}>
						<span
							className="page-title"
							dangerouslySetInnerHTML={{ __html: t("WaiterProducts.Title") }}
						></span>
						<div className="w-products-filters">
							{showSearch && (
								<Input
									placeholder="Buscar produto..."
									onChangeValue={(value) => {
										setValue(value);
										setSearch(value);
									}}
									wrapperClassName="fill-row"
									hideLabel
									value={value}
								/>
							)}
							<div className="w-products-filters-chips scrollable-x no-scroll">
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
								{categories.map((category) => (
									<Chip
										key={category._id}
										active={category._id === filters.category_id}
										clickable
										theme="secondary"
										onClick={() => onSelectCategory(category._id)}
									>
										{category.name}
									</Chip>
								))}
							</div>
						</div>
					</header>
					{!isLoadingProducts && products.length === 0 && (
						<div className="empty-box">
							<FileMinus strokeWidth={2} size={32} />
							<div>{t("Empty.Products")}</div>
						</div>
					)}
					{!isLoadingProducts && (
						<div className="w-products-list no-scroll">
							{products.map((product, index) => (
								<ProductsRowCard product={product} key={index} />
							))}
						</div>
					)}
					{isLoadingProducts && (
						<div className="w-products-loading">
							<Spinner size={32} theme="primary" />
							<span className="w-products-loading-message">
								{t("Loaders.Products")}
							</span>
						</div>
					)}
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterProductsPage;
