import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;
const Content = styled.main`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
	height: 100%;
`;
const Header = styled.header`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
`;
const Filters = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	gap: ${getUnitInPx(2)};
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(3)};
	max-height: 100%;
	overflow-y: auto;
	padding: ${getUnitInPx(1)};
`;

export default { Container, Content, Header, Filters, List };
