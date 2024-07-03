import { Plus } from "react-feather";
import { Button, Input, OrderBy } from "../../../../components";
import "./styles.scss";

interface TablesProps {}

const Tables: React.FC<TablesProps> = () => {
	return (
		<div className="tables">
			<h4 className="tables-title">Mesas</h4>
			<div className="tables-actions">
				<div className="tables-filters">
					<OrderBy label="N° Mesa" />
				</div>
				<Button>
					<Plus size={14} /> ADICIONAR
				</Button>
			</div>
			<div className="tables-grid">
				{Array.from({ length: 10 }).map((_, index) => (
					<div className="card card-gray" key={index}>
						<div className="flex-row-text">
							<span className="tables-info-number">Mesa {index}</span>
							<div className="chip-status chip-status-primary">{"OCUPADA"}</div>
						</div>
						<span className="table-info-bartender"></span>
						<Button className="fill-row" theme="danger">DESATIVAR</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export { Tables };
