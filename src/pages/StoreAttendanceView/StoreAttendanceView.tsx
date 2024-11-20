import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Pages, SafeAny, TabEnum, TabItemType } from "../../@types";
import { MainContainer } from "../../components";
import {
	AppDispatch,
	OnAttendanceActions,
	RootState,
	onAttendancefetchAttendance,
} from "../../store";
import { Tabs } from "./components";
import "./styles.scss";
import { AxiosError } from "axios";
import { useToast } from "leux";

const tabs: TabItemType[] = [
	{
		label: `StoreAttendanceView.Tabs.${TabEnum.General}`,
		value: TabEnum.General,
	},
	{
		label: `StoreAttendanceView.Tabs.${TabEnum.Orders}`,
		value: TabEnum.Orders,
	},
	{
		label: `StoreAttendanceView.Tabs.${TabEnum.Sales}`,
		value: TabEnum.Sales,
	},
];

const StoreAttendanceView: React.FC = () => {
	const { t } = useTranslation();
	const ToastService = useToast();

	const { attendanceId } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const [loading, setLoading] = useState(true);
	const { attendance } = useSelector((state: RootState) => state.onAttendance);

	const navigate = useNavigate();

	const getAttendance = async () => {
		try {
			if (!attendanceId) {
				navigate(Pages.StoreAttendances);

				return;
			}

			setLoading(true);

			dispatch(OnAttendanceActions.setAttendanceId(attendanceId));

			await dispatch(
				onAttendancefetchAttendance({
					onError: (error) => {
						setLoading(false);

						if (error.response) {
							const message  = (error.response.data as SafeAny);

							if (message && typeof message === "string") {
								const translateMessage = t(`Errors.${message}`);

								ToastService.createToast({
									label: translateMessage,
									colorScheme: "danger",
								});
							}
						}
					},
				})
			);

			navigate(
				Pages.StoreAttendanceGeneral.replace(":attendanceId", attendanceId),
				{ replace: true }
			);

			setLoading(false);
		} catch (error) {
			setLoading(false);

			if (error instanceof AxiosError && error.response) {
				const { message } = error.response.data;

				if (message && typeof message === "string") {
					const translateMessage = t(`Errors.${message}`);

					ToastService.createToast({
						label: translateMessage,
						colorScheme: "danger",
					});
				}
			}
		}
	};

	useEffect(() => {
		getAttendance();
	}, []);

	const [selectedTab, setSelectedTab] = useState<string>(TabEnum.General);

	const handleTabSelect = (value: string) => {
		setSelectedTab(value);
	};

	if ((!attendance || !attendanceId) && !loading) {
		return null;
	}

	return (
		<MainContainer showAdminHeader>
			{loading && <h4>{t("Loading")}</h4>}
			{!loading && (
				<div className="b-o-attendance">
					<header className="b-o-attendance-header">
						<Link to={Pages.StoreAttendances} className="link link-primary">
							<ArrowLeft size={16} />
							{t("StoreAttendanceView.GoBack")}
						</Link>

						<div className="flex flex-row gap-4 items-end">
							<h4 className="page-title">
								{t("StoreAttendanceView.Title", {
									code: attendance?.code || "",
								})}
							</h4>
							<span className="chip-status chip-status-success-outlined">
								{t(`Generics.AttendanceStatus.${attendance?.status}`)}
							</span>
						</div>
					</header>

					<div className="b-o-attendance-status">
						<div className="flex group">
							<span className="group-label">Inicio</span>
							<span className="group-value chip-status chip-status-default">
								{attendance?.started_at &&
									format(
										new Date(attendance?.started_at),
										t("Generics.Dates.Long.Format")
									)}
							</span>
						</div>
						<div className="flex group">
							<span className="group-label">Mesas ativas</span>
							<span className="group-value chip-status chip-status-default">
								{attendance?.tables_count || "---"}
							</span>
						</div>
						<div className="flex group">
							<span className="group-label">Garçons ativos</span>
							<span className="group-value chip-status chip-status-default">
								{"12"}
							</span>
						</div>
					</div>

					<Tabs
						tabs={tabs}
						selected={selectedTab}
						onSelect={(tab) => handleTabSelect(tab)}
					/>

					<div className="tabs-content">
						<Outlet />
					</div>
				</div>
			)}
		</MainContainer>
	);
};

export { StoreAttendanceView };
