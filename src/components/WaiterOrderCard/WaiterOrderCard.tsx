import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IOrder } from "../../@types";
import { ChipStatus, ChipStatusProps } from "../ChipStatus";

import { Box } from "leux";
import { Styled } from "../../styles";
import S from "./WaiterOrderCard.styles";

type WaiterOrderCardProps = {
	onClick?: (order: IOrder) => void;
	order: IOrder;
};

const WaiterOrderCard: React.FC<WaiterOrderCardProps> = ({
	onClick,
	order,
}) => {
	const { t } = useTranslation();
	const tableNumber = useMemo(
		() => typeof order.table !== "string" && order.table.number,
		[order.table]
	);

	const orderStatusChip: {
		colorScheme: ChipStatusProps["colorScheme"];
		variant: ChipStatusProps["variant"];
	} = useMemo(() => {
		if (order?.status === "FINISHED") {
			return { colorScheme: "success", variant: "outlined" };
		}

		if (order?.status === "CANCELED") {
			return { colorScheme: "danger", variant: "filled" };
		}

		if (order?.status === "DELIVERED") {
			return { colorScheme: "warning", variant: "filled" };
		}

		return { colorScheme: "secondary", variant: "filled" };
	}, [order?.status]);

	return (
		<S.Card>
			<Box flex flexDirection="row" customClass="gap-2">
				<ChipStatus size="small" colorScheme="primary">
					{t("WaiterHome.Labels.TableNumber", { number: tableNumber || "" })}
				</ChipStatus>
				<ChipStatus
					size="small"
					colorScheme={orderStatusChip.colorScheme}
					variant={orderStatusChip.variant}
				>
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
			{order.status !== "CANCELED" && (
				<Styled.Typography.Link
					role="button"
					textColored="primary"
					className="self-center"
					onClick={() => onClick && onClick(order)}
				>
					{t("WaiterHome.Buttons.SeeOrder")}
				</Styled.Typography.Link>
			)}
		</S.Card>
	);
};

export default WaiterOrderCard;
