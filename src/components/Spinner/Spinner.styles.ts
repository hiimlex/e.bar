import styled from "styled-components";
import { CustomThemeColors, shouldForwardProp } from "../../styles";

const Spinner = styled.div.withConfig({ shouldForwardProp })<{
	colorScheme: CustomThemeColors;
	size?: number;
}>`
	${({ theme, colorScheme }) => `
		svg {
			stroke: ${theme.colors[colorScheme]}
		}
	`}

	${({ size }) => `
		width: ${size}px;
		height: ${size}px;
	`}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	svg {
		animation: spin 1s linear infinite;
	}
`;

export default {
	Spinner,
};
