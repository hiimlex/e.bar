import { FC } from "react";
import { IPaymentItem } from "../../@types";

import { Box } from "leux";
import { Edit2, Paperclip, Trash } from "react-feather";
import { useTranslation } from "react-i18next";
import { colors, Styled } from "../../styles";
import S from "./OrderPaymentItem.styles";

type Props = {
	paymentItem: IPaymentItem;
	onEdit?: () => void;
	onDelete?: () => void;
	showActions?: boolean;
};

const OrderPaymentItem: FC<Props> = ({
	paymentItem,
	onDelete,
	onEdit,
	showActions,
}) => {
	const { t } = useTranslation();

	return (
		<S.Card>
			<Box
				flex
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
			>
				<Styled.Typography.Button>
					<S.PrimaryText>
						{t(`Generics.PaymentMethods.${paymentItem.method}`)}
					</S.PrimaryText>
				</Styled.Typography.Button>

				{showActions && (
					<S.Actions>
						{(paymentItem.method === "pix" ||
							paymentItem.method === "credit-card") && (
							<S.Attachment>
								<Paperclip size={12} />
								{t("WaiterOrderPayment.Labels.Attachment")}
							</S.Attachment>
						)}
						<S.ActionButton onClick={onEdit}>
							<Edit2 size={16} color={colors.primary} />
						</S.ActionButton>
						<S.ActionButton onClick={onDelete}>
							<Trash size={16} color={colors.danger} />
						</S.ActionButton>
					</S.Actions>
				)}
			</Box>

			{paymentItem.method === "pix" && (
				<Box
					flex
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Styled.Typography.Caption textColor="placeholder">
						{t("WaiterOrderPayment.Labels.Name")}
					</Styled.Typography.Caption>
					<Styled.Typography.Caption textColor="placeholder">
						{paymentItem.pix_name}
					</Styled.Typography.Caption>
				</Box>
			)}

			{paymentItem.method === "credit-card" && (
				<Box
					flex
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Styled.Typography.Caption textColor="placeholder">
						{t("WaiterOrderPayment.Labels.NF")}
					</Styled.Typography.Caption>
					<Styled.Typography.Caption textColor="placeholder">
						{paymentItem.nf_number}
					</Styled.Typography.Caption>
				</Box>
			)}

			<Box
				flex
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
			>
				<Styled.Typography.Button textColor="dark">
					{t("WaiterOrderPayment.Labels.TotalValue")}
				</Styled.Typography.Button>
				<Styled.Typography.Button textColor="dark">
					{"R$ "}
					{paymentItem.received_value}
				</Styled.Typography.Button>
			</Box>
		</S.Card>
	);
};

export default OrderPaymentItem;
