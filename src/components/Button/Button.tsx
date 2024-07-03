import { PropsWithChildren, useMemo } from "react";
import "./styles.scss";
import { ButtonSizes, ButtonThemes, ButtonVariants } from "../../@types/button";

interface ButtonProps extends PropsWithChildren {
	onClick?: () => void;
	className?: string;
	variant?: ButtonVariants;
	theme?: ButtonThemes;
	size?: ButtonSizes;
}

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	className,
	variant = "filled",
	theme = "primary",
	size = "md",
}) => {
	const classNames = useMemo(
		() =>
			[
				"button",
				`button-${variant}`,
				`button-${theme}`,
				`button-${size}`,
				className,
			].join(" "),
		[className, variant, theme, size]
	);

	return (
		<button onClick={onClick} className={classNames}>
			{children}
		</button>
	);
};

export { Button };
