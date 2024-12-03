import styled, { css } from "styled-components";
import { getUnitInPx, hexPercentage, shouldForwardProp } from "../../styles";

interface StyledChipProps {
	active?: boolean;
	colorScheme?: "primary" | "secondary";
}

const Chip = styled.div.withConfig({
	shouldForwardProp,
})<StyledChipProps>`
	padding: 12px 16px;
	color: ${({ theme }) => theme.text.placeholder};
	background: ${({ theme }) => theme.colors.gray100};
	border-radius: 10px;
	font-size: 14px;
	font-weight: 600;
	width: fit-content;
	line-height: 15px;
	height: fit-content;
	white-space: nowrap;

	transition: ${({ theme }) => theme.styles.transition};

	&:hover {
		cursor: pointer;
		scale: $scale-1;
	}

	${({ colorScheme, active, theme }) =>
		colorScheme === "primary" &&
		`
		&:hover {
			background: ${theme.colors.primary + hexPercentage[60]}
		}

		${
			active &&
			`
			background: ${theme.colors.primary};
			color: ${theme.text.white};
		`
		}
	`}

	${({ colorScheme, active, theme }) =>
		colorScheme === "secondary" &&
		`
		&:hover {
			background: ${theme.colors.secondary + hexPercentage[60]}
		}

		${
			active &&
			`
			background: ${theme.colors.secondary};
			color: ${theme.text.white};
		`
		}
	`}

	 @media (max-width: 768px) {
		padding: 10px 14px;
		font-size: 14px;
		font-weight: 500;
		border-radius: 10px;
	}
`;

const ChipContainer = styled.div.withConfig({ shouldForwardProp })<{
	isScrollable?: boolean;
}>`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${getUnitInPx(2)};

	${({ isScrollable }) =>
		isScrollable &&
		`
		overflow-x: auto;
		white-space: nowrap;

		&::-webkit-scrollbar {
			display: none;
		}
	`}
`;

const ChipWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	gap: ${getUnitInPx(2)};
	position: relative;
`;

const ChipWrapperArrow = css`
	min-width: 32px;
	min-height: 32px;
	background: none;
	border: none;
	border-radius: ${getUnitInPx(1)};
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: ${({ theme }) => theme.colors.gray100};
		cursor: pointer;
		scale: ${({ theme }) => theme.styles.scale};
	}

	&:disabled {
		opacity: 0.5 !important;
		color: ${({ theme }) => theme.colors.gray300};
		scale: 1 !important;
		background: transparent !important;
		cursor: not-allowed !important;
	}
`;

const ChipWrapperArrowRight = styled.button`
	${ChipWrapperArrow}

	position: sticky;
	right: 0;
`;

const ChipWrapperArrowLeft = styled.button`
	${ChipWrapperArrow}

	position: sticky;
	z-index: 2;
	left: 0;
`;

export default {
	Chip,
	ChipContainer,
	ChipWrapper,
	ChipWrapperArrowRight,
	ChipWrapperArrowLeft,
};
