import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAny } from "../../@types";
import "./styles.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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

const Input: React.FC<InputProps> = ({
	onChangeValue,
	className,
	styles,
	fieldKey,
	value = '',
	placeholder,
	hideLabel = false,
	wrapperClassName,
	mode = "controlled",
	errorMessage,
	errorValue,
	showError,
	hasPrefix,
	hasSuffix,
	prefixContent,
	suffixContent,
	...rest
}) => {
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);

	const [isFocused, setIsFocused] = useState(false);

	const prefixRef = useRef<HTMLDivElement>(null);
	const suffixRef = useRef<HTMLDivElement>(null);

	const prefixWidth = useMemo(() => {
		return prefixRef?.current?.offsetWidth ?? 24;
	}, []);

	const suffixWidth = useMemo(() => {
		return suffixRef?.current?.offsetWidth ?? 24;
	}, []);

	const prefixStyles = useMemo(() => {
		const paddingLeft = hasPrefix ? prefixWidth + 18 : 12;
		const paddingRight = hasSuffix ? suffixWidth + 18 : 12;

		return {
			paddingLeft,
			paddingRight,
		};
	}, [hasSuffix, hasPrefix, prefixWidth, suffixWidth]);

	const hasValue = useMemo(() => !!value, [value]);
	const placeholder_t = useMemo(() => t(placeholder ?? ""), [placeholder, t]);

	const hasError = useMemo(
		() => showError && errorMessage && isFocused,
		[showError, isFocused, errorMessage]
	);
	const classNames = useMemo(
		() =>
			["input", className, `${hasError ? "input-error" : ""}`]
				.filter((el) => el !== "")
				.join(" "),
		[className, hasError]
	);

	const shouldShowLabel = useMemo(() => {
		if (hideLabel) {
			return false;
		}

		if (!placeholder) {
			return false;
		}

		return (isFocused && hasValue) || hasValue;
	}, [hasValue, isFocused, placeholder, hideLabel]);

	const inputProps = useMemo(() => {
		if (mode === "controlled") {
			return {
				value,
			};
		}
	}, [mode, value]);

	return (
		<div className={`input-wrapper ${wrapperClassName}`}>
			{shouldShowLabel && (
				<label className="input-label" htmlFor={fieldKey}>
					{placeholder_t}
				</label>
			)}

			<div className="input-field">
				{hasPrefix && (
					<div ref={prefixRef} className="input-prefix">
						{prefixContent}
					</div>
				)}
				{hasSuffix && (
					<div ref={suffixRef} className="input-suffix">
						{suffixContent}
					</div>
				)}
				<input
					id={fieldKey}
					name={fieldKey}
					ref={inputRef}
					onChange={(event) => {
						onChangeValue && onChangeValue(event.target.value);
						rest.onChange && rest.onChange(event);
					}}
					value={value}
					className={classNames}
					placeholder={placeholder_t}
					style={{ ...styles, ...prefixStyles }}
					{...rest}
					onBlur={(event) => {
						setIsFocused(false);
						rest.onBlur && rest.onBlur(event);
					}}
					onFocus={(event) => {
						setIsFocused(true);
						rest.onFocus && rest.onFocus(event);
					}}
				/>
			</div>

			{showError && isFocused && errorMessage && (
				<span className="field-error">{t(errorMessage, errorValue)}</span>
			)}
		</div>
	);
};

export { Input };
