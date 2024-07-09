import { ArrowLeft, Search, X } from "react-feather";
import { Brands } from "../Brands";
import "./styles.scss";
import { useRef, useState } from "react";
import { useBreakpoint } from "../../hooks";

export interface WaiterHeaderProps {
	waiterHeaderGoBack?: boolean;
	waiterHeaderOnBack?: () => void;
	waiterHeaderSearch?: boolean;
	waiterHeaderOnSearch?: (value: string) => void;
	waiterHeaderSearchPlaceholder?: string;
}

const WaiterHeader: React.FC<WaiterHeaderProps> = ({
	waiterHeaderGoBack = false,
	waiterHeaderOnBack,
	waiterHeaderOnSearch,
	waiterHeaderSearch = false,
	waiterHeaderSearchPlaceholder,
}) => {
	const {breakpoint} = useBreakpoint();
	const inputRef = useRef<HTMLInputElement>(null);
	const [showSearch, setShowSearch] = useState(false);

	const onSearchClick = () => {
		setShowSearch((curr) => !curr);
	};

	const onSearchChange = (value: string) => {
		if (waiterHeaderOnSearch) {
			waiterHeaderOnSearch(value);
		}
	};

	const resetSearch = () => {
		if (inputRef.current) {
			inputRef.current.value = "";

			if (waiterHeaderOnSearch) {
				waiterHeaderOnSearch("");
			}

			setShowSearch(false);
		}
	};

	return (
		<div className="w-app-header-wrapper">
			<header className={`w-app-header w-app-header-${breakpoint}`}>
				<div className="flex-1 w-app-header-action">
					{waiterHeaderGoBack && (
						<button
							className="w-app-header-button"
							onClick={waiterHeaderOnBack}
						>
							<ArrowLeft size={28} strokeWidth={1.5} />
						</button>
					)}
				</div>
				<div className="w-app-header-brand">
					<Brands.SocialSipsBrand size={120} />
				</div>
				<div className="flex-1 w-app-header-action">
					{waiterHeaderSearch && (
						<button className="w-app-header-button" onClick={onSearchClick}>
							<Search size={24} strokeWidth={1.5} />
						</button>
					)}
				</div>
			</header>
			{showSearch && (
				<div className="input-search-wrapper">
					<input
						type="text"
						className="input-search"
						placeholder={waiterHeaderSearchPlaceholder}
						onChange={({ target: { value } }) => onSearchChange(value)}
						ref={inputRef}
					/>

					<div className="input-search-close" onClick={resetSearch}>
						<X size={22} strokeWidth={1.5} />
					</div>
				</div>
			)}
		</div>
	);
};

export { WaiterHeader };
