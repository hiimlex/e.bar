import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { TOrderBy } from "../../@types";

interface OrderByProps {
	label: string;
	onOrderChange?: (order: TOrderBy) => void;
}


const OrderBy: React.FC<OrderByProps> = ({ label, onOrderChange }) => {
	const { t } = useTranslation();
	const [order, setOrder] = useState<TOrderBy>("");

	const handleOrderChange = () => {
		let newOrder: TOrderBy = "";

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
			<span className="order-by-label">{t(label)}</span>
			{order === "asc" && (
				<ArrowUp className="icon" strokeWidth={2} size={20} />
			)}
			{order === "desc" && (
				<ArrowDown className="icon" strokeWidth={2} size={20} />
			)}
		</div>
	);
};

export { OrderBy };
