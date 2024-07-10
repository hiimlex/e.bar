import { useCallback, useEffect, useRef, useState } from "react";
import { Check, User } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { OrdersFilter, Pages } from "../../@types";
import { OrdersService } from "../../api";
import { Button, Icons, MainContainer } from "../../components";
import { OnOrderActions, RootState } from "../../store";
import "./styles.scss";

interface WaiterOrderPageProps {}

const WaiterOrderPage: React.FC<WaiterOrderPageProps> = () => {
	const { orderId } = useParams();

	const { order } = useSelector((state: RootState) => state.onOrder);
	const [filters] = useState<OrdersFilter>({
		order_id: +(orderId || 0),
	});

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

	const goToMarkAsServePage = () => {
		const to = Pages.WaiterOrderServe.replace(":orderId", orderId || "");

		navigate(to);
	};

	const getOrder = useCallback(async () => {
		try {
			const { data } = await OrdersService.fetchAll(filters);

			if (data) {
				dispatch(OnOrderActions.setOrder(data[0]));
			}

			if (!data) {
				navigate(Pages.WaiterHome);
			}
		} catch (error) {
			navigate(Pages.WaiterHome);
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
		<MainContainer wrapperRef={wrapperRef} showGoBack onGoBack={goBack}>
			<div className="w-on-order">
				<main className="w-on-order-content">
					<header className={`w-on-order-header`}>
						<div className="flex flex-row gap-2">
							<span className="w-on-order-table chip-status chip-status-primary">
								Mesa {order?.table_id}
							</span>

							<span className="w-on-order-table chip-status chip-status-primary flex flex-row gap-2">
								<User size={20} />
								{order?.customers || 0}
							</span>
						</div>
						<div className="flex-row-text w-on-order-header-title">
							<span className="page-title">Pedido Nº {order?.id}</span>
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
						<div className="detailed-list-products-header">
							<span className="detailed-list-products-title">Produtos</span>
							<span className="detailed-list-products-title">Status</span>
							<span className="detailed-list-products-title">Preço</span>
						</div>
						{order?.products.map((op, index) => (
							<div
								key={index}
								className={`detailed-list-products-item ${
									op.status === "delivered" ? "text-slash" : ""
								}`}
							>
								<span className="detailed-list-products-name">
									({op.status === "delivered" ? op.delivered : op.quantity}x){" "}
									{op.name}
								</span>
								<span className="detailed-list-products-name">
									{op.status === "delivered" ? "Servido" : "Pendente"}
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
					<Button
						className="fill-row"
						theme="secondary"
						onClick={goToMarkAsServePage}
						disabled={order?.products.length === 0}
					>
						<Check size={20} /> Marcar como servido
					</Button>
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
