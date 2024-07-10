import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct, OrdersFilter, Pages } from "../../@types";
import { OrdersService } from "../../api";
import { Button, Chip, MainContainer } from "../../components";
import { OnOrderActions, RootState } from "../../store";
import { ProductsRowCard } from "../WaiterProducts/components";
import "./styles.scss";

interface WaiterOrderProductsPageProps {}

const WaiterOrderProductsPage: React.FC<WaiterOrderProductsPageProps> = () => {
	const { orderId } = useParams();
	const { order } = useSelector((state: RootState) => state.onOrder);

	const [filters, setFilters] = useState<OrdersFilter>({
		order_id: +(orderId || 0),
		product_status: "ordered",
	});

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();

	const goBack = () => {
		const to = Pages.WaiterOrder.replace(":orderId", orderId || "");

		navigate(to);
	};

	const goToAddProducts = () => {
		const to = Pages.WaiterAddProducts.replace(":orderId", orderId || "");

		navigate(to);
	};

	const seeDeliveredProducts = () => {
		const newStatus =
			filters.product_status === "delivered" ? "ordered" : "delivered";

		setFilters({ ...filters, product_status: newStatus });
	};

	const dispatch = useDispatch();

	const getOrder = useCallback(async () => {
		try {
			const { data } = await OrdersService.fetchAll(filters);

			if (data) {
				dispatch(OnOrderActions.setOrder(data[0]));
			} else {
				navigate(Pages.WaiterHome);
			}
		} catch (error) {
			navigate(Pages.WaiterHome);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

	const changeOrderProductQuantity = async (
		product: IProduct,
		quantity: number,
		order_product_id: number
	) => {
		if (!orderId) {
			return;
		}

		try {
			const payload = {
				product_id: product.id,
				quantity,
				order_product_id,
			};

			await OrdersService.add_order_products(orderId || "", [payload]);

			await getOrder();
		} catch (error) {
			console.log("Error updating order product", error);
		}
	};

	useEffect(() => {
		getOrder();
	}, [getOrder]);

	return (
		<MainContainer wrapperRef={wrapperRef} showGoBack onGoBack={goBack}>
			<div className="w-o-products">
				<main className="w-o-products-content">
					<header className={`w-o-products-header`}>
						<span className="page-title">
							Produtos na
							<br />
							Comanda
						</span>
					</header>

					<div>
						<Chip
							active={filters.product_status === "delivered"}
							onClick={seeDeliveredProducts}
							theme="secondary"
							clickable
						>
							Ver servidos
						</Chip>
					</div>

					<div className="w-o-products-list no-scroll">
						{order?.products.map((op, index) => (
							<ProductsRowCard
								product={{
									id: op.product_id,
									...op,
									stock: op.status === "ordered" ? op.stock : op.delivered,
								}}
								key={index}
								showChangeButtons={op.status === "ordered"}
								onChange={(product, n) =>
									changeOrderProductQuantity(product, n, op.order_product_id)
								}
								quantity={op.quantity}
								slashedText={op.status === "delivered"}
							/>
						))}
					</div>

					<div className="w-o-products-total">
						<span>Total</span>
						<span>R$ {order?.total}</span>
					</div>

					<footer className="w-o-products-actions">
						<Button
							theme="primary"
							className="fill-row"
							onClick={goToAddProducts}
						>
							Ver Cardápio
						</Button>
					</footer>
				</main>
			</div>
		</MainContainer>
	);
};

export default WaiterOrderProductsPage;
