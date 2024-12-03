import { AxiosError } from "axios";
import { Box, useToast } from "leux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Slash, User } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ITable, NamespaceKeys, Pages } from "../../@types";
import { TablesService, WaiterOrdersService } from "../../api";
import { Button, ChipStatus, Input, MainContainer } from "../../components";
import { OnOrderActions, RootState } from "../../store";

import { getUnitInPx, Styled } from "../../styles";
import S from "./WaiterNewOrder.styles";

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
			<S.Wrapper>
				<S.Container>
					<S.Header>
						<Styled.Typography.Title
							textColor="darker"
							dangerouslySetInnerHTML={{ __html: t("WaiterNewOrder.Subtitle") }}
						></Styled.Typography.Title>
					</S.Header>
					<S.Content>
						<S.Tables>
							<Styled.Typography.Body textColor="dark">
								{t("WaiterNewOrder.Labels.SelectTable")}
							</Styled.Typography.Body>

							{tables.length === 0 && (
								<Styled.Empty>
									<Slash size={32} />
									<Styled.Typography.Caption textColor="dark">
										{t("Empty.NoAvailableTables")}
									</Styled.Typography.Caption>
								</Styled.Empty>
							)}

							{tables.length > 0 && (
								<S.TablesList className="no-scroll">
									{tables.map((table, index) => {
										const isSelected = selectedTable === table._id;
										return (
											<S.TableCard
												onClick={() => onSelectTable(table._id)}
												isSelected={isSelected}
												key={index}
												isGray
											>
												<Box
													flex
													flexDirection="row"
													justifyContent="space-between"
													alignItems="center"
												>
													<Styled.Typography.Subtitle>
														{t("WaiterNewOrder.TableCard.TableNumber", {
															number: table.number,
														})}
													</Styled.Typography.Subtitle>
													<ChipStatus
														colorScheme={isSelected ? "secondary" : "primary"}
													>
														{t(
															`Generics.TableStatus.${
																table.in_use ? "InUse" : "Free"
															}`
														)}
													</ChipStatus>
												</Box>
												<Styled.Typography.Body>
													{table.in_use
														? t(`WaiterNewOrder.TableCard.UserBy`, { name: "" })
														: "---"}
												</Styled.Typography.Body>
											</S.TableCard>
										);
									})}
								</S.TablesList>
							)}
						</S.Tables>
						<Box flex flexDirection="column" flexGap={getUnitInPx(2)}>
							<Styled.Typography.Body>
								{t("WaiterNewOrder.Labels.ForHowMany")}
							</Styled.Typography.Body>

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
						</Box>
					</S.Content>
					<Button
						disabled={selectedTable === null || !customers}
						onClick={createOrder}
						loading={loading}
					>
						{t("Generics.Buttons.Continue")}
					</Button>
				</S.Container>
			</S.Wrapper>
		</MainContainer>
	);
};

export { WaiterNewOrderPage };
