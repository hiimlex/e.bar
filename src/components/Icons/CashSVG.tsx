import { GenericIconProps } from "./Icons";

const CashSVG: React.FC<GenericIconProps> = ({
	width = 32,
	height = 32,
	fill = "#505050",
}) => (
	<svg width={width} height={height} viewBox="0 0 32 32" fill="none">
		<path
			d="M16 1.33331V30.6666"
			stroke={fill}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M22.6667 6.66669H12.6667C11.429 6.66669 10.242 7.15835 9.36684 8.03352C8.49167 8.90869 8 10.0957 8 11.3334C8 12.571 8.49167 13.758 9.36684 14.6332C10.242 15.5084 11.429 16 12.6667 16H19.3333C20.571 16 21.758 16.4917 22.6332 17.3669C23.5083 18.242 24 19.429 24 20.6667C24 21.9044 23.5083 23.0913 22.6332 23.9665C21.758 24.8417 20.571 25.3334 19.3333 25.3334H8"
			stroke={fill}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default CashSVG;
