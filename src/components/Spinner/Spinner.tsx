import "./styles.scss";
import { Loader } from "react-feather";

interface SpinnerProps {
	size: number;
	strokeWidth?: number;
	theme: "primary" | "secondary" | 'white';
}

const Spinner: React.FC<SpinnerProps> = ({
	size,
	strokeWidth = 1.5,
	theme,
}) => {
	return (
		<div
			className={`spinner spinner-${theme}`}
			style={{ width: size, height: size }}
		>
			<Loader size={size} strokeWidth={strokeWidth} />
		</div>
	);
};

export { Spinner };
