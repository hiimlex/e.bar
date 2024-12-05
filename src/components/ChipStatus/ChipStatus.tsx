import { PropsWithChildren } from "react";
import { StyledChipStatusProps } from "./ChipStatus.styles";

export interface ChipStatusProps {
	colorScheme?: StyledChipStatusProps["colorScheme"];
	variant?: StyledChipStatusProps["variant"];
	customStyles?: React.CSSProperties;
	className?: string;
	size?: LeSizes;
}

import S from "./ChipStatus.styles";
import { LeSizes } from "leux";

const ChipStatus: React.FC<PropsWithChildren<ChipStatusProps>> = ({
	children,
	colorScheme = "default",
	variant = "filled",
	className,
	customStyles,
	size = "medium",
}) => {
	return (
		<S.ChipStatus
			colorScheme={colorScheme}
			variant={variant}
			size={size}
			className={className}
			style={customStyles}
		>
			{children}
		</S.ChipStatus>
	);
};

export default ChipStatus;
