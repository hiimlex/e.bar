import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Pages } from "../../@types";
import { OrdersService } from "../../api";
import { Icons, MainContainer } from "../../components";
import { OnOrderActions, RootState } from "../../store";
import "./styles.scss";

interface WaiterOrderPageProps {}

const WaiterOrderPage: React.FC<WaiterOrderPageProps> = () => {
	const { orderId } = useParams();

	const { order } = useSelector((state: RootState) => state.onOrder);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

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

	const seeAllOrder = () => {
		const to = Pages.WaiterOrderProducts.replace(":orderId", orderId || "");

		navigate(to);
	};

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			showGoBack
			onGoBack={goBack}
		>
			<div className="w-on-order">
				<main className="w-on-order-content">
					<header className={`w-on-order-header`}>
						<div className="flex-row-text">
							<span className="w-on-order-table chip-status chip-status-primary">
								Mesa {order?.table_id}
							</span>
						</div>
						<div className="flex-row-text w-on-order-header-title">
							<span className="page-title">Pedido Nº {"1"}</span>
							<span
								role="button"
								className="link link-secondary"
								onClick={seeAllOrder}
							>
								ver produtos
							</span>
						</div>
					</header>
					<div className="detailed-list">
						<div className="detailed-list-products">
							<div className="detailed-list-products-header">
								<span className="detailed-list-products-title">Produtos</span>
								<span className="detailed-list-products-title">Preço</span>
							</div>
							{order?.products.map((op, index) => (
								<div key={index} className="detailed-list-products-item">
									<span className="detailed-list-products-name">
										({op.quantity}x) {op.name}
									</span>
									<span className="detailed-list-products-price">
										<span>{op.price}</span>
									</span>
								</div>
							))}
						</div>
						<div className="dashline"></div>
						<div className="flex-row-text detailed-list-total">
							<span>Total</span>
							<div className="text-currency">
								<span>R$</span>
								<span>{order?.total}</span>
							</div>
						</div>
					</div>
					<footer className="w-on-order-footer">
						<button className="large-button large-button-secondary">
							<Icons.PaymentSVG fill="#fff" />
							<span>Pagamento</span>
						</button>
						<button className="large-button large-button-primary">
							<Icons.SendSVG fill="#fff	" />
							<span>Enviar</span>
						</button>
					</footer>
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterOrderPage;
