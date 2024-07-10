import { useCallback, useEffect, useState } from "react";
import { Plus } from "react-feather";
import { ITable, TableFilters } from "../../../../@types";
import { TablesService } from "../../../../api";
import { Button, OrderBy, Spinner } from "../../../../components";
import "./styles.scss";

interface TablesProps {}

const Tables: React.FC<TablesProps> = () => {
	const [tables, setTables] = useState<ITable[]>([]);

	const [loading, setLoading] = useState(false);
	const [adding, setAdding] = useState(false);

	const [updating, setUpdating] = useState<number | undefined>(undefined);

	const [filters, setFilters] = useState<TableFilters>({});

	const fetchTables = useCallback(
		async (shouldLoad = true) => {
			try {
				setLoading(shouldLoad);
				const { data } = await TablesService.fetchAll(filters);
				setTables(data);

				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		},
		[filters]
	);

	const createTable = async () => {
		setAdding(true);
		try {
			await TablesService.create();

			await fetchTables(false);

			setAdding(false);
		} catch (error) {
			setAdding(false);
			console.error(error);
		}
	};

	const activate = async (tableId: number) => {
		await updateTable(tableId, { is_active: true });
	};

	const deactivate = async (tableId: number) => {
		await updateTable(tableId, { is_active: false });
	};

	const updateTable = async (tableId: number, data: Partial<ITable>) => {
		try {
			setUpdating(tableId);

			await TablesService.update(tableId.toString(), data);

			await fetchTables(false);

			setUpdating(undefined);
		} catch (error) {
			console.error(error);
			setUpdating(undefined);
		}
	};

	const onOrderBy = (
		sort_key: TableFilters["sort_key"],
		sort: TableFilters["sort"]
	) => {
		if (sort === "") {
			sort = undefined;
			sort_key = undefined;
		}

		setFilters((curr) => ({ ...curr, sort, sort_key }));
	};

	useEffect(() => {
		fetchTables();
	}, [fetchTables]);

	return (
		<div className="tables">
			<h4 className="tables-title">Mesas</h4>
			<div className="tables-actions">
				<div className="tables-filters">
					<OrderBy
						label="N° Mesa"
						onOrderChange={(direction) => onOrderBy("id", direction)}
					/>
				</div>
				<Button loading={adding} onClick={createTable}>
					<Plus size={14} /> Adicionar
				</Button>
			</div>
			{!loading && (
				<div className="tables-grid">
					{tables.map((table) => (
						<div className="card card-gray" key={table.id}>
							<div className="flex-row-text">
								<span className="tables-info-number">Mesa {table.id}</span>
								<div className="chip-status chip-status-primary">
									{table.in_use ? "OCUPADA" : "LIVRE"}
								</div>
							</div>
							<span className="table-info-bartender">
								{table.waiter_name ? `Garçom ${table.waiter_name}` : "---"}
							</span>
							{table.is_active ? (
								<Button
									className="fill-row"
									theme="danger"
									loading={updating === table.id}
									onClick={() => deactivate(table.id)}
								>
									Desativar
								</Button>
							) : (
								<Button
									className="fill-row"
									theme="primary"
									loading={updating === table.id}
									onClick={() => activate(table.id)}
								>
									Ativar
								</Button>
							)}
						</div>
					))}
				</div>
			)}

			{loading && (
				<div className="waiters-loading">
					<Spinner size={48} theme="primary" />
					Carregando Mesas...
				</div>
			)}
		</div>
	);
};

export { Tables };
