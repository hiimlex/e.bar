import { useMemo, useState } from "react";
import { ArrowUp, ArrowDown, Filter } from "react-feather";
import "./styles.scss";

interface OrderByProps {
	label: string;
	onOrderChange?: (order: OrderByType) => void;
}

export type OrderByType = "asc" | "desc" | "";

const OrderBy: React.FC<OrderByProps> = ({ label, onOrderChange }) => {
	const [order, setOrder] = useState<OrderByType>("");

	const handleOrderChange = () => {
		let newOrder: OrderByType = "";

		if (order === "") {
			newOrder = "asc";
		}

		if (order === "desc") {
			newOrder = "";
		}

		if (order === "asc") {
			newOrder = "desc";
		}

		setOrder(newOrder);
		onOrderChange?.(newOrder);
	};

	const isActive = useMemo(() => order !== "", [order]);

	return (
		<div
			role="button"
			onClick={handleOrderChange}
			className={`order-by ${isActive ? "order-by-active" : ""}`}
		>
			<span className="order-by-label">{label}</span>
			{order === "asc" && <ArrowUp strokeWidth={2} size={20} />}
			{order === "desc" && (
				<ArrowDown strokeWidth={2} size={20} />
			)}
			{order === "" && <Filter strokeWidth={2} size={20} />}
		</div>
	);
};

export { OrderBy };
