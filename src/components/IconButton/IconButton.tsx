import { PropsWithChildren, useMemo } from "react";
import {
	IconButtonSizes,
	IconButtonThemes,
	IconButtonVariants,
} from "../../@types/button";
import "./styles.scss";

interface IconButtonProps extends PropsWithChildren {
	onClick?: () => void;
	className?: string;
	variant?: IconButtonVariants;
	theme?: IconButtonThemes;
	size?: IconButtonSizes;
}

const IconButton: React.FC<IconButtonProps> = ({
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
				"iconbutton",
				`iconbutton-${variant}`,
				`iconbutton-${theme}`,
				`iconbutton-${size}`,
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

export { IconButton };
