import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import { useTranslation } from "react-i18next";
import { TOrderBy } from "../../@types";
import "./styles.scss";

interface OrderByProps {
	label: string;
	onOrderChange?: (order: TOrderBy) => void;
	reset?: boolean;
}

const OrderBy: React.FC<OrderByProps> = ({ label, onOrderChange, reset }) => {
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

	useEffect(() => {
		if (!!reset && reset) {
			setOrder("");
		}
	}, [reset]);

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
