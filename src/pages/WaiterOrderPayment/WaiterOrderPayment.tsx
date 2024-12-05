import { AxiosError } from "axios";
import { Box, useToast } from "leux";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ICreatePayment, IPaymentForm, Pages } from "../../@types";
import { PaymentsService, WaiterOrdersService } from "../../api";
import { BottomSheet, Button, MainContainer, Sheets } from "../../components";
import { OnOrderActions, RootState } from "../../store";

import { Styled } from "../../styles";
import S from "./WaiterOrderPayment.styles";

const WaiterOrderPaymentPage: React.FC = () => {
	const { orderId } = useParams();
	const { t } = useTranslation();
	const [showAddPayment, setShowAddPayment] = useState(false);
	const ToastService = useToast();
	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { order } = useSelector((state: RootState) => state.onOrder);
	const { attendance } = useSelector((state: RootState) => state.user);

	const [loading, setLoading] = useState(false);

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

	const goBack = () => {
		const to = Pages.WaiterOrder.replace(":orderId", orderId || "");

		navigate(to);
	};

	const onAddPayment = (formData: IPaymentForm) => {
		console.log(formData);

		closeAddPaymentSheet();
	};

	// const onPay = async (data: IPaymentForm) => {
	// 	try {
	// 		if (!order || !attendance) {
	// 			return;
	// 		}

	// 		setLoading(true);

	// 		const { name, nf, receivedValue } = data;

	// 		const createPayment: ICreatePayment = {
	// 			method,
	// 			amount: order.total,
	// 			order_id: order._id,
	// 		};

	// 		if (method === "pix") {
	// 			createPayment.pix_config = {
	// 				name,
	// 			};
	// 		}

	// 		if (method === "credit-card") {
	// 			createPayment.credit_card_config = {
	// 				nf,
	// 			};
	// 		}

	// 		if (method === "cash") {
	// 			createPayment.cash_config = {
	// 				charge: chargeBack,
	// 				receivedValue,
	// 			};
	// 		}

	// 		await PaymentsService.create(createPayment);

	// 		setLoading(false);

	// 		navigate(Pages.WaiterOrder.replace(":orderId", order._id));
	// 	} catch (error) {
	// 		if (error instanceof AxiosError && error.response) {
	// 			const { message } = error.response.data;

	// 			if (message && typeof message === "string") {
	// 				const translateMessage = t(`Errors.${message}`);

	// 				ToastService.createToast({
	// 					label: translateMessage,
	// 					colorScheme: "danger",
	// 				});
	// 			}
	// 		}
	// 	}
	// };

	const openAddPaymentSheet = () => {
		setShowAddPayment(true);
	};

	const closeAddPaymentSheet = () => {
		setShowAddPayment(false);
	};

	useEffect(() => {
		getOrder();
	}, []);

	return (
		<MainContainer wrapperRef={wrapperRef} showGoBack onGoBack={goBack} showMenu={false}>
			<S.Wrapper>
				<S.Header className="w-op-header">
					<span
						className="page-title"
						dangerouslySetInnerHTML={{
							__html: t("WaiterOrderPayment.Title"),
						}}
					></span>
				</S.Header>
				<S.Container>
					<S.ContainerHeader>
						<Box
							flex
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between"
						>
							<Styled.Typography.Subtitle2 className="w-op-order">
								{t("WaiterOrderPayment.Labels.Payment")}
							</Styled.Typography.Subtitle2>
							<S.ClickableIcon>
								<img src="/src/assets/qr_code.svg"></img>
							</S.ClickableIcon>
						</Box>
						<Box
							flex
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between"
						>
							<Styled.Typography.BodyBold textColor="dark">
								{t("WaiterOrderPayment.Labels.Total")}
							</Styled.Typography.BodyBold>
							<Styled.Typography.BodyBold textColor="dark">
								R$ {order?.total || 0}
							</Styled.Typography.BodyBold>
						</Box>
						<Box
							flex
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between"
						>
							<Styled.Typography.BodyBold textColor="dark">
								{t("WaiterOrderPayment.Labels.ValuePerPerson")}
							</Styled.Typography.BodyBold>
							<Styled.Typography.BodyBold textColor="dark">
								R$ {(order?.total || 0) / (order?.customers || 1)}
							</Styled.Typography.BodyBold>
						</Box>
					</S.ContainerHeader>

					<S.AddPaymentButton onClick={openAddPaymentSheet}>
						{t("WaiterOrderPayment.Buttons.AddPayment")}
					</S.AddPaymentButton>
				</S.Container>
				<S.Footer className="w-op-actions">
					<Button className="fill-row" theme="secondary">
						{t("WaiterOrderPayment.Buttons.Finish")}
					</Button>
				</S.Footer>
			</S.Wrapper>
			{showAddPayment && order && (
				<BottomSheet
					title="WaiterOrderPayment.Modals.AddPayment.Title"
					onClose={closeAddPaymentSheet}
					closeOnBackdropClick
				>
					<Sheets.AddPaymentBottomSheet
						order={order}
						onAddPayment={onAddPayment}
					/>
				</BottomSheet>
			)}
		</MainContainer>
	);
};

export default WaiterOrderPaymentPage;
