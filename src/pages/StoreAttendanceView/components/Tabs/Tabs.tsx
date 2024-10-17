import { useTranslation } from "react-i18next";
import { TabItemType } from "../../../../@types";
import "./styles.scss";

interface TabsProps {
	tabs: Array<TabItemType>;
	selected: string;
	onSelect: (value: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ selected, tabs, onSelect }) => {
	const { t } = useTranslation();

	const tabsLengthStyle = {
		"--itemsLength": tabs.length,
	} as React.CSSProperties;
	return (
		<div className="tabs" style={tabsLengthStyle}>
			{tabs.map((tab) => (
				<span
					className={`tabs-item ${
						selected === tab.value ? " tabs-item-active" : ""
					}`}
					role="button"
					key={tab.label}
					onClick={() => onSelect(tab.value)}
				>
					{t(tab.label)}
				</span>
			))}
		</div>
	);
};

export { Tabs };
