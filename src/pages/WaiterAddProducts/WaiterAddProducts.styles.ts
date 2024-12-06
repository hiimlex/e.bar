import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const Container = styled.article`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

const Content = styled.main`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
	position: relative;
	width: 100%;
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

const ProductList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(120px, 200px));
	gap: ${getUnitInPx(3)};
	overflow-y: auto;
	padding-bottom: 76px;
	max-height: 100%;


`;

const FloatingFooter = styled.footer`
	position: fixed;
	z-index: 1;
	bottom: 0;
	left: 0;
	padding: ${getUnitInPx(6)} ${getUnitInPx(4)};
	padding-top: ${getUnitInPx(2)};
	background: #fff;
	border-top: 1px solid ${({ theme }) => theme.colors.gray100};
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default {
	Container,
	Content,
	Header,
	FloatingFooter,
	ProductList,
	Filters,
};
