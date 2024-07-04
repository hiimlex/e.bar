import "./styles.scss";

interface SalesOrdersProps {}

const SalesOrders: React.FC<SalesOrdersProps> = () => {
	return (
		<div className="sales-orders">
			<div className="sales-orders-group">
				<span className="sales-orders-subtitle">Atendimento</span>
				<div className="indicators">
					<div className="indicators-item">
						<h2 className="indicators-item-value">100</h2>
						<span className="indicators-item-label">Pedidos</span>
					</div>
					<div className="indicators-item">
						<h2 className="indicators-item-value">4</h2>
						<span className="indicators-item-label">Garçons</span>
					</div>
					<div className="indicators-item">
						<h2 className="indicators-item-value">12</h2>
						<span className="indicators-item-label">Mesas</span>
					</div>
				</div>
			</div>
			<div>
				<span className="sales-orders-subtitle">Geral</span>
				<div className="sales-orders-grid">
					<span className="sales-orders-grid-label">
						Valor Geral em Dinheiro
					</span>
					<div className="sales-orders-grid-value">
						<div className="sales-orders-grid-currency">
							<span>R$</span>
							<span>129</span>
						</div>
					</div>
				</div>
			</div>
			<div className="dashline" />
			<div>
				<span className="sales-orders-subtitle">Vendas</span>
				<div className="sales-orders-grid">
					<span className="sales-orders-grid-label">N° Pedidos</span>
					<span className="sales-orders-grid-value">115</span>
				</div>
				<div className="sales-orders-grid">
					<span className="sales-orders-grid-label">N° Pedidos Balcão</span>
					<span className="sales-orders-grid-value">5</span>
				</div>
				<div className="sales-orders-grid">
					<span className="sales-orders-grid-label">
						Valor total de pedidos
					</span>
					<div className="sales-orders-grid-value">
						<div className="sales-orders-grid-currency">
							<span>R$</span>
							<span>774,42</span>
						</div>
					</div>
				</div>
				<div className="sales-orders-grid">
					<span className="sales-orders-grid-label">Valor bruto</span>
					<div className="sales-orders-grid-value">
						<div className="sales-orders-grid-currency">
							<span>R$</span>
							<span>759,81</span>
						</div>
					</div>
				</div>
			</div>
			<div className="dashline" />
			<div>
				<span className="sales-orders-subtitle">
					Faturamento{" "}
					<span className="sales-orders-subtitle-tip">
						(10% do Valor Total de Vendas)
					</span>
				</span>
				<div className="sales-orders-grid">
					<span className="sales-orders-grid-label">Garçons</span>
					<div className="sales-orders-grid-value">
						<div className="sales-orders-grid-currency">
							<span>R$</span>
							<span>7,4</span>
						</div>
					</div>
				</div>
				<div className="sales-orders-grid">
					<span className="sales-orders-grid-label">Taxa da maquininha</span>
					<div className="sales-orders-grid-value">
						<div className="sales-orders-grid-currency">
							<span>R$</span>
							<span>12,2</span>
						</div>
					</div>
				</div>
				<div className="sales-orders-grid">
					<span className="sales-orders-grid-label">Balcão</span>
					<div className="sales-orders-grid-value">
						<div className="sales-orders-grid-currency">
							<span>R$</span>
							<span>12,4</span>
						</div>
					</div>
				</div>
				<div className="sales-orders-grid sales-orders-grid-total">
					<span className="sales-orders-grid-label">Total</span>
					<div className="sales-orders-grid-value">
						<div className="sales-orders-grid-currency">
							<span>R$</span>
							<span>120</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { SalesOrders };
