import { LeSizes } from "leux";
import styled, { css, RuleSet } from "styled-components";
import { hexPercentage, shouldForwardProp } from "../../styles";

export interface StyledChipStatusProps {
	active?: boolean;
	colorScheme:
		| "primary"
		| "secondary"
		| "success"
		| "warning"
		| "danger"
		| "default";
	variant: "filled" | "outlined";
	size?: LeSizes;
}

const ChipStatus = styled.div.withConfig({
	shouldForwardProp,
})<StyledChipStatusProps>`
	padding: 8px 12px;
	border-radius: 8px;
	font-weight: 500;
	font-size: 14px;
	width: fit-content;
	height: fit-content;

	${({ colorScheme, variant }) =>
		variant && colorScheme && ChipStatusStyled[variant][colorScheme]}

	${({ size }) => size && ChipStatusSizes[size]}
`;

const ChipStatusSmall = css`
	padding: 4px 8px;
`;
const ChipStatusMedium = css`
	padding: 8px 12px;
`;
const ChipStatusLarge = css`
	padding: 12px 16px;
`;

const ChipStatusSizes: Record<LeSizes, RuleSet> = {
	small: ChipStatusSmall,
	medium: ChipStatusMedium,
	large: ChipStatusLarge,
};

const ChipSuccessFilled = css`
	background: ${({ theme }) => theme.colors.success};
	color: ${({ theme }) => theme.text.white};
`;

const ChipSuccessOutlined = css`
	background: ${({ theme }) => theme.colors.success + hexPercentage[20]};
	color: ${({ theme }) => theme.colors.success};
`;

const ChipDangerFilled = css`
	background: ${({ theme }) => theme.colors.danger};
	color: ${({ theme }) => theme.text.white};
`;

const ChipDangerOutlined = css`
	background: ${({ theme }) => theme.colors.danger + hexPercentage[20]};
	color: ${({ theme }) => theme.colors.danger};
`;

const ChipPrimaryFilled = css`
	background: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.text.white};
`;

const ChipPrimaryOutlined = css`
	background: ${({ theme }) => theme.colors.primary + hexPercentage[20]};
	color: ${({ theme }) => theme.colors.primary};
`;

const ChipSecondaryFilled = css`
	background: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.text.white};
`;

const ChipSecondaryOutlined = css`
	background: ${({ theme }) => theme.colors.secondary + hexPercentage[20]};
	color: ${({ theme }) => theme.colors.secondary};
`;

const ChipWarningFilled = css`
	background: ${({ theme }) => theme.colors.warning};
	color: ${({ theme }) => theme.text.white};
`;

const ChipWarningOutlined = css`
	background: ${({ theme }) => theme.colors.warning + hexPercentage[20]};
	color: ${({ theme }) => theme.colors.warning};
`;

const ChipDefaultFilled = css`
	background: ${({ theme }) => theme.colors.gray100};
	color: ${({ theme }) => theme.text.dark};
`;

const ChipDefaultOutlined = css`
	background: ${({ theme }) => theme.colors.gray100 + hexPercentage[20]};
	color: ${({ theme }) => theme.text.dark};
`;

const ChipStatusStyled: Record<
	StyledChipStatusProps["variant"],
	Record<StyledChipStatusProps["colorScheme"], undefined | RuleSet>
> = {
	outlined: {
		danger: ChipDangerOutlined,
		primary: ChipPrimaryOutlined,
		secondary: ChipSecondaryOutlined,
		success: ChipSuccessOutlined,
		warning: ChipWarningOutlined,
		default: ChipDefaultOutlined,
	},
	filled: {
		danger: ChipDangerFilled,
		primary: ChipPrimaryFilled,
		secondary: ChipSecondaryFilled,
		success: ChipSuccessFilled,
		warning: ChipWarningFilled,
		default: ChipDefaultFilled,
	},
};

export default { ChipStatus };
