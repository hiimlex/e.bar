import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pages, ProductCategoriesArray } from "../../@types";
import { Chip, MainContainer } from "../../components";
import { AppDispatch, ProductsActions, RootState } from "../../store";
import { ProductsRowCard } from "./components";
import "./styles.scss";
import { useScroll } from "../../hooks";
import { useEffect, useRef } from "react";

interface WaiterProductsPageProps {}

const WaiterProductsPage: React.FC<WaiterProductsPageProps> = () => {
	const { filters } = useSelector((state: RootState) => state.products);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

	const onSelectCategory = (category: number) => {
		dispatch(ProductsActions.setFilters({ category }));
	};

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			waiterHeaderGoBack
			waiterHeaderOnBack={goBack}
			waiterHeaderSearch
			waiterHeaderSearchPlaceholder="Buscar produtos..."
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
						</div>
					</header>

					<div className="w-products-list no-scroll">
						{Array.from({ length: 12 }).map((_, index) => (
							<ProductsRowCard key={index} />
						))}
					</div>
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterProductsPage;
