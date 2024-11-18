import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IOrder, TOrderStatus } from "../../../../@types";
import "./styles.scss";
interface SalesWaitersOrder {
	order: IOrder;
}

const SalesWaitersOrder: React.FC<SalesWaitersOrder> = ({ order }) => {
	const { t } = useTranslation();
	const [expand, setExpand] = useState(false);

	const getStatusColor: Record<TOrderStatus, string> = {
		CANCELED: "chip-status-danger",
		DELIVERED: "chip-status-secondary",
		FINISHED: "chip-status-success",
		PENDING: "chip-status-warning",
	};

	return (
		<div className="sl-order">
			<div className="sl-order-status">
				{typeof order.table !== "string" && (
					<span className="chip-status chip-status-primary">
						{t("WaiterMyOrders.Card.TableNumber", {
							number: order.table.number,
						})}
					</span>
				)}
				<span className={`chip-status ${getStatusColor[order.status]}`}>
					{t(`Generics.OrderStatus.${order.status}`)}
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
						{order.items.map((order_product, index) => (
							<div key={index} className="s-details-grid">
								{typeof order_product.product !== "string" && (
									<>
										<span className="s-details-grid-name">
											({order_product.quantity}x) {order_product.product.name}
										</span>
										<span className="s-details-grid-name">
											{t(`Generics.OrderStatus.${order_product.status}`)}
										</span>
										<span className="text-currency s-details-grid-price">
											<span>R$</span>
											<span>{order_product.product.price}</span>
										</span>
									</>
								)}
							</div>
						))}
					</div>

					<div className="dashline" />

					<div className="sl-order-group">
						<div className="sl-order-row sl-order-total">
							<span>Total</span>
							<span>R$ {order.total}</span>
						</div>

						{expand && typeof order.payment !== "string" && (
							<div className="sl-order-grid sl-order-payment-method">
								<span className="sl-order-payment-method-label">
									Forma de pagamento
								</span>
								<span className="sl-order-payment-method-value">
									{t(`Generics.PaymentMethods.${order.payment.method}`)}
								</span>
							</div>
						)}
					</div>
				</>
			)}

			<span className="flex justify-center">
				<button
					className="link link-primary"
					onClick={() => setExpand((curr) => !curr)}
				>
					{expand
						? t("WaiterMyOrders.Card.Reduce")
						: t("WaiterMyOrders.Card.Expand")}
				</button>
			</span>
		</div>
	);
};

export { SalesWaitersOrder };
