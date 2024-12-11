import { formatDuration, intervalToDuration } from "date-fns";
import { Box } from "leux";
import { FC } from "react";
import { IOrder } from "../../@types";
import { Styled } from "../../styles";
import S from "./TableStatusCard.styles";

type Props = {
	active?: boolean;
	order?: IOrder;
	table_number: number;
};

const TableStatusCard: FC<Props> = ({ active, order, table_number }) => {
	return (
		<S.TableItem active={active}>
			<Box flex alignItems="center" justifyContent="flex-end">
				<Styled.Typography.Subtitle>{table_number}</Styled.Typography.Subtitle>
			</Box>
			{active ? (
				<>
					{order?.created_at && (
						<Styled.Typography.Caption>
							{formatDuration(
								intervalToDuration({
									start: new Date(order?.created_at),
									end: new Date(),
								})
							)}
						</Styled.Typography.Caption>
					)}
				</>
			) : (
				<Styled.Typography.Caption></Styled.Typography.Caption>
			)}
		</S.TableItem>
	);
};

export default TableStatusCard;
