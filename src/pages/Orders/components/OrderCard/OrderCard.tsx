import { Check } from "react-feather";
import "./styles.scss";
import { IOrder } from "../../../../@types";

interface OrderCardProps {
	order: IOrder;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
	return (
		<article className="order-card">
			<header className="order-card-header">
				<div className="chip-status chip-status-primary">{`Mesa ${order.table_id}`}</div>
				<span className="order-card-title">{`Garcon - ${order.waiter_name}`}</span>
			</header>
			<main className="info">
				<h4 className="info-order-id">{`Pedido N° ${order.id}`}</h4>

				<div className="info-items">
					<div className="info-items-grid info-items-header">
						<span>Produto</span>
						<span>Status</span>
						<span className="info-items-price">Preço</span>
					</div>
					{order.products.map((product, index) => {
						const isDelivered = product.status === "delivered";
						const q = isDelivered ? product.delivered : product.quantity;

						return (
							<div
								key={index}
								className={`info-items-grid ${isDelivered && "text-slash"}`}
							>
								<span className="info-items-name">{`(${q}x) ${product.name}`}</span>
								<span className="info-items-name">
									{isDelivered ? "Servido" : "Pendente"}
								</span>
								<span className="info-items-price">
									<span>{product.price}</span>
								</span>
							</div>
						);
					})}
				</div>
				<div className="dashline" />
				<div className="info-items-total">
					<span className="info-items-total-label">Total</span>
					<span className="info-items-total-value">{`R$ ${order.total}`}</span>
				</div>
				{order.payment_method && (
					<div className="info-items-payment-method">
						<span className="info-items-payment-method-label">
							Forma de Pagamento
						</span>
						<span className="info-items-payment-method-value">{"PIX"}</span>
					</div>
				)}
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
