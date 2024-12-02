import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import {
	ButtonSizes,
	ButtonThemes,
	ButtonVariants,
} from "../../@types/button.model";
import { Spinner } from "../Spinner";
import S from "./Button.styles";

interface ButtonProps
	extends PropsWithChildren,
		ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: () => void;
	variant?: ButtonVariants;
	theme?: ButtonThemes;
	size?: ButtonSizes;
	loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	className,
	variant = "filled",
	theme = "primary",
	size = "md",
	loading = false,
	disabled,
	...rest
}) => {
	const handleOnClick = () => {
		if (loading) return;
		onClick && onClick();
	};

	return (
		<S.Button
			as="button"
			disabled={disabled}
			colorScheme={theme}
			variant={variant}
			size={size}
			onClick={handleOnClick}
			className={className}
			{...rest}
		>
			{loading ? <Spinner size={24} theme="white" /> : children}
		</S.Button>
	);
};

export { Button };
