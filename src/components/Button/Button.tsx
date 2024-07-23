import { ButtonHTMLAttributes, PropsWithChildren, useMemo } from "react";
import "./styles.scss";
import { ButtonSizes, ButtonThemes, ButtonVariants } from "../../@types/button.model";
import { Spinner } from "../Spinner";

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
	const classNames = useMemo(
		() =>
			[
				"button",
				`button-${variant}`,
				`button-${theme}`,
				`button-${size}`,
				`${loading ? "button-loading" : ""}`,
				className,
			].join(" "),
		[className, variant, theme, size, loading]
	);

	const handleOnClick = () => {
		if (loading) return;
		onClick && onClick();
	};

	return (
		<button
			disabled={disabled}
			onClick={handleOnClick}
			className={classNames}
			{...rest}
		>
			{loading ? <Spinner size={24} theme="white" /> : children}
		</button>
	);
};

export { Button };
