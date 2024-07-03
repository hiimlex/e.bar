import { useDispatch, useSelector } from "react-redux";
import { ProductCategoriesArray } from "../../@types";
import { Button, Chip, Input, MainContainer } from "../../components";
import { ProductCard } from "./components";
import "./styles.scss";
import { AppDispatch, ProductsActions, RootState } from "../../store";

interface ProductsPageProps {}

const ProductsPage: React.FC<ProductsPageProps> = () => {
	const { filters } = useSelector((state: RootState) => state.products);
	const dispatch = useDispatch<AppDispatch>();

	const onSelectCategory = (category: number) => {
		dispatch(ProductsActions.setFilters({ category }));
	};

	return (
		<MainContainer showAdminHeader>
			<div className="products">
				<header className="products-header">
					<h2 className="page-title">Meus produtos</h2>
					<Button>ADICIONAR</Button>
				</header>

				<div className="products-filters">
					<div className="chips">
						{ProductCategoriesArray.map((category, index) => (
							<Chip
								key={index}
								active={+category.value === filters.category}
								clickable
								theme="secondary"
								onClick={() => onSelectCategory(+category.value)}
							>
								{category.key}
							</Chip>
						))}
					</div>
					<div>
						<Input placeholder="Buscar..." className="search" hideLabel />
					</div>
				</div>

				<div className="products-grid">
					{Array.from({ length: 10 }).map((_, index) => (
						<ProductCard key={index} />
					))}
				</div>
			</div>
		</MainContainer>
	);
};

export default ProductsPage;
