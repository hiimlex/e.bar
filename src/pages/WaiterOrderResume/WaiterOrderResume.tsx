import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChipStatus, MainContainer, OrderPaymentItem } from "../../components";

import { AxiosError } from "axios";
import { Box, useToast } from "leux";
import { useTranslation } from "react-i18next";
import { IOrder } from "../../@types";
import { WaiterOrdersService } from "../../api";
import { Styled } from "../../styles";
import { LoaderPage } from "../LoaderPage";
import S from "./WaiterOrderResume.styles";
import { User } from "react-feather";

const WaiterOrderResumePage: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const ToastService = useToast();
	const [loading, setLoading] = useState(false);
	const [order, setOrder] = useState<IOrder | null>(null);

	const orderId = useParams().orderId || "";

	const getOrder = async () => {
		setLoading(true);
		try {
			const { data } = await WaiterOrdersService.getById(orderId);

			setOrder(data);
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

	useEffect(() => {
		getOrder();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const tableNumber = useMemo(
		() => (typeof order?.table !== "string" ? order?.table.number : "---"),
		[order?.table]
	);
	const waiterName = useMemo(
		() =>
			typeof order?.requested_by !== "string"
				? order?.requested_by.name
				: "---",
		[order?.requested_by]
	);

	if (loading || !order) {
		return <LoaderPage />;
	}

	return (
		<MainContainer showMenu={false} showGoBack onGoBack={() => navigate(-1)}>
			<S.Container>
				<Box flex flexDirection="column" customClass="gap-1">
					<Styled.Typography.Title
						dangerouslySetInnerHTML={{
							__html: t("WaiterOrderResume.Title", { number: order.number }),
						}}
					/>
					<Styled.Typography.Caption textColor="gray300">
						{t("WaiterOrderResume.Labels.Waiter", { name: waiterName })}
					</Styled.Typography.Caption>
				</Box>

				<Box flex flexDirection="row" alignItems="center" customClass="gap-2">
					<ChipStatus colorScheme="primary">
						{t(`WaiterOrder.Labels.TableNumber`, { number: tableNumber })}
					</ChipStatus>

					<ChipStatus
						colorScheme="primary"
						className="flex items-center flex-row gap-2"
					>
						<User size={16} />
						{order?.customers || 0}
					</ChipStatus>
				</Box>

				<Styled.Typography.BodyBold>
					{t("WaiterOrderResume.Labels.Details")}
				</Styled.Typography.BodyBold>

				<S.List>
					<S.ListHeader>
						<Styled.Typography.Button>
							{t("WaiterOrder.Table.Headers.Products")}
						</Styled.Typography.Button>
						<Styled.Typography.Button>
							{t("WaiterOrder.Table.Headers.Status")}
						</Styled.Typography.Button>
						<Styled.Typography.Button>
							{t("WaiterOrder.Table.Headers.Price")}
						</Styled.Typography.Button>
					</S.ListHeader>

					{order?.items.map((op, index) => (
						<S.ListItem key={index} textSlashed={op.status === "DELIVERED"}>
							<Styled.Typography.Caption>
								({op.quantity}x){" "}
								{typeof op.product !== "string" ? op.product.name : "---"}
							</Styled.Typography.Caption>
							<Styled.Typography.Caption>
								{op.status === "DELIVERED" ? "Servido" : "Pendente"}
							</Styled.Typography.Caption>
							<Styled.Typography.Caption>
								{op.total}
							</Styled.Typography.Caption>
						</S.ListItem>
					))}
				</S.List>

				<Box
					flex
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Styled.Typography.Button>
						{t("WaiterOrder.Labels.Total")}
					</Styled.Typography.Button>
					<Styled.Typography.Button>
						R$ {order?.total}
					</Styled.Typography.Button>
				</Box>

				<Styled.DashLine />

				<Styled.Typography.BodyBold>
					{t("WaiterOrderResume.Labels.Payments")}
				</Styled.Typography.BodyBold>

				{typeof order.payment !== "string" && (
					<Box flex flexDirection="column" customClass="gap-2">
						{order.payment.items.map((paymentItem, index) => (
							<OrderPaymentItem
								paymentItem={paymentItem}
								key={index}
								showActions={false}
							/>
						))}
					</Box>
				)}
			</S.Container>
		</MainContainer>
	);
};

export default WaiterOrderResumePage;
