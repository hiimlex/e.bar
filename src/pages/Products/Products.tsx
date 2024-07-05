import { useCallback, useEffect } from "react";
import { Plus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useDebounceValue } from "usehooks-ts";
import {
	IProduct,
	ModalIds,
	ProductCategoriesArray,
	ProductCategory,
} from "../../@types";
import { Button, Chip, Input, MainContainer, Spinner } from "../../components";
import { useModal } from "../../hooks";
import {
	AppDispatch,
	ProductsActions,
	RootState,
	fetchProducts,
} from "../../store";
import { ProductCard, ProductModal } from "./components";
import "./styles.scss";

interface ProductsPageProps {}

const ProductsPage: React.FC<ProductsPageProps> = () => {
	const { filters, products, isLoadingProducts } = useSelector(
		(state: RootState) => state.products
	);
	const dispatch = useDispatch<AppDispatch>();
	const [search, setSearch] = useDebounceValue(filters.nome, 300);

	const { openModal, closeModal } = useModal();

	const onSelectCategory = (category: ProductCategory | undefined) => {
		dispatch(ProductsActions.setFilters({ categoria: category }));
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
		openModal({
			id: ModalIds.EditProduct,
			component: (
				<ProductModal
					mode="edit"
					id={ModalIds.EditProduct}
					beforeClose={getAllProducts}
					productId={product.id.toString()}
					initialProduct={{
						name: product.name,
						category: product.category,
						price: product.price,
						stock: product.stock,
						image_url: product.image_url,
					}}
				/>
			),
		});
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
					<h2 className="page-title">Meus produtos</h2>
					<Button onClick={openAddProductModal}>
						<Plus size={14} /> ADICIONAR
					</Button>
				</header>

				<div className="products-filters">
					<div className="products-filters-chips">
						<Chip
							active={!filters.categoria}
							clickable
							theme="secondary"
							onClick={() => onSelectCategory(undefined)}
						>
							Todos
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
					</div>
					<div>
						<Input
							placeholder="Buscar..."
							className="search"
							hideLabel
							onChangeValue={(value) => setSearch(value)}
						/>
					</div>
				</div>

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

export default ProductsPage;
