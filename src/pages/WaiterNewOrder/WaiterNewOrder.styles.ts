import styled from "styled-components";
import { getUnitInPx, Styled } from "../../styles";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;
const Container = styled.main`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
	height: 100%;
`;
const Header = styled.header`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
	height: 100%;
`;

const Tables = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${getUnitInPx(2)};
`;

const TableCard = styled(Styled.Card)<{
	isSelected?: boolean;
}>`
	min-width: 240px;
	padding: 18px;
	gap: 12px;
	cursor: pointer;
	transition: ${({ theme }) => theme.styles.transition};

	&:hover {
		background: ${({ theme }) => theme.colors.gray200};
	}

	${({ isSelected, theme }) =>
		isSelected &&
		`
		background: ${theme.colors.primary};
		* {
			color: ${theme.text.white};
		}
		&:hover {
			background: ${theme.colors.primary};
		}
	`}
`;

const TablesList = styled.div`
	display: flex;
	flex-direction: row;
	gap: ${getUnitInPx(3)};
	height: fit-content;
	padding: ${getUnitInPx(1)};

	overflow-x: auto;
	overflow-y: hidden;
	max-width: 100%;
`;

export default {
	Wrapper,
	Container,
	Header,
	Content,
	Tables,
	TableCard,
	TablesList,
};
