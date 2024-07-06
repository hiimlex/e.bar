import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Pages } from "../../@types";
import { Icons, MainContainer } from "../../components";
import { AppDispatch, RootState } from "../../store";
import "./styles.scss";

interface WaiterOrderPageProps {}

const WaiterOrderPage: React.FC<WaiterOrderPageProps> = () => {
	const { orderId } = useParams();
	const { waiter } = useSelector((state: RootState) => state.user);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

	const seeAllOrder = () => {
		const to = Pages.WaiterOrderProducts.replace(":orderId", orderId || "");

		navigate(to);
	};

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			waiterHeaderGoBack
			waiterHeaderOnBack={goBack}
		>
			<div className="w-on-order">
				<main className="w-on-order-content">
					<header className={`w-on-order-header`}>
						<div className="flex-row-text">
							<span className="w-on-order-name">Garçom - {waiter?.name}</span>
							<span className="w-on-order-table chip-status chip-status-primary">
								Mesa {"1"}
							</span>
						</div>
						<div className="flex-row-text w-on-order-header-title">
							<span className="page-title">Pedido Nº {"1"}</span>
							<span
								role="button"
								className="link link-secondary"
								onClick={seeAllOrder}
							>
								ver todos
							</span>
						</div>
					</header>
					<div className="detailed-list">
						<div className="detailed-list-products">
							{Array.from({ length: 12 }).map((_, index) => (
								<div key={index} className="detailed-list-products-item">
									<span className="detailed-list-products-stock">1x</span>
									<span className="detailed-list-products-name">Água</span>
									<span className="detailed-list-products-price text-currency">
										<span>R$</span>
										<span>100</span>
									</span>
								</div>
							))}
						</div>
						<div className="dashline"></div>
						<div className="flex-row-text detailed-list-total">
							<span>Total</span>
							<div className="text-currency">
								<span>R$</span>
								<span>100</span>
							</div>
						</div>
					</div>
					<footer className="w-on-order-footer">
						<button className="large-button large-button-secondary">
							<Icons.PaymentSVG fill="#fff" />
							<span>Pagamento</span>
						</button>
						<button className="large-button large-button-primary">
							<Icons.SendSVG fill="#414141" />
							<span>Enviar</span>
						</button>
					</footer>
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterOrderPage;
