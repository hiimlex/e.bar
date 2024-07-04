import { Check } from "react-feather";
import { Button } from "../../../../components";
import "./styles.scss";

interface OrderCardProps {}

const OrderCard: React.FC<OrderCardProps> = () => {
	return (
		<article className="order-card">
			<header className="order-card-header">
				<span className="order-card-title">{"Garcon - Mateus"}</span>
				<div className="chip-status chip-status-primary">{"Mesa 1"}</div>
			</header>
			<main className="info">
				<h4 className="info-order-id">{"Pedido N° 1"}</h4>

				<div className="info-items">
					{Array.from({ length: 3 }).map((_, index) => (
						<div key={index} className="info-items-grid">
							<span className="info-items-stock">1x</span>
							<span className="info-items-name">Carne</span>
							<span className="text-currency info-items-price">
								<span>R$</span>
								<span>{"10000"}</span>
							</span>
						</div>
					))}

					<div className="dashline" />

					<div className="info-items-total">
						<span className="info-items-total-label">Total</span>
						<span className="text-currency">
							<span className="">R$</span>
							<span className="info-items-total-value">{"10000"}</span>
						</span>
					</div>
					<div className="info-items-payment-method">
						<span className="info-items-payment-method-label">
							Forma de Pagamento
						</span>
						<span className="info-items-payment-method-value">{"PIX"}</span>
					</div>
				</div>
			</main>
			<footer className="order-card-footer">
				<div className="order-card-confirmed">
					<Check className="icon" />
					<span>Pedido Entregue</span>
				</div>
				{/* <Button className="fill-row">
					CONFIRMAR
				</Button> */}
			</footer>
		</article>
	);
};

export { OrderCard };
