import { GenericIconProps } from "./Icons";

const SendSVG: React.FC<GenericIconProps> = ({
	width = 30,
	height = 28,
	fill = "#000",
}) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 30 28"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M1.86987 11.6667L1.88234 3.5L28.0498 14L1.88234 24.5L1.86987 16.3333L20.5698 14L1.86987 11.6667ZM4.37567 7.035L13.7381 10.7917L4.3632 9.625L4.37567 7.035ZM13.7256 17.2083L4.3632 20.965V18.375L13.7256 17.2083Z"
			fill={fill}
		/>
	</svg>
);

export { SendSVG };
