import { useState } from "react";
import "./styles.scss";
interface SalesWaitersOrder {
	id: number | string;
}

const SalesWaitersOrder: React.FC<SalesWaitersOrder> = ({ id }) => {
	const [expand, setExpand] = useState(false);

	return (
		<div className="sl-order">
			<div className="sl-order-status">
				<span className="chip-status chip-status-primary">Mesa {id}</span>
				<span className="chip-status chip-status-success-outlined">Entregue</span>
			</div>
			<span className="sl-order-id">Pedido N° {id}</span>

			{expand && (
				<>
					<div className="details">
						{Array.from({ length: 3 }).map((_, index) => (
							<div key={index} className="details-grid">
								<span className="details-grid-stock">1x</span>
								<span className="details-grid-name">Carne</span>
								<span className="text-currency details-grid-price">
									<span>R$</span>
									<span>{"10000"}</span>
								</span>
							</div>
						))}
					</div>
				</>
			)}

			{expand && <div className="dashline" />}

			<div className="sl-order-group">
				<div
					className={`${
						expand ? "sl-order-grid" : "sl-order-row"
					} sl-order-total`}
				>
					<span>Total</span>
					<div className="text-currency">
						<span>R$</span>
						<span>120</span>
					</div>
				</div>

				{expand && (
					<div className="sl-order-grid sl-order-payment-method">
						<span className="sl-order-payment-method-label">Forma de pagamento</span>
						<span className="sl-order-payment-method-value">PIX</span>
					</div>
				)}
			</div>

			<span className="sl-order-expand">
				<button onClick={() => setExpand((curr) => !curr)}>
					{expand ? "reduzir" : "expandir"}
				</button>
			</span>
		</div>
	);
};

export { SalesWaitersOrder };
