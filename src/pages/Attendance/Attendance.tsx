import { useState } from "react";
import { Chip, MainContainer } from "../../components";
import { Bartenders, Tables } from "./components";
import "./styles.scss";

interface AttendancePageProps {}

type AttendanceModeType = "tables" | "bartenders";

const AttendancePage: React.FC<AttendancePageProps> = () => {
	const [mode, setMode] = useState<AttendanceModeType>("bartenders");

	const handleModeChange = (mode: AttendanceModeType) => {
		setMode(mode);
	};

	return (
		<MainContainer showAdminHeader>
			<div className="attendance">
				<header className="attendance-header">
					<h2 className="page-title">Atendimento</h2>
				</header>

				<div className="attendance-tabs">
					<Chip
						onClick={() => handleModeChange("bartenders")}
						active={mode === "bartenders"}
						clickable
						theme="primary"
					>
						Garçons
					</Chip>
					<Chip
						clickable
						theme="primary"
						onClick={() => handleModeChange("tables")}
						active={mode === "tables"}
					>
						Mesas
					</Chip>
				</div>

				<div className="attendance-tab-content">
					{mode === "bartenders" && <Bartenders />}
					{mode === "tables" && <Tables />}
				</div>
			</div>
		</MainContainer>
	);
};

export default AttendancePage;
