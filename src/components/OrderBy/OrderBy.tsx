import { useState } from "react";
import { ArrowUp, ArrowDown } from "react-feather";
import "./styles.scss";

interface OrderByProps {
	label: string;
	onOrderChange?: (order: OrderByType) => void;
}

type OrderByType = "asc" | "desc";

const OrderBy: React.FC<OrderByProps> = ({ label, onOrderChange }) => {
	const [order, setOrder] = useState<OrderByType>("asc");

	const handleOrderChange = () => {
		const newOrder = order === "asc" ? "desc" : "asc";
		setOrder(newOrder);
		onOrderChange?.(newOrder);
	};

	return (
		<div role="button" onClick={handleOrderChange} className="order-by">
			<span className="order-by-label">{label}</span>
			{order === "asc" && <ArrowUp strokeWidth={1} size={20} />}
			{order === "desc" && <ArrowDown strokeWidth={1} size={20} />}
		</div>
	);
};

export { OrderBy };
