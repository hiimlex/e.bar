import { SafeAny } from "../../@types";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	mode?: "controlled" | "uncontrolled";

	fieldKey?: string;
	onChangeValue?: (value: string) => void;
	className?: string;
	styles?: React.CSSProperties;
	value?: string | number;
	wrapperClassName?: string;

	hideLabel?: boolean;

	errorMessage?: string;
	errorValue?: Record<string, SafeAny>;
	showError?: boolean;

	hasPrefix?: boolean;
	prefixContent?: React.ReactNode;
	hasSuffix?: boolean;
	suffixContent?: React.ReactNode;
}
