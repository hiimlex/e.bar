import { GenericIconProps } from "./Icons";

const CreditCardSVG: React.FC<GenericIconProps> = ({
	width = 32,
	height = 32,
	fill = "#505050",
}) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 32 32"
		fill="none"
	>
		<path
			d="M28.0002 8.33331H4.00016C2.5274 8.33331 1.3335 9.52722 1.3335 11V27C1.3335 28.4727 2.5274 29.6666 4.00016 29.6666H28.0002C29.4729 29.6666 30.6668 28.4727 30.6668 27V11C30.6668 9.52722 29.4729 8.33331 28.0002 8.33331Z"
			stroke={fill}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M1.3335 16.3333H30.6668"
			stroke={fill}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default CreditCardSVG;
