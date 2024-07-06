import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Pages } from "../../@types";
import { Button, MainContainer } from "../../components";
import { AppDispatch } from "../../store";
import "./styles.scss";

interface WaiterOrderProductsPageProps {}

const WaiterOrderProductsPage: React.FC<WaiterOrderProductsPageProps> = () => {
	const { orderId } = useParams();

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const goBack = () => {
		const to = Pages.WaiterOrder.replace(":orderId", orderId || "");

		navigate(to);
	};

	const onAddProduct = () => {
		const to = Pages.WaiterAddProducts.replace(":orderId", orderId || "");

		navigate(to);
	};

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			waiterHeaderGoBack
			waiterHeaderOnBack={goBack}
		>
			<div className="w-o-products">
				<main className="w-o-products-content">
					<header className={`w-o-products-header`}>
						<span className="page-title">
							Produtos na
							<br />
							Comanda
						</span>
					</header>

					<div className="w-o-products-list no-scroll">
						{/* {Array.from({ length: 12 }).map((_, index) => (
							<ProductsRowCard key={index} />
						))} */}
					</div>

					<div className="w-o-products-total">
						<span>Total</span>
						<div className="text-currency">
							<span>R$</span>
							<span>100</span>
						</div>
					</div>

					<footer className="w-o-products-actions">
						<Button theme="primary" className="fill-row" onClick={onAddProduct}>
							ADICIONAR MAIS
						</Button>
					</footer>
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterOrderProductsPage;
