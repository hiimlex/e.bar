import { keyframes } from "styled-components";

export const shouldForwardProp: (prop: string) => boolean = (prop) =>
	!["colorScheme", "variant", "size", "active", "breakpoint"].includes(prop);

export const colors = {
	primary: "#9a36fd",
	secondary: "#201f20",
	background: "#fcfcfc",
	white: "#fff",

	gray100: "#f0f0f0",
	gray200: "#d8d8d8",
	gray300: "#afafaf",

	success: "#39c87b",
	danger: "#ff4a4a",
	warning: "#f5a623",
	disabled: "#c0c0c0",
};

export const styles = {
	transition: "all 0.1s ease-in-out",
	scale: 1.05,
	scaleLarge: 1.1,
};

export const text = {
	placeholder: "#505050",
	dark: "#414141",
	darker: "#212121",
};

export const shadows = {
	soft: "0px 4px 8px rgba(0, 0, 0, 0.1)",
	normal: "0px 4px 8px rgba(0, 0, 0, 0.2)",
	strong: "0px 4px 8px rgba(0, 0, 0, 0.3)",
};

export const theme = {
	colors,
	styles,
	text,
	shadows,
};

export type CustomTheme = typeof theme;

const DEFAULT_UNIT = 6;

const flip = keyframes`
	0% {
		transform: rotateX(0deg);
	}
	100% {
		transform: rotateX(180deg);
	}
`;

const flipReverse = keyframes`
	0% {
		transform: rotateX(0deg);
	}
	100% {
		transform: rotateX(180deg);
	}
	`;

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
	`;

const fadeOut = keyframes`
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
	`;

export const animations = {
	flip,
	flipReverse,
	fadeIn,
	fadeOut,
};

export const getUnitInPx = (n: number): string => {
	return `${n * DEFAULT_UNIT}px`;
};

export const hexPercentage: Record<number, string> = {
	100: "FF",
	99: "FC",
	98: "FA",
	97: "F7",
	96: "F5",
	95: "F2",
	94: "F0",
	93: "ED",
	92: "EB",
	91: "E8",
	90: "E6",
	89: "E3",
	88: "E0",
	87: "DE",
	86: "DB",
	85: "D9",
	84: "D6",
	83: "D4",
	82: "D1",
	81: "CF",
	80: "CC",
	79: "C9",
	78: "C7",
	77: "C4",
	76: "C2",
	75: "BF",
	74: "BD",
	73: "BA",
	72: "B8",
	71: "B5",
	70: "B3",
	69: "B0",
	68: "AD",
	67: "AB",
	66: "A8",
	65: "A6",
	64: "A3",
	63: "A1",
	62: "9E",
	61: "9C",
	60: "99",
	59: "96",
	58: "94",
	57: "91",
	56: "8F",
	55: "8C",
	54: "8A",
	53: "87",
	52: "85",
	51: "82",
	50: "80",
	49: "7D",
	48: "7A",
	47: "78",
	46: "75",
	45: "73",
	44: "70",
	43: "6E",
	42: "6B",
	41: "69",
	40: "66",
	39: "63",
	38: "61",
	37: "5E",
	36: "5C",
	35: "59",
	34: "57",
	33: "54",
	32: "52",
	31: "4F",
	30: "4D",
	29: "4A",
	28: "47",
	27: "45",
	26: "42",
	25: "40",
	24: "3D",
	23: "3B",
	22: "38",
	21: "36",
	20: "33",
	19: "30",
	18: "2E",
	17: "2B",
	16: "29",
	15: "26",
	14: "24",
	13: "21",
	12: "1F",
	11: "1C",
	10: "1A",
	9: "17",
	8: "14",
	7: "12",
	6: "0F",
	5: "0D",
	4: "0A",
	3: "08",
	2: "05",
	1: "03",
	0: "00",
};
