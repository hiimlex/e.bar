import { Box } from "leux";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IOrder, Pages, TOrderStatus } from "../../@types";
import { Styled } from "../../styles";
import { ChipStatus, ChipStatusProps } from "../ChipStatus";
import S from "./WaiterDetailedOrder.styles";
import { useNavigate } from "react-router-dom";

type Props = {
	order: IOrder;
};

const WaiterDetailedOrder: FC<Props> = ({ order }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const onOpenMoreDetails = () => {
		navigate(Pages.WaiterOrderResume.replace(":orderId", order._id));
	};

	const getStatusColor: Record<TOrderStatus, ChipStatusProps["colorScheme"]> = {
		CANCELED: "danger",
		DELIVERED: "secondary",
		FINISHED: "success",
		PENDING: "warning",
	};

	return (
		<S.Card>
			<Box flex flexDirection="row" alignItems="center" customClass="gap-2">
				{typeof order.table !== "string" && (
					<ChipStatus size="small" colorScheme="primary">
						{t("WaiterMyOrders.Card.TableNumber", {
							number: order.table.number,
						})}
					</ChipStatus>
				)}
				<ChipStatus size="small" colorScheme={getStatusColor[order.status]}>
					{t(`Generics.OrderStatus.${order.status}`)}
				</ChipStatus>
			</Box>

			<Box
				flex
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
			>
				<Styled.Typography.Body className="w-order-id">
					{t("WaiterHome.Labels.OrderNumber", { number: order.number })}
				</Styled.Typography.Body>

				<Styled.Typography.BodyBold>
					R$ {order.total}
				</Styled.Typography.BodyBold>
			</Box>

			<Styled.Typography.Link
				textColored="primary"
				className="self-center"
				onClick={onOpenMoreDetails}
			>
				{t("WaiterMyOrders.Card.SeeMore")}
			</Styled.Typography.Link>
		</S.Card>
	);
};

export default WaiterDetailedOrder;
