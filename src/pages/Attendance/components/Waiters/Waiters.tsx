import { Plus } from "react-feather";
import { Button, Input, OrderBy, Spinner } from "../../../../components";
import "./styles.scss";
import { useCallback, useEffect, useState } from "react";
import { IWaiter, WaitersFilters } from "../../../../@types";
import { WaitersService } from "../../../../api";
import { useDebounceValue } from "usehooks-ts";

interface WaitersProps {}

const Waiters: React.FC<WaitersProps> = () => {
	const [waiters, setWaiters] = useState<IWaiter[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const [filters, setFilters] = useState<WaitersFilters>({});
	const [debouncedValue, setValue] = useDebounceValue(filters.nome, 300);

	const fetchWaiters = useCallback(async () => {
		setLoading(true);
		// Fetch waiters from API
		try {
			const { data } = await WaitersService.fetchAll(filters);

			setWaiters(data);
			setLoading(false);
		} catch (error) {
			setWaiters([]);
			setLoading(false);
		}
	}, [filters]);

	const onSearch = (search: string) => {
		setValue(search);
	};

	const onOrderBy = (
		order: WaitersFilters["ordem"],
		direction: WaitersFilters["direcao"]
	) => {
		if (direction === "") {
			order = undefined;
			direction = undefined;
		}

		setFilters((curr) => ({ ...curr, ordem: order, direcao: direction }));
	};

	useEffect(() => {
		fetchWaiters();
	}, [fetchWaiters]);

	useEffect(() => {
		setFilters((curr) => ({ ...curr, nome: debouncedValue }));
	}, [debouncedValue]);

	return (
		<div className="waiters">
			<h4 className="waiters-title">Garçons</h4>
			<div className="waiters-actions">
				<div className="waiters-filters">
					<Input
						className="waiters-search"
						placeholder="Buscar..."
						onChangeValue={(value) => onSearch(value)}
					/>
					<OrderBy
						label="Nome"
						onOrderChange={(direction) => onOrderBy("nome", direction)}
					/>
				</div>
				<Button>
					<Plus size={14} /> ADICIONAR
				</Button>
			</div>
			{!loading && (
				<div className="waiters-grid">
					{waiters.map((waiter, index) => (
						<div className="card card-gray" key={waiter.id}>
							<div className="flex-col-text">
								<span className="waiters-info-name">{waiter.name}</span>
								<span className="waiters-info-phone">{waiter.phone}</span>
								<span className="waiters-info-email">{waiter.email}</span>
							</div>
							<Button className="fill-row" theme="danger">
								DESATIVAR
							</Button>
						</div>
					))}
				</div>
			)}

			{loading && (
				<div className="waiters-loading">
					<Spinner size={48} theme="primary" />
					Carregando Garçons...
				</div>
			)}
		</div>
	);
};

export { Waiters };
