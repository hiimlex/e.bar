import { useCallback, useEffect, useMemo } from "react";
import { FileMinus, Plus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useDebounceValue } from "usehooks-ts";
import {
	IProduct,
	ModalIds,
	ProductCategoriesArray,
	ProductCategory,
} from "../../@types";
import {
	Button,
	Chip,
	ChipWrapper,
	Input,
	MainContainer,
	Spinner,
} from "../../components";
import { useBreakpoint, useModal } from "../../hooks";
import {
	AppDispatch,
	ProductsActions,
	RootState,
	fetchProducts,
} from "../../store";
import { ProductCard, ProductModal } from "./components";
import "./styles.scss";
import { useTranslation } from "react-i18next";

interface BarProductsPageProps {}

const BarProductsPage: React.FC<BarProductsPageProps> = () => {
	const { t } = useTranslation();
	const { filters, products, isLoadingProducts } = useSelector(
		(state: RootState) => state.products
	);
	const dispatch = useDispatch<AppDispatch>();
	const [search, setSearch] = useDebounceValue(filters.nome, 300);

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

	const onSelectCategory = (category: ProductCategory | undefined) => {
		dispatch(
			ProductsActions.setFilters({
				categoria: category,
				sem_estoque: undefined,
			})
		);
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

	const onSearch = (search?: string) => {
		dispatch(ProductsActions.setFilters({ nome: search }));
	};

	const getAllProducts = useCallback(async () => {
		try {
			await dispatch(fetchProducts());
		} catch (error) {
			console.error(error);
		}
	}, [filters]);

	const openAddProductModal = () => {
		openModal({
			id: ModalIds.AddProduct,
			component: (
				<ProductModal
					mode="create"
					id={ModalIds.AddProduct}
					beforeClose={getAllProducts}
				/>
			),
		});
	};

	const openEditProductModal = (product: IProduct) => {
		// openModal({
		// 	id: ModalIds.EditProduct,
		// 	component: (
		// 		<ProductModal
		// 			mode="edit"
		// 			id={ModalIds.EditProduct}
		// 			beforeClose={getAllProducts}
		// 			productId={product.id.toString()}
		// 			initialProduct={{
		// 				name: product.name,
		// 				category: product.category,
		// 				price: product.price,
		// 				stock: product.stock,
		// 			}}
		// 		/>
		// 	),
		// });
	};

	useEffect(() => {
		getAllProducts();
	}, [getAllProducts]);

	useEffect(() => {
		onSearch(search);
	}, [search]);

	return (
		<MainContainer showAdminHeader>
			<div className="products">
				<header className="products-header">
					<h2 className="page-title">{t('BarProducts.Title')}</h2>
					<Button onClick={openAddProductModal}>
						<Plus size={14} /> {t('BarProducts.Buttons.Add')}
					</Button>
				</header>

				<div className="products-filters">
					<ChipWrapper maxWidth={chipsMaxWidth}>
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
								active={category.value == filters.categoria}
								clickable
								theme="secondary"
								onClick={() => onSelectCategory(category.value)}
							>
								{category.key}
							</Chip>
						))}
					</ChipWrapper>
					<div>
						<Input
							placeholder="Buscar..."
							className="search"
							hideLabel
							onChangeValue={(value) => setSearch(value)}
						/>
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
		</MainContainer>
	);
};

export default BarProductsPage;
