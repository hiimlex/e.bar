import { Plus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pages, ProductCategoriesArray } from "../../@types";
import { Button, Chip, MainContainer } from "../../components";
import { AppDispatch, ProductsActions, RootState } from "../../store";
import { WaiterOrdersCard, WaiterProductCard } from "./components";
import "./styles.scss";

interface WaiterHomePageProps {}

const WaiterHomePage: React.FC<WaiterHomePageProps> = () => {
	const { filters } = useSelector((state: RootState) => state.products);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleChangeFilter = (category: number) => {
		dispatch(ProductsActions.setFilters({ category }));
	};

	return (
		<MainContainer>
			<div className="w-home">
				<main className="w-home-content">
					<span className="page-title">Olá, {"Mateus"}</span>
					<Button
						className="fill-row"
						onClick={() => navigate(Pages.WaiterNewOrder)}
					>
						<Plus size={14} /> COMANDA
					</Button>

					<div className="w-home-orders">
						<div className="w-home-orders--header">
							<span className="w-home-subtitle">Minhas comandas</span>
							<span
								className="link link-secondary"
								role="button"
								onClick={() => navigate(Pages.WaiterOrders)}
							>
								ver todas
							</span>
						</div>
						<div className="w-home-grid">
							{Array.from({ length: 4 }).map((_, index) => (
								<WaiterOrdersCard id={index} key={index} />
							))}
						</div>
					</div>
					<div className="w-home-products">
						<div className="w-home-products--header">
							<span className="w-home-subtitle">Produtos</span>
							<span
								role="button"
								className="link link-secondary"
								onClick={() => navigate(Pages.WaiterProducts)}
							>
								ver todos
							</span>
						</div>
						<div className="w-home-grid">
							{ProductCategoriesArray.map((category, index) => (
								<Chip
									key={index}
									clickable
									theme="secondary"
									active={filters.category === +category.value}
									onClick={() => handleChangeFilter(+category.value)}
								>
									{category.key}
								</Chip>
							))}
						</div>
						<div className="w-home-grid">
							{Array.from({ length: 4 }).map((_, index) => (
								<WaiterProductCard key={index} />
							))}
						</div>
					</div>
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterHomePage;
