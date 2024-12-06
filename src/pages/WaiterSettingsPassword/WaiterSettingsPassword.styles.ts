import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const Container = styled.main`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
	width: 100%;
	height: 100%;
`;

const Header = styled.header`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(1)};
`;


const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(3)};
	height: 100%;
`

export default {
	Container,
	Header,
	Form
};
