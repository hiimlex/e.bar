import styled from "styled-components";
import { shouldForwardProp } from "./shouldForwardProp";
import { CustomThemeText, getUnitInPx } from "./theme";

const LoadingContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
	padding: ${getUnitInPx(4)};
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
	padding: ${getUnitInPx(4)};

	font-size: 16px;
	font-weight: 500;
	color: ${({ theme }) => theme.text.placeholder};
`;

interface TypographyProps {
	textColor?: CustomThemeText;
	fontWeight?: number;
}

const Title = styled.h1.withConfig({ shouldForwardProp })<TypographyProps>`
	font-size: 25px;
	line-height: 140%;
	font-weight: ${({ fontWeight }) => fontWeight || 600};
	color: ${({ theme, textColor }) =>
		(textColor && theme.text[textColor]) || theme.text.dark};
`;

const Subtitle = styled.h3.withConfig({ shouldForwardProp })<TypographyProps>`
	font-size: 20px;
	font-weight: ${({ fontWeight }) => fontWeight || 600};
	color: ${({ theme, textColor }) =>
		(textColor && theme.text[textColor]) || theme.text.dark};
`;

const Subtitle2 = styled.h4.withConfig({ shouldForwardProp })<TypographyProps>`
	font-size: 18px;
	font-weight: ${({ fontWeight }) => fontWeight || 600};
	color: ${({ theme, textColor }) =>
		(textColor && theme.text[textColor]) || theme.text.dark};
`;

const Label = styled.span.withConfig({ shouldForwardProp })<TypographyProps>`
	font-size: 17px;
	font-weight: ${({ fontWeight }) => fontWeight || 600};
	color: ${({ theme, textColor }) =>
		(textColor && theme.text[textColor]) || theme.text.dark};
`;

const FieldLabel = styled.label.withConfig({
	shouldForwardProp,
})<TypographyProps>`
	font-size: 13px;
	font-weight: ${({ fontWeight }) => fontWeight || 600};
	color: ${({ theme, textColor }) =>
		(textColor && theme.text[textColor]) || theme.text.dark};
`;

const Body = styled.span.withConfig({ shouldForwardProp })<TypographyProps>`
	font-size: 16px;
	font-weight: ${({ fontWeight }) => fontWeight || 500};
	color: ${({ theme, textColor }) =>
		(textColor && theme.text[textColor]) || theme.text.dark};
`;
const BodyBold = styled.strong.withConfig({
	shouldForwardProp,
})<TypographyProps>`
	font-size: 16px;
	font-weight: ${({ fontWeight }) => fontWeight || 600};
	color: ${({ theme, textColor }) =>
		(textColor && theme.text[textColor]) || theme.text.dark};
`;

const Caption = styled.span.withConfig({ shouldForwardProp })<TypographyProps>`
	font-size: 14px;
	font-weight: ${({ fontWeight }) => fontWeight || 500};
	color: ${({ theme, textColor }) =>
		(textColor && theme.text[textColor]) || theme.text.dark};
`;
const Button = styled.strong.withConfig({ shouldForwardProp })<TypographyProps>`
	font-size: 14px;
	font-weight: ${({ fontWeight }) => fontWeight || 600};

	color: ${({ theme, textColor }) =>
		(textColor && theme.text[textColor]) || theme.text.dark};
`;

const Currency = styled.span.withConfig({ shouldForwardProp })<TypographyProps>`
	display: grid;
	grid-template-columns: 30px 1fr;
	gap: 6px;

	&:last-child {
		text-align: right;
	}
`;

const Tip = styled.span.withConfig({ shouldForwardProp })<TypographyProps>`
	font-size: 12px;
	font-weight: ${({ fontWeight }) => fontWeight || 500};

	color: ${({ theme, textColor }) =>
		(textColor && theme.text[textColor]) || theme.text.dark};
`;

interface LinkProps {
	textColored?: "primary" | "secondary";
	textColor?: undefined;
	disabled?: boolean;
}

const Link = styled.span.withConfig({ shouldForwardProp })<
	LinkProps & TypographyProps
>`
	font-weight: 16px;
	font-weight: 700;
	width: fit-content;

	display: flex;
	align-items: center;
	gap: ${getUnitInPx(1)};

	transition: ${({ theme }) => theme.styles.transition};

	color: ${({ theme, textColor }) =>
		textColor && !!theme.text[textColor] && theme.text[textColor]};
	color: ${({ theme, textColored }) =>
		textColored && theme.colors[textColored] && theme.colors[textColored]};

	&:hover,
	&:focus,
	&:active {
		cursor: pointer;
		scale: ${({ theme }) => theme.styles.scale};
	}

	${({ disabled, theme }) =>
		disabled &&
		`
		color: ${theme.colors.disabled};
		cursor: not-allowed !important;
		scale: 1 !important;
	`}

	&:disabled {
		color: ${({ theme }) => theme.colors.disabled};
		cursor: not-allowed !important;
		scale: 1 !important;
	}
`;

const Typography = {
	Title,
	Subtitle,
	Body,
	BodyBold,
	Caption,
	Button,
	Label,
	Link,
	FieldLabel,
	Subtitle2,
	Currency,
	Tip,
};

const Card = styled.div.withConfig({ shouldForwardProp })<{ isGray?: boolean }>`
	display: flex;
	flex-direction: column;
	padding: ${getUnitInPx(3)};
	gap: ${getUnitInPx(3)};
	border-radius: ${getUnitInPx(3)};

	width: 100%;
	box-shadow: ${({ theme }) => theme.shadows.soft};

	${({ isGray, theme }) => isGray && `background: ${theme.colors.gray100};`}
`;

const CardFooter = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
`;

const DashLine = styled.div`
	border-top: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export default {
	LoadingContainer,
	Empty,
	Typography,
	Card,
	CardFooter,
	DashLine,
};
