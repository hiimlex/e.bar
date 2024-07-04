import { useState } from "react";
import { Chip, MainContainer } from "../../components";
import { SalesOrders, SalesWaiters } from "./components";
import "./styles.scss";

interface SalesPageProps {}

type SalesModeType = "orders" | "waiters";

const SalesPage: React.FC<SalesPageProps> = () => {
	const [mode, setMode] = useState<SalesModeType>("orders");

	const handleModeChange = (mode: SalesModeType) => {
		setMode(mode);
	};

	return (
		<MainContainer showAdminHeader>
			<div className="sales">
				<header className="sales-header">
					<h2 className="page-title">
						Relatório de <br />
						Vendas
					</h2>
				</header>

				<div className="sales-tabs">
					<Chip
						onClick={() => handleModeChange("orders")}
						active={mode === "orders"}
						clickable
						theme="primary"
					>
						Pedidos
					</Chip>
					<Chip
						clickable
						theme="primary"
						onClick={() => handleModeChange("waiters")}
						active={mode === "waiters"}
					>
						Garçons
					</Chip>
				</div>

				<div className="sales-tab-content">
					{mode === "orders" && <SalesOrders />}
					{mode === "waiters" && <SalesWaiters />}
				</div>
			</div>
		</MainContainer>
	);
};

export default SalesPage;
