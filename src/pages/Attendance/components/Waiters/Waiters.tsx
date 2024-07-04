import { Plus } from "react-feather";
import { Button, Input, OrderBy } from "../../../../components";
import "./styles.scss";

interface WaitersProps {}

const Waiters: React.FC<WaitersProps> = () => {
	return (
		<div className="waiters">
			<h4 className="waiters-title">Garçons</h4>
			<div className="waiters-actions">
				<div className="waiters-filters">
					<Input className="waiters-search" placeholder="Buscar..." />
					<OrderBy label="Nome" />
				</div>
				<Button>
					<Plus size={14} /> ADICIONAR
				</Button>
			</div>
			<div className="waiters-grid">
				{Array.from({ length: 10 }).map((_, index) => (
					<div className="card card-gray" key={index}>
						<div className="flex-col-text">
							<span className="waiters-info-name">{index}</span>
							<span className="waiters-info-phone">{"(88) 9999-9999"}</span>
							<span className="waiters-info-email">
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

export { Waiters };
