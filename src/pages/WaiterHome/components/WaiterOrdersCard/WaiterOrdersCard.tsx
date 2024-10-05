import { useMemo } from "react";
import { IOrder } from "../../../../@types";
import "./styles.scss";
import { useTranslation } from "react-i18next";
interface WaiterOrdersCardProps {
	onClick?: (order: IOrder) => void;
	order: IOrder;
}

const WaiterOrdersCard: React.FC<WaiterOrdersCardProps> = ({
	onClick,
	order,
}) => {
	const { t } = useTranslation();
	const tableNumber = useMemo(
		() => typeof order.table !== "string" && order.table.number,
		[order.table]
	);

	return (
		<div className="w-order">
			<div className="w-order-status">
				<span className="chip-status chip-status-primary">
					{t("WaiterHome.Labels.TableNumber", { number: tableNumber || "" })}
				</span>
				<span className="chip-status chip-status-success-outlined">
					{t(`Generics.OrderStatus.${order.status}`)}
				</span>
			</div>

			<div className="w-order-row">
				<span className="w-order-id">
					{t("WaiterHome.Labels.OrderNumber", { number: order.number })}
				</span>

				<div className="w-order-total text-currency">
					<span>R$</span>
					<span>{order.total}</span>
				</div>
			</div>
			<div className="flex-center">
				<button
					className="link link-primary"
					onClick={() => onClick && onClick(order)}
					role="button"
				>
					{t("WaiterHome.Buttons.SeeOrder")}
				</button>
			</div>
		</div>
	);
};

export { WaiterOrdersCard };
