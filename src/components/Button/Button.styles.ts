import styled, { css, RuleSet } from "styled-components";
import { ButtonThemes } from "../../@types";
import { ButtonSizes, ButtonVariants } from "../../@types/button.model";
import { getUnitInPx, hexPercentage, shouldForwardProp } from "../../styles";

interface StyledButtonProps {
	colorScheme?: ButtonThemes;
	variant?: ButtonVariants;
	size?: ButtonSizes;
	loading?: boolean;
}

const Button = styled.button.withConfig({
	shouldForwardProp,
})<StyledButtonProps>`
	font-size: 14px;
	font-weight: 600;
	border: none;
	outline: none;
	box-shadow: ${({ theme }) => theme.shadows.soft};

	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${getUnitInPx(1)};
	transition: ${({ theme }) => theme.styles.transition};

	${({ size }) => size === "sm" && ButtonSmSize}
	${({ size }) => size === "md" && ButtonMdSize}
	${({ size }) => size === "lg" && ButtonLgSize}

	${({ loading }) =>
		loading &&
		`
		opacity: 0.8;
	`}

	${({ colorScheme, variant }) =>
		!!variant && !!colorScheme && ButtonStyles[variant][colorScheme]}

	${({ disabled, theme }) =>
		disabled &&
		`
			color: ${theme.text.placeholder} !important;
			background: ${theme.colors.gray300} !important;
			cursor: not-allowed !important;
			opacity: 1 !important;
			scale: 1 !important;
	`}

	&:hover {
		cursor: pointer;
		opacity: 0.8;
		scale: ${({ theme }) => theme.styles.scale};
	}
`;

const ButtonSmSize = css`
	font-size: 12px;
	padding: 6px 12px;
	border-radius: 8px;
`;

const ButtonMdSize = css`
	font-size: 14px;
	padding: 10px 16px;
	border-radius: 12px;
`;

const ButtonLgSize = css`
	font-size: 16px;
	padding: 12px 16px;
	border-radius: 12px;
`;

const ButtonPrimaryOutlined = css`
	background-color: ${({ theme }) => theme.colors.primary + hexPercentage[10]};
	border: 1px solid ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.primary};

	&:hover {
		background-color: ${({ theme }) =>
			theme.colors.primary + hexPercentage[20]};
	}
`;

const ButtonSecondaryOutlined = css`
	background-color: ${({ theme }) =>
		theme.colors.secondary + hexPercentage[10]};
	border: 1px solid ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.secondary};

	&:hover {
		background-color: ${({ theme }) =>
			theme.colors.secondary + hexPercentage[20]};
	}
`;

const ButtonPrimaryFilled = css`
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};

	&:hover {
		opacity: 0.8;
	}
`;

const ButtonSecondaryFilled = css`
	background-color: ${({ theme }) => theme.colors.secondary};
	border-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.white};

	&:hover {
		opacity: 0.8;
	}
`;

const ButtonDangerFilled = css`
	background-color: ${({ theme }) => theme.colors.danger};
	border-color: ${({ theme }) => theme.colors.danger};
	color: ${({ theme }) => theme.colors.white};

	&:hover {
		opacity: 0.8;
	}
`;

const ButtonPrimaryText = css`
	color: ${({ theme }) => theme.colors.primary};

	&:hover {
		opacity: 0.8;
	}
`;

const ButtonSecondaryText = css`
	color: ${({ theme }) => theme.colors.secondary};

	&:hover {
		opacity: 0.8;
	}
`;

const ButtonDangerText = css`
	color: ${({ theme }) => theme.colors.danger};

	&:hover {
		opacity: 0.8;
	}
`;

const ButtonStyles: Record<
	ButtonVariants,
	Record<ButtonThemes, RuleSet | undefined>
> = {
	filled: {
		danger: ButtonDangerFilled,
		primary: ButtonPrimaryFilled,
		secondary: ButtonSecondaryFilled,
	},
	outlined: {
		danger: undefined,
		primary: ButtonPrimaryOutlined,
		secondary: ButtonSecondaryOutlined,
	},
	text: {
		danger: ButtonDangerText,
		primary: ButtonPrimaryText,
		secondary: ButtonSecondaryText,
	},
};

export default {
	Button,
};
