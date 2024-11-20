import { format } from "date-fns";
import { Dropdown, DropdownItem, DropdownSeparator, useToast } from "leux";
import React, { useCallback, useEffect, useState } from "react";
import { Eye, MoreVertical, X } from "react-feather";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
	GetAttendanceFilters,
	IAttendance,
	ModalIds,
	Pages,
	TAttendanceStatus,
	TOrderBy,
} from "../../@types";
import { AttendancesService } from "../../api";
import {
	Button,
	Chip,
	ChipWrapper,
	MainContainer,
	OrderBy,
} from "../../components";
import { useModal } from "../../hooks";
import { StartAttendanceModal } from "./components";
import "./styles.scss";
import { AxiosError } from "axios";

interface StoreAttendancesPageProps {}

const StoreAttendancesPage: React.FC<StoreAttendancesPageProps> = () => {
	const { t } = useTranslation();
	const ToastService = useToast();
	const { openModal } = useModal();

	const [attendances, setAttendances] = useState<IAttendance[]>([]);
	const [filters, setFilters] = useState<GetAttendanceFilters>({});
	const navigate = useNavigate();

	const loadAttendances = useCallback(async () => {
		try {
			const { data } = await AttendancesService.fetchAll(filters);

			if (data) {
				setAttendances(data.content);
			}
		} catch (error) {
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
	}, [filters]);

	const setFilter = (filter: GetAttendanceFilters) => {
		setFilters((curr) => ({ ...curr, ...filter }));
	};

	const onOrderChange = (
		sort_order?: TOrderBy,
		sort_by?: GetAttendanceFilters["sort_by"]
	) => {
		if (sort_order === "" || !sort_order || !sort_by) {
			sort_order = undefined;
			sort_by = undefined;
		}

		setFilters((curr) => ({ ...curr, sort: sort_order, sort_by }));
	};

	const openStartAttendanceModal = () => {
		openModal({
			id: ModalIds.StartAttendance,
			title: "Modals.StartAttendance.Title",
			children: <StartAttendanceModal onClose={loadAttendances} />,
		});
	};

	const seeAttendance = (attendanceId: string) => {
		const to = Pages.StoreAttendanceView.replace(
			":attendanceId",
			attendanceId.toString()
		);

		navigate(to);
	};

	const finishAttendance = async (attendanceId: string) => {
		try {
			await AttendancesService.finish(attendanceId);
			loadAttendances();
		} catch (error) {
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
		loadAttendances();
	}, [loadAttendances]);

	return (
		<MainContainer showAdminHeader>
			<div className="attendances">
				<header className="attendances-header">
					<h2 className="page-title">{t("StoreAttendances.Title")}</h2>
				</header>

				<section className="attendances-filters">
					<ChipWrapper>
						<Chip
							active={!filters.status}
							onClick={() => setFilter({ status: undefined })}
							theme="secondary"
						>
							{t("StoreAttendances.Filters.All")}
						</Chip>
						<Chip
							onClick={() => setFilter({ status: TAttendanceStatus.CLOSED })}
							active={filters.status === TAttendanceStatus.CLOSED}
							theme="secondary"
						>
							{t("StoreAttendances.Filters.Finished")}
						</Chip>
						<OrderBy
							label="StoreAttendances.Filters.Interval"
							onOrderChange={(order) => onOrderChange(order, "started_at")}
						/>
					</ChipWrapper>
					<Button onClick={openStartAttendanceModal}>
						{t("StoreAttendances.Buttons.Add")}
					</Button>
				</section>

				<main className="attendances-table">
					<header className="attendances-table-header">
						{/* <span>{t("StoreAttendances.Table.Headers.Id")}</span> */}
						<span>{t("StoreAttendances.Table.Headers.Code")}</span>
						<span>{t("StoreAttendances.Table.Headers.Status")}</span>
						<span>{t("StoreAttendances.Table.Headers.Start")}</span>
						<span>{t("StoreAttendances.Table.Headers.End")}</span>
						<span>{t("StoreAttendances.Table.Headers.TablesCount")}</span>
						<span>{t("StoreAttendances.Table.Headers.Actions")}</span>
					</header>
					<div className="attendances-table-body">
						{attendances.map((attendance, index) => (
							<div key={index} className="attendances-table-item">
								{/* <span>{attendance._id}</span> */}
								<span>{attendance.code}</span>
								<span className={attendance.status}>
									{t(`Generics.AttendanceStatus.${attendance.status}`)}
								</span>
								<span>
									{format(
										new Date(attendance.created_at),
										t("Generics.Dates.Long.Format")
									)}
								</span>
								<span>
									{attendance.closed_at &&
										format(
											new Date(attendance.closed_at),
											t("Generics.Dates.Long.Format")
										)}
									{!attendance.closed_at && t("Generics.EmptySign")}
								</span>
								<span>{attendance.tables_count}</span>
								<span
									role="button"
									className="table-action flex align-center justify-center"
								>
									<Dropdown
										position={
											index < attendances.length - 1
												? "bottomRight"
												: "topRight"
										}
										size="large"
										anchor={<MoreVertical className="link link-primary" />}
									>
										<DropdownItem
											customClass="dropdown-item"
											onClick={() => seeAttendance(attendance._id)}
										>
											<Eye size={16} /> Ver
										</DropdownItem>
										<DropdownSeparator />
										<DropdownSeparator />
										<DropdownItem
											onClick={() => finishAttendance(attendance._id)}
											customClass="dropdown-item"
											disabled={attendance.status === TAttendanceStatus.CLOSED}
										>
											<X size={16} /> Finalizar
										</DropdownItem>
									</Dropdown>
								</span>
							</div>
						))}
					</div>
					<footer className="attendances-table-footer"></footer>
				</main>
			</div>
		</MainContainer>
	);
};

export { StoreAttendancesPage };
