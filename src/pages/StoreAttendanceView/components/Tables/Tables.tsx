import { useCallback, useEffect, useState } from "react";
import { Plus } from "react-feather";
import { ITable, TOrderBy, ITableFilters } from "../../../../@types";
import { AttendancesService, TablesService } from "../../../../api";
import { Button, OrderBy, Spinner } from "../../../../components";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
	AppDispatch,
	OnAttendanceActions,
	RootState,
	onAttendancefetchAttendance,
} from "../../../../store";

interface TablesProps {}

const Tables: React.FC<TablesProps> = () => {
	const { t } = useTranslation();
	const [tables, setTables] = useState<ITable[]>([]);

	const [loading, setLoading] = useState(false);
	const [adding, setAdding] = useState(false);

	const [updating, setUpdating] = useState<number | undefined>(undefined);
	const { attendance } = useSelector((state: RootState) => state.onAttendance);

	const [filters, setFilters] = useState<ITableFilters>({
		limit: attendance?.tables_count,
	});

	const dispatch = useDispatch<AppDispatch>();

	const fetchTables = useCallback(
		async (shouldLoad = true) => {
			try {
				setLoading(shouldLoad);
				const { data } = await TablesService.fetchAll(filters);
				setTables(data.content);

				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		},
		[filters]
	);

	useEffect(() => {
		setFilters((curr) => ({ ...curr, limit: attendance?.tables_count }));
	}, [attendance]);

	const addTableToAttendance = async () => {
		setAdding(true);
		try {
			if (!attendance) {
				return;
			}

			await AttendancesService.addTableToAttendance(attendance._id);

			await fetchTables(false);

			await dispatch(onAttendancefetchAttendance());

			setAdding(false);
		} catch (error) {
			setAdding(false);
			console.error(error);
		}
	};

	const activate = async (tableId: number) => {
		await updateTable(tableId, { enabled: true });
	};

	const deactivate = async (tableId: number) => {
		await updateTable(tableId, { enabled: false });
	};

	const updateTable = async (tableId: number, data: Partial<ITable>) => {
		try {
			setUpdating(tableId);

			await TablesService.update(tableId.toString(), data);

			await fetchTables(false);

			await dispatch(onAttendancefetchAttendance());

			setUpdating(undefined);
		} catch (error) {
			console.error(error);
			setUpdating(undefined);
		}
	};

	const onOrderBy = (sort?: TOrderBy, sort_by?: ITableFilters["sort_by"]) => {
		if (sort === "") {
			sort = undefined;
			sort_by = undefined;
		}

		setFilters((curr) => ({ ...curr, sort, sort_by }));
	};

	useEffect(() => {
		fetchTables();
	}, [fetchTables]);

	return (
		<div className="tables">
			<div className="tables-actions">
				<div className="tables-filters">
					<OrderBy
						label="N° Mesa"
						onOrderChange={(sort) => onOrderBy(sort, "number")}
					/>
				</div>
				<Button loading={adding} onClick={addTableToAttendance}>
					<Plus size={14} /> {t("StoreAttendanceView.General.Buttons.Add")}
				</Button>
			</div>
			{!loading && (
				<div className="tables-grid">
					{tables.map((table) => (
						<div
							className={`card card-gray ${
								table.enabled ? "table-card" : "table-not-active"
							}`}
							key={table._id}
						>
							<div className="flex-row-text">
								<span className="tables-info-number">Mesa {table.number}</span>
								<div className="chip-status chip-status-primary">
									{t(`Generics.TableStatus.${table.in_use ? "InUse" : "Free"}`)}
								</div>
							</div>
							<span className="table-info-bartender">
								{table.in_use_by
									? t(`StoreAttendanceView.General.Labels.Waiter`, {
											name:
												typeof table.in_use_by !== "string" &&
												table.in_use_by.name
													? table.in_use_by.name
													: "---",
									  })
									: "---"}
							</span>
							{/* {table.enabled ? (
								<Button
									className="fill-row"
									theme="danger"
									loading={updating === table._id}
									onClick={() => deactivate(table._id)}
								>
									{t("StoreAttendanceView.General.Buttons.Disable")}
								</Button>
							) : (
								<Button
									className="fill-row"
									theme="secondary"
									loading={updating === table._id}
									onClick={() => activate(table._id)}
								>
									{t("StoreAttendanceView.General.Buttons.Enable")}
								</Button>
							)} */}
						</div>
					))}
				</div>
			)}

			{loading && (
				<div className="tables-loading">
					<Spinner size={48} theme="primary" />
					{t("Loaders.AttendanceTables")}
				</div>
			)}
		</div>
	);
};

export { Tables };
