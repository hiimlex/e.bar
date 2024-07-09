import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Pages } from "../../@types";
import { OrdersService } from "../../api";
import { Button, MainContainer } from "../../components";
import { OnOrderActions, RootState } from "../../store";
import { ProductsRowCard } from "../WaiterProducts/components";
import "./styles.scss";

interface WaiterOrderProductsPageProps {}

const WaiterOrderProductsPage: React.FC<WaiterOrderProductsPageProps> = () => {
	const { orderId } = useParams();
	const { order } = useSelector((state: RootState) => state.onOrder);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();

	const goBack = () => {
		const to = Pages.WaiterOrder.replace(":orderId", orderId || "");

		navigate(to);
	};

	const goToAddProducts = () => {
		const to = Pages.WaiterAddProducts.replace(":orderId", orderId || "");

		navigate(to);
	};

	const dispatch = useDispatch();

	const getOrder = useCallback(async () => {
		if (order) {
			return;
		}

		try {
			const { data } = await OrdersService.fetchAll();

			if (data) {
				dispatch(OnOrderActions.setOrder(data[0]));
			}
		} catch (error) {
			console.log("Error loading order", error);
		}
	}, []);

	useEffect(() => {
		getOrder();
	}, []);

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
						{order &&
							order?.products.map((op, index) => (
								<ProductsRowCard
									product={{
										id: op.product_id,
										...op,
										stock: op.quantity,
									}}
									key={index}
									showAdd
								/>
							))}
					</div>

					<div className="w-o-products-total">
						<span>Total</span>
						<div className="text-currency">
							<span>R$</span>
							<span>100</span>
						</div>
					</div>

					<footer className="w-o-products-actions">
						<Button
							theme="primary"
							className="fill-row"
							onClick={goToAddProducts}
						>
							Ver Cardápio
						</Button>
					</footer>
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterOrderProductsPage;
