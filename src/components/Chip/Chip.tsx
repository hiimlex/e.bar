import "./styles.scss";
import { PropsWithChildren, useMemo } from "react";

interface ChipProps extends PropsWithChildren {
	active?: boolean;
	clickable?: boolean;
	onClick?: () => void;
	theme?: "primary" | "secondary";
}

const Chip: React.FC<ChipProps> = ({
	active,
	children,
	clickable,
	onClick,
	theme = "primary",
}) => {
	const handleOnClick = () => {
		if (clickable && onClick) {
			onClick();
		}
	};

	const classNames = useMemo(
		() => `chip ${active ? "active" : ""} ${theme ? `chip-${theme}` : ""}`,
		[active]
	);

	return (
		<div onClick={handleOnClick} role="button" className={classNames}>
			{children}
		</div>
	);
};

export { Chip };
