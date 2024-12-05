import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const Container = styled.article`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
	width: 100%;
	height: 100%;
`;

const Content = styled.main`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(3)};
	width: 100%;
	height: 100%;
`;

const Header = styled.header``;

const Filters = styled.section``;

const Footer = styled.footer``;

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
	height: 100%;
	overflow-y: auto;
	max-height: 100%;
`;

export default {
	Container,
	Content,
	Filters,
	Footer,
	Header,
	List
};
