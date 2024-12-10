import styled from "styled-components";
import { getUnitInPx, hexPercentage } from "../../styles";

const Card = styled.div`
	display: flex;
	flex-direction: column;

	background: ${({ theme }) => theme.colors.primary + hexPercentage[20]};
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.colors.primary};
	padding: ${getUnitInPx(2)};
	gap: ${getUnitInPx(1)};
`;

const PrimaryText = styled.span`
	color: ${({ theme }) => theme.colors.primary};
`;

const Actions = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: ${getUnitInPx(2)};
`;

const Attachment = styled.div`
	font-size: 12px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.primary};

	display: flex;
	gap: ${getUnitInPx(1)};
	align-items: center;
	justify-content: center;

	cursor: pointer;

	&:hover {
		scale: ${({ theme }) => theme.styles.scale};
	}
`;

const ActionButton = styled.button`
	border: none;
	outline: none;
	width: fit-content;
	height: fit-content;
	padding: 2px;

	&:hover,
	&:active {
		scale: ${({ theme }) => theme.styles.scale};
	}
`;

export default {
	Card,
	PrimaryText,
	Actions,
	Attachment,
	ActionButton
};
