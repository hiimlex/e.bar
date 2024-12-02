import { PropsWithChildren } from "react";
import { StyledChipStatusProps } from "./ChipStatus.styles";

export interface ChipStatusProps {
	colorScheme?: StyledChipStatusProps["colorScheme"];
	variant?: StyledChipStatusProps["variant"];
	customStyles?: React.CSSProperties;
	customClass?: string;
}

import S from "./ChipStatus.styles";

const ChipStatus: React.FC<PropsWithChildren<ChipStatusProps>> = ({
	children,
	colorScheme = "default",
	variant = "filled",
	customClass,
	customStyles,
}) => {
	return (
		<S.ChipStatus
			colorScheme={colorScheme}
			variant={variant}
			className={customClass}
			style={customStyles}
		>
			{children}
		</S.ChipStatus>
	);
};

export default ChipStatus;
