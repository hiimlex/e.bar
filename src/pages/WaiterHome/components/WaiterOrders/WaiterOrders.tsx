import "./styles.scss";
interface WaiterOrders {
	id: number | string;
	onClick?: () => void;
}

const WaiterOrders: React.FC<WaiterOrders> = ({ id, onClick }) => {
	return (
		<div className="w-order">
			<div className="w-order-status">
				<span className="chip-status chip-status-primary">Mesa {id}</span>
				<span className="chip-status chip-status-success-outlined">
					Entregue
				</span>
			</div>

			<div className="w-order-row">
				<span className="w-order-id">Pedido N° {id}</span>

				<div className="w-order-total text-currency">
					<span>R$</span>
					<span>1200</span>
				</div>
			</div>
			<div className="flex-center">
				<button className="link link-secondary" onClick={onClick} role="button">
					ver mais
				</button>
			</div>
		</div>
	);
};

export { WaiterOrders };
