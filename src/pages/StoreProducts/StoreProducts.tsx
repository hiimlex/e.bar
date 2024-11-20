import { useCallback, useEffect, useMemo } from "react";
import { FileMinus, Plus } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useDebounceValue } from "usehooks-ts";
import { IProduct, ModalIds, SafeAny } from "../../@types";
import { Button, Input, MainContainer, Spinner } from "../../components";
import { useBreakpoint, useModal } from "../../hooks";
import {
	AppDispatch,
	ProductsActions,
	ProductsThunks,
	RootState,
} from "../../store";
import { ProductCard, ProductModal } from "./components";
import "./styles.scss";
import { AxiosError } from "axios";
import { useToast } from "leux";

interface StoreProductsPageProps {}

const StoreProductsPage: React.FC<StoreProductsPageProps> = () => {
	const { t } = useTranslation();
	const ToastService = useToast();
	const { filters, products, isLoadingProducts, categories } = useSelector(
		(state: RootState) => state.products
	);
	const dispatch = useDispatch<AppDispatch>();
	const [search, setSearch] = useDebounceValue(filters.name, 300);

	const { breakpoint } = useBreakpoint();
	const chipsMaxWidth: number | undefined = useMemo(() => {
		const arr = {
			sm: 400,
			md: 460,
			lg: 520,
			xl: undefined,
		};

		return arr[breakpoint];
	}, [breakpoint]);

	const { openModal } = useModal();

	const onSelectCategory = (category_id: string | undefined) => {
		dispatch(
			ProductsActions.setFilters({
				category_id,
				no_stock: undefined,
			})
		);
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

	const onSearch = (search?: string) => {
		dispatch(ProductsActions.setFilters({ name: search }));
	};

	const getAllProducts = useCallback(async () => {
		try {
			await dispatch(ProductsThunks.fetchProducts());
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				const { message } = error.response.data;

				if (message && typeof message === "string") {
					const translateMessage = t(`Errors.${message}`);

					ToastService.createToast({
						label: translateMessage,
						colorScheme: "danger",
					});
				}
			}
		}
	}, [filters]);

	const getCategories = useCallback(async () => {
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

	const openAddProductModal = () => {
		openModal({
			id: ModalIds.AddProduct,
			title: "Modals.Product.create.Title",
			children: (
				<ProductModal
					mode="create"
					id={ModalIds.AddProduct}
					beforeClose={getAllProducts}
				/>
			),
		});
	};

	const openEditProductModal = (product: IProduct) => {
		const category_id =
			typeof product.category === "string"
				? product.category
				: product.category._id;

		openModal({
			id: ModalIds.EditProduct,
			title: "Modals.Product.edit.Title",
			children: (
				<ProductModal
					mode="edit"
					id={ModalIds.EditProduct}
					beforeClose={getAllProducts}
					productId={product._id.toString()}
					initialProduct={{
						name: product.name,
						category: category_id,
						price: product.price,
						stock: product.stock,
					}}
					imagePreview={product.picture?.url}
				/>
			),
		});
	};

	useEffect(() => {
		getAllProducts();
	}, [getAllProducts]);

	useEffect(() => {
		getCategories();
	}, [getCategories]);

	useEffect(() => {
		if (search !== filters.name) {
			onSearch(search);
		}
	}, [search]);

	return (
		<MainContainer showAdminHeader>
			<div className="products">
				<header className="products-header">
					<h2 className="page-title">{t("StoreProducts.Title")}</h2>
					<Button onClick={openAddProductModal}>
						<Plus size={14} /> {t("StoreProducts.Buttons.Add")}
					</Button>
				</header>

				<div className="products-container">
					<div className="products-filters">
						<Input
							placeholder="Buscar..."
							className="search"
							hideLabel
							onChangeValue={(value) => setSearch(value)}
						/>

						<div className="flex flex-col gap-4">
							<span className="products-filters-label">
								{t("StoreProducts.Filters.Category")}
							</span>

							<div className="products-categories">
								<span
									className={`products-categories-item ${
										filters.category_id === undefined ? "active" : ""
									}`}
									onClick={clearFilters}
								>
									{t("StoreProducts.Filters.All")}
								</span>

								<span
									className={`products-categories-item ${
										filters.no_stock ? "active" : ""
									}`}
									onClick={onStockFilter}
								>
									{t("StoreProducts.Filters.NoStock")}
								</span>

								{categories.map((category) => (
									<span
										className={`products-categories-item ${
											filters.category_id === category._id ? "active" : ""
										}`}
										key={category._id}
										onClick={() => onSelectCategory(category._id)}
									>
										{category.name}
									</span>
								))}
							</div>
						</div>
					</div>

					{!isLoadingProducts && products.length === 0 && (
						<div className="empty-box">
							<FileMinus size={32} />
							<span>Nenhum produto encontrado...</span>
						</div>
					)}

					{!isLoadingProducts && (
						<div className="products-grid">
							{products.map((product, index) => (
								<ProductCard
									onEdit={() => openEditProductModal(product)}
									product={product}
									key={index}
								/>
							))}
						</div>
					)}

					{isLoadingProducts && (
						<div className="products-loading">
							<Spinner size={48} theme="primary" />
							Carregando produtos
						</div>
					)}
				</div>
			</div>
		</MainContainer>
	);
};

export { StoreProductsPage };
