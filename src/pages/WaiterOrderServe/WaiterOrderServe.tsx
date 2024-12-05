import { AxiosError } from "axios";
import { Box, Checkbox, useToast } from "leux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IOrderProduct, Pages, UpdateOrderProductPayload } from "../../@types";
import { WaiterOrdersService } from "../../api";
import { Button, ChipStatus, MainContainer } from "../../components";
import { OnOrderActions, RootState } from "../../store";
import { LoaderPage } from "../LoaderPage";

import { Styled } from "../../styles";
import S from "./WaiterOrderServe.styles";

interface WaiterOrderServePageProps {}

const WaiterOrderServePage: React.FC<WaiterOrderServePageProps> = () => {
	const { orderId } = useParams();
	const { t } = useTranslation();
	const ToastService = useToast();

	const { order } = useSelector((state: RootState) => state.onOrder);

	const tableNumber = useMemo(
		() => (typeof order?.table !== "string" ? order?.table.number : "---"),
		[order?.table]
	);

	const [loading, setLoading] = useState(false);
	const [toServe, setToServe] = useState<Set<string>>(new Set());

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goBack = () => {
		const to = Pages.WaiterOrder.replace(":orderId", orderId || "");

		navigate(to);
	};

	const addToServe = (orderProduct: IOrderProduct) => {
		const toServeCopy = new Set(toServe);
		if (!toServeCopy.has(orderProduct._id)) {
			toServeCopy.add(orderProduct._id);
		} else {
			toServeCopy.delete(orderProduct._id);
		}
		setToServe(toServeCopy);
	};

	const markAsServe = async () => {
		if (!orderId) {
			return;
		}

		try {
			setLoading(true);

			const arr: UpdateOrderProductPayload[] = [];
			toServe.forEach((id) => {
				arr.push({ order_product_id: id, status: "DELIVERED" });
			});

			await WaiterOrdersService.update_order_products(orderId, arr);

			goBack();

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

	const getOrder = useCallback(async () => {
		try {
			if (!orderId) {
				return;
			}

			const { data } = await WaiterOrdersService.getById(orderId, {
				order_product_status: "PENDING",
			});

			if (data) {
				dispatch(OnOrderActions.setOrder(data));
			} else {
				navigate(Pages.WaiterHome);
			}
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

			navigate(Pages.WaiterHome);
		}
	}, []);

	useEffect(() => {
		getOrder();
	}, []);

	if (!order) {
		return <LoaderPage />;
	}

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			showMenu={false}
			showGoBack
			onGoBack={goBack}
		>
			<S.Container>
				<S.Content>
					<Box flex flexDirection="row" customClass="gap-2">
						<ChipStatus colorScheme="secondary" className="w-serve-order-table">
							{t(`WaiterOrder.Labels.OrderNumber`, { number: order?.number })}
						</ChipStatus>
						<ChipStatus colorScheme="primary" className="w-serve-order-table">
							{t(`WaiterOrder.Labels.TableNumber`, { number: tableNumber })}
						</ChipStatus>
					</Box>
					<Styled.Typography.Title
						className="page-title"
						dangerouslySetInnerHTML={{
							__html: t("WaiterOrder.MarkAsDelivered.Title"),
						}}
					></Styled.Typography.Title>

					<S.List>
						<S.ListItem className="detailed-list-products-header">
							<span></span>
							<Styled.Typography.Button textColor="placeholder">
								{t("WaiterOrder.Table.Headers.Products")}
							</Styled.Typography.Button>
							<Styled.Typography.Button textColor="placeholder">
								{t("WaiterOrder.Table.Headers.Price")}
							</Styled.Typography.Button>
						</S.ListItem>
						<Styled.DashLine />
						{order?.items.map(
							(op, index) =>
								op.status === "PENDING" && (
									<S.ListItem key={index} onClick={() => addToServe(op)}>
										<Checkbox
											fieldKey={
												typeof op.product !== "string" ? op.product._id : "---"
											}
											checkBoxProps={{ checked: toServe.has(op._id) }}
										/>
										<S.ListText textSlashed={toServe.has(op._id)}>
											({op.quantity}x){" "}
											{typeof op.product !== "string" ? op.product.name : "---"}
										</S.ListText>
										<S.ListText textSlashed={toServe.has(op._id)}>
											<span>{op.total}</span>
										</S.ListText>
									</S.ListItem>
								)
						)}
					</S.List>

					<S.Footer className="w-serve-order-footer">
						<Button
							className="fill-row"
							theme="secondary"
							variant="outlined"
							onClick={goBack}
						>
							{t("Generics.Buttons.Cancel")}
						</Button>
						<Button
							onClick={markAsServe}
							disabled={toServe.size === 0}
							className="fill-row"
							theme="secondary"
							loading={loading}
						>
							{t("Generics.Buttons.Confirm")}
						</Button>
					</S.Footer>
				</S.Content>
			</S.Container>
		</MainContainer>
	);
};

export { WaiterOrderServePage };
