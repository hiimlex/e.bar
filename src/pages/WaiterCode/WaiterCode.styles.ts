import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
	align-items: center;
	justify-content: center;
	transition: ${({ theme }) => theme.styles.transition};

	@media (max-width: 768px) {
		padding: 24px;
		width: 100%;
		height: 100%;
		padding-top: 160px;
		align-items: flex-start;
		justify-content: flex-start;
	}
`;

const Content = styled.div`
	width: 420px;
	border-radius: ${getUnitInPx(4)};
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
	padding: ${getUnitInPx(4)};

	@media (max-width: 768px) {
		width: 100%;
		padding: 0;
	}
`;

const Title = styled.h2`
	font-size: 16px;
	font-weight: 500;
	color: ${({ theme }) => theme.text.placeholder};
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(3)};
	width: 100%;
`;

export default {
	Container,
	Content,
	Title,
	Form,
};
