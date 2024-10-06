import { useState } from "react";
import { IOrder } from "../../../../@types";
import "./styles.scss";
interface SalesWaitersOrder {
	order: IOrder;
}

const SalesWaitersOrder: React.FC<SalesWaitersOrder> = ({ order }) => {
	const [expand, setExpand] = useState(false);

	return (
		<div className="sl-order">
			<div className="sl-order-status">
				<span className="chip-status chip-status-primary">
					{/* Mesa {order.table_id} */}
				</span>
				<span className="chip-status chip-status-success-outlined">
					{/* {StatusToLabel[order.status]} */}
				</span>
			</div>
			<div className="flex flex-row justify-between">
				<span className="sl-order-id">Pedido N° {order.number}</span>
				<div className="sl-order-total">
					<span>R$ {order.total}</span>
				</div>
			</div>

			{expand && (
				<>
					<div className="s-details">
						{/* {order.products.map((order_product, index) => (
							<div key={index} className="s-details-grid">
								<span className="s-details-grid-stock">
									{order_product.quantity}x
								</span>
								<span className="s-details-grid-name">
									{order_product.name}
								</span>
								<span className="text-currency s-details-grid-price">
									<span>R$</span>
									<span>{order_product.price}</span>
								</span>
							</div>
						))} */}
					</div>

					<div className="dashline" />

					<div className="sl-order-group">
						<div className="sl-order-row sl-order-total">
							<span>Total</span>
							<span>R$ {order.total}</span>
						</div>

						{/* {expand && order.payment_method && (
							<div className="sl-order-grid sl-order-payment-method">
								<span className="sl-order-payment-method-label">
									Forma de pagamento
								</span>
								<span className="sl-order-payment-method-value">PIX</span>
							</div>
						)} */}
					</div>
				</>
			)}

			<span className="link link-primary">
				<button onClick={() => setExpand((curr) => !curr)}>
					{expand ? "reduzir" : "expandir"}
				</button>
			</span>
		</div>
	);
};

export { SalesWaitersOrder };
