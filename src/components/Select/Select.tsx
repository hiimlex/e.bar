import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAny } from "../../@types";
import "./styles.scss";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	mode?: "controlled" | "uncontrolled";

	label?: string;

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

	useOptions?: boolean;
	options?: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({
	onChangeValue,
	className,
	styles,
	fieldKey,
	value,
	label,
	hideLabel = false,
	wrapperClassName,
	mode = "uncontrolled",
	errorMessage,
	errorValue,
	showError,
	hasPrefix,
	hasSuffix,
	prefixContent,
	suffixContent,
	children,
	useOptions = false,
	options,
	...rest
}) => {
	const { t } = useTranslation();
	const selectRef = useRef<HTMLSelectElement>(null);

	const [isFocused, setIsFocused] = useState(false);

	const prefixRef = useRef<HTMLDivElement>(null);
	const suffixRef = useRef<HTMLDivElement>(null);

	const prefixWidth = useMemo(() => {
		return prefixRef?.current?.offsetWidth ?? 0;
	}, []);

	const suffixWidth = useMemo(() => {
		return suffixRef?.current?.offsetWidth ?? 0;
	}, []);

	const prefixStyles = useMemo(() => {
		const paddingLeft = hasPrefix ? prefixWidth + 16 : 10;
		const paddingRight = hasSuffix ? suffixWidth + 16 : 10;

		return {
			paddingLeft,
			paddingRight,
		};
	}, [hasSuffix, hasPrefix, prefixWidth, suffixWidth]);

	const hasValue = useMemo(() => !!value, [value]);
	const valueIsLabel = useMemo(() => !value || value === "", [value]);
	const placeholder_t = useMemo(() => t(label ?? ""), [label, t]);

	const hasError = useMemo(
		() => showError && errorMessage && isFocused,
		[showError, isFocused, errorMessage]
	);
	const classNames = useMemo(
		() =>
			[
				"select",
				className,
				`${hasError ? "select-error" : ""}`,
				`${valueIsLabel ? "select-empty" : ""}`,
			]
				.filter((el) => el !== "")
				.join(" "),
		[className, hasError, valueIsLabel]
	);

	const shouldShowLabel = useMemo(() => {
		if (hideLabel) {
			return false;
		}

		if (!label) {
			return false;
		}

		return (isFocused && hasValue) || hasValue;
	}, [hasValue, isFocused, label, hideLabel]);

	const selectProps = useMemo(() => {
		if (mode === "controlled") {
			return {
				value,
			};
		}
	}, [mode, value]);

	return (
		<div className={`select-wrapper ${wrapperClassName}`}>
			{shouldShowLabel && (
				<label className={`select-label`} htmlFor={fieldKey}>
					{placeholder_t}
				</label>
			)}

			<div className="select-field">
				{hasPrefix && (
					<div ref={prefixRef} className="select-prefix">
						{prefixContent}
					</div>
				)}
				{hasSuffix && (
					<div ref={suffixRef} className="select-suffix">
						{suffixContent}
					</div>
				)}
				<select
					id={fieldKey}
					name={fieldKey}
					ref={selectRef}
					onChange={(event) => {
						onChangeValue && onChangeValue(event.target.value);
						rest.onChange && rest.onChange(event);
					}}
					className={classNames}
					style={{ ...styles, ...prefixStyles }}
					{...selectProps}
					{...rest}
					onBlur={(event) => {
						setIsFocused(false);
						rest.onBlur && rest.onBlur(event);
					}}
					onFocus={(event) => {
						setIsFocused(true);
						rest.onFocus && rest.onFocus(event);
					}}
				>
					{useOptions &&
						options &&
						options.map((option) => (
							<option key={option.value} value={option.value}>
								{t(option.label)}
							</option>
						))}
					{!useOptions && children}
				</select>
			</div>

			{showError && isFocused && errorMessage && (
				<span className="field-error">{t(errorMessage, errorValue)}</span>
			)}
		</div>
	);
};

export { Select };
