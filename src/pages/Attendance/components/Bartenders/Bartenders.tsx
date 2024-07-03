import { Plus } from "react-feather";
import { Button, Input, OrderBy } from "../../../../components";
import "./styles.scss";

interface BartendersProps {}

const Bartenders: React.FC<BartendersProps> = () => {
	return (
		<div className="bartenders">
			<h4 className="bartenders-title">Garçons</h4>
			<div className="bartenders-actions">
				<div className="bartenders-filters">
					<Input className="bartenders-search" placeholder="Buscar..." />
					<OrderBy label="Nome" />
				</div>
				<Button>
					<Plus size={14} /> ADICIONAR
				</Button>
			</div>
			<div className="bartenders-grid">
				{Array.from({ length: 10 }).map((_, index) => (
					<div className="card card-gray" key={index}>
						<div className="flex-col-text">
							<span className="bartenders-info-name">{index}</span>
							<span className="bartenders-info-phone">{"(88) 9999-9999"}</span>
							<span className="bartenders-info-email">
								{index + "@gmail.com"}
							</span>
						</div>
						<Button className="fill-row">DESATIVAR</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export { Bartenders };
