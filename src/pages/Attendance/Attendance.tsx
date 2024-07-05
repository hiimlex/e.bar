import { useEffect, useState } from "react";
import { Chip, MainContainer } from "../../components";
import { Tables, Waiters } from "./components";
import "./styles.scss";
import { useQuery } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../@types";

interface AttendancePageProps {}

type AttendanceModeType = "tables" | "waiters";

const AttendancePage: React.FC<AttendancePageProps> = () => {
	const query = useQuery();
	const navigate = useNavigate();

	const [mode, setMode] = useState<AttendanceModeType>("waiters");

	const handleModeChange = (mode: AttendanceModeType) => {
		setMode(mode);

		navigate(`${Pages.Attendance}?mode=${mode}`);
	};

	useEffect(() => {
		const mode = query.get("mode") as AttendanceModeType;

		if (mode) {
			setMode(mode);
		}
	}, []);

	return (
		<MainContainer showAdminHeader>
			<div className="attendance">
				<header className="attendance-header">
					<h2 className="page-title">Atendimento</h2>
				</header>

				<div className="attendance-tabs">
					<Chip
						onClick={() => handleModeChange("waiters")}
						active={mode === "waiters"}
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
					{mode === "waiters" && <Waiters />}
					{mode === "tables" && <Tables />}
				</div>
			</div>
		</MainContainer>
	);
};

export default AttendancePage;
