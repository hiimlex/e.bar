import { IOrder, StatusToLabel } from "../../../../@types";
import "./styles.scss";
interface WaiterOrdersCardProps {
	onClick?: (order: IOrder) => void;
	order: IOrder;
}

const WaiterOrdersCard: React.FC<WaiterOrdersCardProps> = ({
	onClick,
	order,
}) => {
	return (
		<div className="w-order">
			<div className="w-order-status">
				<span className="chip-status chip-status-primary">
					Mesa {order?.table_id}
				</span>
				<span className="chip-status chip-status-success-outlined">
					{StatusToLabel[order.status]}
				</span>
			</div>

			<div className="w-order-row">
				<span className="w-order-id">Comanda N° {order.id}</span>

				<div className="w-order-total text-currency">
					<span>R$</span>
					<span>{order.total}</span>
				</div>
			</div>
			<div className="flex-center">
				<button
					className="link link-secondary"
					onClick={() => onClick && onClick(order)}
					role="button"
				>
					ver mais
				</button>
			</div>
		</div>
	);
};

export { WaiterOrdersCard };
