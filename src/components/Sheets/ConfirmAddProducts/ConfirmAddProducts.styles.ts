import styled from "styled-components";
import { getUnitInPx } from "../../../styles";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(3)};
	width: 100%;
	max-height: 100%;
	transition: ${({ theme }) => theme.styles.transition};
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	width: 100%;
	overflow-y: auto;
	max-height: 100%;
`;

const Footer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: ${getUnitInPx(3)};
`;

export default { Container, Footer, List };
