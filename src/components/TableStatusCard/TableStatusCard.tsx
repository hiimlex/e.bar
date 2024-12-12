import { intervalToDuration } from "date-fns";
import { Box } from "leux";
import { FC, useEffect, useMemo, useState } from "react";
import { IOrder } from "../../@types";
import { colors, Styled } from "../../styles";
import S from "./TableStatusCard.styles";
import { Hash, User } from "react-feather";
import { useTranslation } from "react-i18next";

type Props = {
	active?: boolean;
	order?: IOrder;
	table_number: number;
};

const TableStatusCard: FC<Props> = ({ active, order, table_number }) => {
	const { t } = useTranslation();
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		setInterval(() => {
			setCounter((curr) => curr + 1);
		}, 1000);
	}, []);

	const today = useMemo(() => new Date(), [counter]);
	const duration = useMemo(
		() =>
			intervalToDuration({
				start: new Date(order?.created_at),
				end: today,
			}),
		[today]
	);

	const padStartString = (value: number) => value.toString().padStart(2, "0");

	const durationText = useMemo(() => {
		if (duration.minutes === undefined || duration.seconds === undefined) {
			return "00:00:00";
		}

		return `${padStartString(duration.hours || 0)}:${padStartString(
			duration.minutes
		)}:${padStartString(duration.seconds)}`;
	}, [duration]);

	return (
		<S.TableItem active={active}>
			<Box flex width="100%" alignItems="center" justifyContent="flex-end">
				<Styled.Typography.Subtitle>{padStartString(table_number)}</Styled.Typography.Subtitle>
			</Box>
			{active ? (
				<>
					{order?.created_at && (
						<Styled.Typography.Caption textColor="gray300">
							{durationText}
						</Styled.Typography.Caption>
					)}
				</>
			) : (
				<Styled.Typography.Caption></Styled.Typography.Caption>
			)}

			{!active && (
				<S.CenteredText>
				<Styled.Typography.BodyBold textColor="gray300">
					{t("WaiterTables.Card.Labels.Free")}
				</Styled.Typography.BodyBold>
				</S.CenteredText>
			)}
			<Box flex width="100%" alignItems="center" justifyContent="space-between">
				{order?.customers && (
					<Box flex alignItems="center" customClass="gap-1">
						<User size={16} color={colors.primary} />
						<Styled.Typography.BodyBold>
							{order?.customers}
						</Styled.Typography.BodyBold>
					</Box>
				)}

				{order?.customers && (
					<Box flex alignItems="center" customClass="gap-1">
						<Hash size={16} color={colors.primary} />
						<Styled.Typography.BodyBold>
							{order?.number}
						</Styled.Typography.BodyBold>
					</Box>
				)}
			</Box>
		</S.TableItem>
	);
};

export default TableStatusCard;
