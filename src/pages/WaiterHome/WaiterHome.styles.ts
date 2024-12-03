import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const Container = styled.main`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

const Content = styled.article`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
`;


const Section = styled.section`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
`;

const SectionHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: ${getUnitInPx(2)};
`;

const Grid = styled.div`
	display: flex;
	flex-direction: row;
	overflow-x: auto;
	gap: ${getUnitInPx(3)};
	scroll-behavior: smooth;
	padding: 4px;
	height: fit-content;
`;

const Filters = styled.div`
	display: flex;
	flex-direction: row;
	overflow-x: auto;
	gap: ${getUnitInPx(3)};
	scroll-behavior: smooth;
	padding: 4px;
	height: fit-content;
`;

const LoadingContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
	justify-content: center;
	align-items: center;
`;

const Empty = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
	justify-content: center;
	align-items: center;
	padding: ${getUnitInPx(2)};
	border-radius: ${getUnitInPx(2)};
	background: ${({ theme }) => theme.colors.gray100};

	font-size: 16px;
	font-weight: 500;
	color: ${({ theme }) => theme.text.placeholder};
`;

export default {
	Container,
	Content,
	Section,
	Grid,
	LoadingContainer,
	SectionHeader,
	Empty,
	Filters
};
