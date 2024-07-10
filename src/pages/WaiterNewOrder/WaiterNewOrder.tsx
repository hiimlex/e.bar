import { useCallback, useEffect, useRef, useState } from "react";
import { Slash } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ITable, Pages } from "../../@types";
import { OrdersService, TablesService } from "../../api";
import { Button, Input, MainContainer } from "../../components";
import { OnOrderActions } from "../../store";
import "./styles.scss";

interface WaiterNewOrderPageProps {}

const WaiterNewOrderPage: React.FC<WaiterNewOrderPageProps> = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const [tables, setTables] = useState<ITable[]>([]);
	const [selectedTable, setSelectedTable] = useState<number | null>(null);
	const [customers, setCustomers] = useState<number | null>(null);

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

	const onSelectTable = (tableId: number) => {
		setSelectedTable(tableId);
	};

	const createOrder = async () => {
		try {
			if (selectedTable === null || customers === null) {
				return;
			}

			setLoading(true);

			const {
				data: { id: newOrderId },
			} = await OrdersService.create(selectedTable, customers);

			const {
				data: [order],
			} = await OrdersService.fetchAll({
				order_id: newOrderId,
			});

			if (order) {
				dispatch(OnOrderActions.setOrder(order));
				const to = Pages.WaiterOrder.replace(":orderId", order.id.toString());
				navigate(to);
			}

			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const loadAvailableTables = useCallback(async () => {
		try {
			const { data } = await TablesService.fetchAll({
				is_active: true,
				in_use: false,
			});

			setTables(data);
		} catch (error) {
			console.log("Error loading tables", error);
		}
	}, []);

	useEffect(() => {
		loadAvailableTables();
	}, []);

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			showGoBack
			onGoBack={goBack}
		>
			<div className="new-order">
				<main className="new-order-content">
					<header className={`w-products-header`}>
						<span className="page-title">
							Nova <br />
							Comanda
						</span>
					</header>
					<main className="new-order-main">
						<div className="new-order-tables">
							<span className="new-order-subtitle">Selecionar mesa</span>

							{tables.length === 0 && (
								<div className="new-order-no-tables">
									<Slash size={32} />
									<span>Nenhuma mesa disponível.</span>
								</div>
							)}

							{tables.length > 0 && (
								<div className="new-order-list no-scroll">
									{tables.map((table, index) => {
										const isSelected = selectedTable === table.id;
										return (
											<div
												role="button"
												onClick={() => onSelectTable(table.id)}
												className={`card card-gray ${
													isSelected ? " card-selected" : ""
												}`}
												key={index}
											>
												<div className="flex-row-text">
													<span className="tables-info-number">
														Mesa {table.id}
													</span>
													<div
														className={`chip-status chip-status-${
															isSelected ? "secondary" : "primary"
														}`}
													>
														{table.in_use ? "OCUPADA" : "Livre"}
													</div>
												</div>
												<span className="table-info-bartender">---</span>
											</div>
										);
									})}
								</div>
							)}
						</div>
						<div className="new-order-customers">
							<span className="new-order-subtitle">Para quantas pessoas ?</span>

							<Input
								placeholder="0"
								mode="controlled"
								type="number"
								onChangeValue={(value) => {
									setCustomers(+value);
								}}
								hideLabel
							/>
						</div>
					</main>
					<Button
						disabled={selectedTable === null || !customers}
						onClick={createOrder}
						loading={loading}
					>
						Continuar
					</Button>
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterNewOrderPage;
