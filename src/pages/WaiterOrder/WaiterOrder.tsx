import { AxiosError } from "axios";
import { Box, useToast } from "leux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, User, X } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Pages } from "../../@types";
import { WaiterOrdersService } from "../../api";
import {
	BottomSheet,
	Button,
	ChipStatus,
	ChipStatusProps,
	Icons,
	MainContainer,
} from "../../components";
import { OnOrderActions, RootState } from "../../store";
import { getUnitInPx, Styled } from "../../styles";

import S from "./WaiterOrder.styles";

interface WaiterOrderPageProps {}

const WaiterOrderPage: React.FC<WaiterOrderPageProps> = () => {
	const { orderId } = useParams();
	const { t } = useTranslation();
	const ToastService = useToast();
	const { order } = useSelector((state: RootState) => state.onOrder);
	const [showCancelOrder, setShowCancelOrder] = useState(false);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

	const goToMarkAsServePage = () => {
		const to = Pages.WaiterOrderServe.replace(":orderId", orderId || "");

		navigate(to);
	};

	const getOrder = useCallback(async () => {
		try {
			if (!orderId) {
				navigate(Pages.WaiterHome);

				return;
			}

			const { data } = await WaiterOrdersService.getById(orderId);

			if (data) {
				dispatch(OnOrderActions.setOrder(data));
			}

			if (!data) {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const seeOrderProducts = () => {
		const to = Pages.WaiterOrderProducts.replace(":orderId", orderId || "");

		navigate(to);
	};

	const tableNumber = useMemo(
		() => (typeof order?.table !== "string" ? order?.table.number : "---"),
		[order?.table]
	);

	const goToPayment = () => {
		const to = Pages.WaiterOrderPayment.replace(":orderId", orderId || "");

		navigate(to);
	};

	const orderStatusChip: {
		colorScheme: ChipStatusProps["colorScheme"];
		variant: ChipStatusProps["variant"];
	} = useMemo(() => {
		if (order?.status === "FINISHED") {
			return { colorScheme: "success", variant: "outlined" };
		}

		return { colorScheme: "secondary", variant: "filled" };
	}, [order?.status]);

	const onCancelOrder = () => {};

	useEffect(() => {
		getOrder();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getOrder]);

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			showGoBack
			onGoBack={goBack}
			showMenu={false}
		>
			<S.Wrapper>
				<S.Container>
					<S.Header>
						<Box flex flexDirection="row" customClass="gap-2">
							<ChipStatus className="w-on-order-chip" colorScheme="primary">
								{t(`WaiterOrder.Labels.TableNumber`, { number: tableNumber })}
							</ChipStatus>

							<ChipStatus
								colorScheme="primary"
								className="w-on-order-chip flex items-center flex-row gap-2"
							>
								<User size={16} />
								{order?.customers || 0}
							</ChipStatus>

							{order?.status && (
								<ChipStatus
									className="w-on-order-chip"
									variant={orderStatusChip.variant}
									colorScheme={orderStatusChip.colorScheme}
								>
									{t(`Generics.OrderStatus.${order?.status}`)}
								</ChipStatus>
							)}
						</Box>
						<Box
							flex
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between"
						>
							<Styled.Typography.Subtitle>
								{t("WaiterOrder.Labels.OrderNumber", { number: order?.number })}
							</Styled.Typography.Subtitle>
							<Styled.Typography.Link
								textColored="secondary"
								onClick={seeOrderProducts}
								disabled={order?.status === "FINISHED"}
							>
								{t("WaiterOrder.Buttons.SeeProducts")}
							</Styled.Typography.Link>
						</Box>
					</S.Header>
					<S.List>
						<S.ListHeader className="detailed-list-products-header">
							<Styled.Typography.Caption fontWeight={500}>
								{t("WaiterOrder.Table.Headers.Products")}
							</Styled.Typography.Caption>
							<Styled.Typography.Caption fontWeight={500}>
								{t("WaiterOrder.Table.Headers.Status")}
							</Styled.Typography.Caption>
							<Styled.Typography.Caption fontWeight={500}>
								{t("WaiterOrder.Table.Headers.Price")}
							</Styled.Typography.Caption>
						</S.ListHeader>
						{order?.items.map((op, index) => (
							<S.ListItem key={index} textSlashed={op.status === "DELIVERED"}>
								<Styled.Typography.Caption fontWeight={600}>
									({op.quantity}x){" "}
									{typeof op.product !== "string" ? op.product.name : "---"}
								</Styled.Typography.Caption>
								<Styled.Typography.Caption fontWeight={600}>
									{op.status === "DELIVERED" ? "Servido" : "Pendente"}
								</Styled.Typography.Caption>
								<Styled.Typography.Caption fontWeight={600}>
									{op.total}
								</Styled.Typography.Caption>
							</S.ListItem>
						))}
					</S.List>
					<Styled.DashLine />
					<Box
						flex
						flexDirection="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Styled.Typography.Subtitle2>
							{t("WaiterOrder.Labels.Total")}
						</Styled.Typography.Subtitle2>
						<Styled.Typography.Currency>
							<Styled.Typography.Subtitle2>
								{t("Generics.Currency.Symbol")}
							</Styled.Typography.Subtitle2>
							<Styled.Typography.Subtitle2>
								{order?.total}
							</Styled.Typography.Subtitle2>
						</Styled.Typography.Currency>
					</Box>
					<Button
						className="fill-row"
						theme="secondary"
						onClick={goToMarkAsServePage}
						disabled={
							order?.status === "FINISHED" ||
							order?.status === "DELIVERED" ||
							order?.items.length === 0
						}
					>
						<Check size={20} /> {t("WaiterOrder.Buttons.MarkAsDelivered")}
					</Button>
					<S.Footer>
						<S.LargeButton
							colorScheme="danger"
							fitSize
							onClick={() => setShowCancelOrder(true)}
						>
							<X size={32} />
							<span>{t("WaiterOrder.Buttons.Cancel")}</span>
						</S.LargeButton>

						{!order?.payment && (
							<S.LargeButton
								colorScheme="secondary"
								onClick={goToPayment}
								disabled={order?.status !== "DELIVERED"}
							>
								<Icons.PaymentSVG fill="#fff" />
								<span>{t("WaiterOrder.Buttons.Payment")}</span>
							</S.LargeButton>
						)}

						{order?.payment && typeof order.payment !== "string" && (
							<S.LargeButton colorScheme="secondary">
								<img src={`/src/assets/${order.payment.method}.svg`}></img>
								<span>{t(`WaiterOrder.Buttons.${order.payment.method}`)}</span>
							</S.LargeButton>
						)}
					</S.Footer>
				</S.Container>

				{showCancelOrder && (
					<BottomSheet title={t("WaiterOrder.Cancel.Title")}>
						<Box flex flexDirection="column" flexGap={getUnitInPx(3)}>
							<Styled.Typography.BodyBold textColor="dark">
								{t("WaiterOrder.Cancel.Body")}
							</Styled.Typography.BodyBold>
							<Box
								flex
								flexDirection="row"
								flexGap={getUnitInPx(3)}
								alignItems="center"
								justifyContent="space-between"
							>
								<Button
									theme="default"
									className="fill-row"
									onClick={() => setShowCancelOrder(false)}
								>
									{t("WaiterOrder.Cancel.Buttons.No")}
								</Button>
								<Button theme="danger" className="fill-row">
									{t("WaiterOrder.Cancel.Buttons.Yes")}
								</Button>
							</Box>
						</Box>
					</BottomSheet>
				)}
			</S.Wrapper>
		</MainContainer>
	);
};

export { WaiterOrderPage };
