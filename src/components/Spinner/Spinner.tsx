import { Loader } from "react-feather";

import { CustomThemeColors } from "../../styles";
import S from "./Spinner.styles";

interface SpinnerProps {
	size: number;
	strokeWidth?: number;
	theme: CustomThemeColors;
}

const Spinner: React.FC<SpinnerProps> = ({
	size,
	strokeWidth = 1.5,
	theme = "primary",
}) => {
	return (
		<S.Spinner colorScheme={theme} size={size}>
			<Loader size={size} strokeWidth={strokeWidth} />
		</S.Spinner>
	);
};

export { Spinner };
