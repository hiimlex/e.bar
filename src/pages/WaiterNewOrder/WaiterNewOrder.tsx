import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Slash } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ITable, Pages } from "../../@types";
import { TablesService, WaiterOrdersService } from "../../api";
import { Button, Input, MainContainer } from "../../components";
import { OnOrderActions, RootState } from "../../store";
import "./styles.scss";

interface WaiterNewOrderPageProps {}

const WaiterNewOrderPage: React.FC<WaiterNewOrderPageProps> = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const { t } = useTranslation();
	const { waiter } = useSelector((state: RootState) => state.user);
	const waiterStore = useMemo(
		() =>
			typeof waiter?.store === "string" ? waiter.store : waiter?.store?._id,
		[waiter]
	);
	const [tables, setTables] = useState<ITable[]>([]);
	const [selectedTable, setSelectedTable] = useState<string | null>(null);
	const [customers, setCustomers] = useState<number | null>(null);

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

	const onSelectTable = (tableId: string) => {
		setSelectedTable(tableId);
	};

	const createOrder = async () => {
		try {
			if (selectedTable === null || customers === null) {
				return;
			}

			setLoading(true);

			const { data } = await WaiterOrdersService.create(
				selectedTable,
				customers
			);

			if (data) {
				dispatch(OnOrderActions.setOrder(data));
				const to = Pages.WaiterOrder.replace(
					":orderId",
					data._id.toString()
				);
				navigate(to);
			}

			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const loadAvailableTables = useCallback(async () => {
		try {
			const { data } = await TablesService.fetchAvailable({
				is_enabled: true,
				in_use: false,
				store_id: waiterStore,
			});

			setTables(data.content);
		} catch (error) {
			console.log("Error loading tables", error);
		}
	}, []);

	useEffect(() => {
		loadAvailableTables();
	}, []);

	return (
		<MainContainer wrapperRef={wrapperRef} showGoBack onGoBack={goBack}>
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
										const isSelected = selectedTable === table._id;
										return (
											<div
												role="button"
												onClick={() => onSelectTable(table._id)}
												className={`card card-gray ${
													isSelected ? " card-selected" : ""
												}`}
												key={index}
											>
												<div className="flex-row-text">
													<span className="tables-info-number">
														Mesa {table.number}
													</span>
													<div
														className={`chip-status chip-status-${
															isSelected ? "secondary" : "primary"
														}`}
													>
														{table.in_use ? "OCUPADA" : "Livre"}
													</div>
												</div>
												<span className="table-info-bartender">
													{table.in_use ? `Garçom ${table.in_use}` : "---"}
												</span>
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
								inputMode="decimal"
								onChangeValue={(value) => {
									setCustomers(+value);
								}}
								value={customers?.toString() || ""}
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
