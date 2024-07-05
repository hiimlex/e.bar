import { useMemo, useRef, useState } from "react";
import "./styles.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	onChangeValue?: (value: string) => void;
	className?: string;
	styles?: React.CSSProperties;
	fieldKey?: string;
	value?: string;
	hideLabel?: boolean;
	wrapperClassName?: string;
}

const Input: React.FC<InputProps> = ({
	onChangeValue,
	className,
	styles,
	fieldKey,
	value,
	placeholder,
	hideLabel = false,
	wrapperClassName,
	...rest
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const hasValue = useMemo(() => !!value, [value]);

	const classNames = useMemo(() => ["input", className].join(" "), [className]);
	const [isFocused, setIsFocused] = useState(false);

	const shouldShowLabel = useMemo(() => {
		if (hideLabel) {
			return false;
		}

		if (!placeholder) {
			return false;
		}

		return (isFocused && hasValue) || hasValue;
	}, [hasValue, isFocused, placeholder]);

	return (
		<div className={`input-wrapper ${wrapperClassName}`}>
			{shouldShowLabel && (
				<label className="input-label" htmlFor={fieldKey}>
					{placeholder}
				</label>
			)}
			<input
				id={fieldKey}
				name={fieldKey}
				ref={inputRef}
				onChange={(event) => {
					onChangeValue && onChangeValue(event.target.value);
					rest.onChange && rest.onChange(event);
				}}
				className={classNames}
				style={styles}
				placeholder={placeholder}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				value={value}
				{...rest}
			/>
		</div>
	);
};

export { Input };
