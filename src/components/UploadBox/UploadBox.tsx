import React, { useRef } from "react";
import "./styles.scss";
import { Upload as UploadIcon } from "react-feather";
import { useTranslation } from "react-i18next";

interface UploadBoxProps {
	label: string;
	accept?: string;
	onChange: (file: File) => void;
	minify?: boolean;
	minifyText?: string;
}

const UploadBox: React.FC<UploadBoxProps> = ({
	label,
	accept = "image/jpg, image/jpeg, image/png",
	onChange,
	minify = false,
	minifyText = "",
}) => {
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleBoxClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	return (
		<div className="upload-box-wrapper">
			<input
				accept={accept}
				type="file"
				onChange={(event) => onChange && onChange(event.target.files![0])}
				ref={inputRef}
				className="upload-box-field"
			/>
			{!minify && (
				<div role="buton" onClick={handleBoxClick} className="upload-box">
					<UploadIcon size={48} strokeWidth={1.5} />
					<span>{t(label)}</span>
				</div>
			)}
			{minify && minifyText && (
				<span role="button" onClick={handleBoxClick} className="upload-box-link link link-primary">
					{t(minifyText)}
				</span>
			)}
		</div>
	);
};

export { UploadBox };
