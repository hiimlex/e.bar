import { AxiosError } from "axios";
import { Box, useToast } from "leux";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	ICreatePaymentItem,
	IPaymentForm,
	IPaymentItem,
	Pages,
	TPaymentMethods,
} from "../../@types";
import { PaymentsService, WaiterOrdersService } from "../../api";
import {
	BottomSheet,
	Button,
	MainContainer,
	OrderPaymentItem,
	Sheets,
} from "../../components";
import { OnOrderActions, RootState } from "../../store";

import { Styled } from "../../styles";
import S from "./WaiterOrderPayment.styles";

const WaiterOrderPaymentPage: React.FC = () => {
	const { orderId } = useParams();
	const { t } = useTranslation();

	const [showAddPayment, setShowAddPayment] = useState(false);
	const [finishing, setFinishing] = useState(false);
	const [selectedPaymentItem, setSelectedPaymentItem] = useState<
		IPaymentItem | undefined
	>(undefined);
	const [showPixQR, setShowPixQR] = useState(false);

	const ToastService = useToast();
	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { order } = useSelector((state: RootState) => state.onOrder);

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

	const onAddPayment = async (
		formData: IPaymentForm,
		method: TPaymentMethods,
		paymentItemId?: string
	) => {
		try {
			if (!order) {
				return;
			}

			const new_items: ICreatePaymentItem[] = [
				{
					method,
					received_value: +formData.received_value,
					nf_number: formData.nf_number,
					pix_name: formData.pix_name,
				},
			];
			// first time creating a payment
			if (!order.payment) {
				await PaymentsService.create({
					order_id: order?._id,
					items: new_items,
				});
			}

			// if it's updating
			if (order.payment && typeof order.payment !== "string") {
				const paymentId = order.payment._id;
				let items: ICreatePaymentItem[] = [];
				// if it's updating a payment item
				if (paymentItemId) {
					items = order.payment.items.map((item) => {
						if (item._id === paymentItemId) {
							return {
								method,
								received_value: +formData.received_value,
								nf_number: formData.nf_number,
								pix_name: formData.pix_name,
							};
						}

						return item;
					});
				}
				// proceed to normal update
				if (!paymentItemId) {
					items = [...order.payment.items, ...new_items];
				}

				await PaymentsService.update(paymentId, {
					items,
				});
			}

			getOrder();
			closeAddPaymentSheet();
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				const { message } = error.response.data;

				if (message && typeof message === "string") {
					const translateMessage = t(`Errors.${message}`);

					ToastService.createToast({
						label: translateMessage,
						colorScheme: "danger",
						duration: 3000,
					});
				}
			}
		}
	};

	const onRemovePaymentItem = async (removePaymentItemId: string) => {
		try {
			if (!order || !order.payment) {
				return;
			}

			if (typeof order?.payment === "string") {
				return;
			}

			const items = order?.payment.items.filter(
				(item) => item._id !== removePaymentItemId
			);

			await PaymentsService.update(order.payment._id, {
				items,
			});

			getOrder();
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				const { message } = error.response.data;

				if (message && typeof message === "string") {
					const translateMessage = t(`Errors.${message}`);

					ToastService.createToast({
						label: translateMessage,
						colorScheme: "danger",
						duration: 3000,
					});
				}
			}
		}
	};

	const onFinish = async () => {
		try {
			if (!order) return;

			setFinishing(true);

			const paymentId =
				typeof order.payment === "string" ? order.payment : order.payment._id;

			await PaymentsService.finish(paymentId);

			ToastService.createToast({
				label: t("WaiterOrderPayment.Messages.Finished"),
				colorScheme: "success",
			});

			getOrder();

			navigate(-1);

			setFinishing(false);
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				const { message } = error.response.data;

				if (message && typeof message === "string") {
					const translateMessage = t(`Errors.${message}`);

					ToastService.createToast({
						label: translateMessage,
						colorScheme: "danger",
						duration: 3000,
					});
				}
			}

			setFinishing(false);
		}
	};

	const openAddPaymentSheet = () => {
		setShowAddPayment(true);
	};

	const closeAddPaymentSheet = () => {
		setShowAddPayment(false);
	};

	const selectToEdit = (payment_item: IPaymentItem) => {
		setSelectedPaymentItem(payment_item);
		openAddPaymentSheet();
	};

	useEffect(() => {
		getOrder();
	}, []);

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			showGoBack
			onGoBack={goBack}
			showMenu={false}
		>
			<S.Wrapper>
				<S.Header className="w-op-header">
					<Styled.Typography.Title
						dangerouslySetInnerHTML={{
							__html: t("WaiterOrderPayment.Title"),
						}}
					></Styled.Typography.Title>
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
							<S.ClickableIcon onClick={() => setShowPixQR(true)}>
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

					{order?.payment && typeof order?.payment !== "string" && (
						<>
							{order.payment.remaining > 0 && (
								<S.AddPaymentButton onClick={openAddPaymentSheet}>
									{t("WaiterOrderPayment.Buttons.AddPayment")}
								</S.AddPaymentButton>
							)}
							<S.PaymentList>
								{order.payment.items.map((payment_item, index) => (
									<OrderPaymentItem
										paymentItem={payment_item}
										key={index}
										onEdit={() => selectToEdit(payment_item)}
										onDelete={() => onRemovePaymentItem(payment_item._id)}
										showActions={order.status !== "FINISHED"}
									/>
								))}
							</S.PaymentList>
						</>
					)}
				</S.Container>

				{order?.payment &&
					typeof order.payment !== "string" &&
					order.status !== "FINISHED" && (
						<S.Footer className="w-op-actions">
							<Box
								flex
								flexDirection="row"
								alignItems="center"
								justifyContent="space-between"
							>
								<Styled.Typography.Body>
									{t("WaiterOrderPayment.Labels.ReceivedValue")}
								</Styled.Typography.Body>
								<Styled.Typography.BodyBold textColor="success">
									R$ {order.payment.amount}
								</Styled.Typography.BodyBold>
							</Box>
							{order.payment.remaining > 0 && (
								<Box
									flex
									flexDirection="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Styled.Typography.Body>
										{t("WaiterOrderPayment.Labels.Remaining")}
									</Styled.Typography.Body>
									<Styled.Typography.BodyBold textColor="danger">
										R$ {order.payment.remaining}
									</Styled.Typography.BodyBold>
								</Box>
							)}
							<Button
								disabled={order.payment.remaining > 0}
								className="fill-row"
								theme="secondary"
								loading={finishing}
								onClick={onFinish}
							>
								{t("WaiterOrderPayment.Buttons.Finish")}
							</Button>
						</S.Footer>
					)}
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
						payment_data={selectedPaymentItem}
						payment_item_id={selectedPaymentItem?._id}
						initial_method={selectedPaymentItem?.method}
					/>
				</BottomSheet>
			)}
			{showPixQR && (
				<BottomSheet
					title="WaiterOrderPayment.Modals.PixQR.Title"
					closeOnBackdropClick
					onClose={() => setShowPixQR(false)}
				>
					<Sheets.PixQR />
				</BottomSheet>
			)}
		</MainContainer>
	);
};

export default WaiterOrderPaymentPage;
