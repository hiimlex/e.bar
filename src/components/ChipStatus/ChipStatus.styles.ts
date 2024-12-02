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
}

const ChipStatus = styled.div.withConfig({
	shouldForwardProp,
})<StyledChipStatusProps>`
	padding: 4px 12px;
	border-radius: 12px;
	font-weight: 600;
	font-size: 14px;
	width: fit-content;
	height: fit-content;

	${({ colorScheme, variant }) =>
		variant && colorScheme && ChipStatusStyled[variant][colorScheme]}
`;

const ChipSuccessFilled = css`
	background: ${({ theme }) => theme.colors.success};
	color: ${({ theme }) => theme.colors.white};
`;

const ChipSuccessOutlined = css`
	background: ${({ theme }) => theme.colors.success + hexPercentage[20]};
	color: ${({ theme }) => theme.colors.success};
`;

const ChipDangerFilled = css`
	background: ${({ theme }) => theme.colors.danger};
	color: ${({ theme }) => theme.colors.white};
`;

const ChipDangerOutlined = css`
	background: ${({ theme }) => theme.colors.danger + hexPercentage[20]};
	color: ${({ theme }) => theme.colors.danger};
`;

const ChipPrimaryFilled = css`
	background: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
`;

const ChipPrimaryOutlined = css`
	background: ${({ theme }) => theme.colors.primary + hexPercentage[20]};
	color: ${({ theme }) => theme.colors.primary};
`;

const ChipSecondaryFilled = css`
	background: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.white};
`;

const ChipSecondaryOutlined = css`
	background: ${({ theme }) => theme.colors.secondary + hexPercentage[20]};
	color: ${({ theme }) => theme.colors.secondary};
`;

const ChipWarningFilled = css`
	background: ${({ theme }) => theme.colors.warning};
	color: ${({ theme }) => theme.colors.white};
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
