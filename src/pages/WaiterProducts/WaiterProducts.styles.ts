import styled from "styled-components";
import { getUnitInPx } from "../../styles";
import { animated } from "@react-spring/web";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
`;

const Content = styled.main`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
`;

const Header = styled.header`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
`;

const Filters = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(3)};
`;

const ChipsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${getUnitInPx(3)};
	overflow-x: auto;
`;

const List = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(120px, 150px));
	gap: ${getUnitInPx(3)};
	overflow-y: auto;
	padding-bottom: 76px;
	max-height: 100%;
`;

export default { Container, Content, Header, List, Filters, ChipsWrapper };
