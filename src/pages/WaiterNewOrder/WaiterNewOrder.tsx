import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Slash } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ITable, NamespaceKeys, Pages } from "../../@types";
import { TablesService, WaiterOrdersService } from "../../api";
import { Button, Input, MainContainer } from "../../components";
import { OnOrderActions, RootState } from "../../store";
import { User } from "react-feather";
import "./styles.scss";
import { AxiosError } from "axios";
import { useToast } from "leux";

interface WaiterNewOrderPageProps {}

const WaiterNewOrderPage: React.FC<WaiterNewOrderPageProps> = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const { t } = useTranslation<NamespaceKeys>();
	const ToastService = useToast();
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
				const to = Pages.WaiterOrder.replace(":orderId", data._id.toString());
				navigate(to);
			}

			setLoading(false);
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				const { message } = error.response.data;

				if (message && typeof message === "string") {
					const translateMessage = t(`Errors.${message}`);

					ToastService.createToast({
						label: translateMessage,
						colorScheme: "danger",
					});
				}
			}

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
			if (error instanceof AxiosError && error.response) {
				const { message } = error.response.data;

				if (message && typeof message === "string") {
					const translateMessage = t(`Errors.${message}`);

					ToastService.createToast({
						label: translateMessage,
						colorScheme: "danger",
					});
				}
			}
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
						<span
							className="page-title"
							dangerouslySetInnerHTML={{ __html: t("WaiterNewOrder.Subtitle") }}
						></span>
					</header>
					<main className="new-order-main">
						<div className="new-order-tables">
							<span className="new-order-subtitle">
								{t("WaiterNewOrder.Labels.SelectTable")}
							</span>

							{tables.length === 0 && (
								<div className="new-order-no-tables">
									<Slash size={32} />
									<span>{t("Empty.NoAvailableTables")}</span>
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
														{t("WaiterNewOrder.TableCard.TableNumber", {
															number: table.number,
														})}
													</span>
													<div
														className={`chip-status chip-status-${
															isSelected ? "secondary" : "primary"
														}`}
													>
														{t(
															`Generics.TableStatus.${
																table.in_use ? "InUse" : "Free"
															}`
														)}
													</div>
												</div>
												<span className="table-info-bartender">
													{table.in_use
														? t(`WaiterNewOrder.TableCard.UserBy`, { name: "" })
														: "---"}
												</span>
											</div>
										);
									})}
								</div>
							)}
						</div>
						<div className="new-order-customers">
							<span className="new-order-subtitle">
								{t("WaiterNewOrder.Labels.ForHowMany")}
							</span>

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
								hasPrefix
								prefixContent={<User color="#9a36fd" size={20} />}
							/>
						</div>
					</main>
					<Button
						disabled={selectedTable === null || !customers}
						onClick={createOrder}
						loading={loading}
					>
						{t("Generics.Buttons.Continue")}
					</Button>
				</main>
			</div>
		</MainContainer>
	);
};

export { WaiterNewOrderPage };
