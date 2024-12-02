import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const Container = styled.div`
	width: 100vw;
	height: 100vh;

	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
	align-items: center;
	justify-content: center;

	transition: ${({ theme }) => theme.styles.transition};

	@media (max-width: 768px) {
		padding: ${getUnitInPx(4)};
		width: 100%;
		height: 100%;
		padding-top: 160px;
		align-items: flex-start;
		justify-content: flex-start;
	}
`;

const Content = styled.div`
	width: 420px;
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};

	@media (max-width: 768px) {
		min-width: 240px;
		width: 100%;
		padding: 0;
		border: none;
		box-shadow: none;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(3)};
	width: 100%;
`;

const Title = styled.h2`
	font-size: 16px;
	font-weight: 500;
	color: ${({ theme }) => theme.text.placeholder};
`;

export default { Container, Content, Form, Title };
