import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct, Pages, UpdateOrderProductPayload } from "../../@types";
import { WaiterOrdersService } from "../../api";
import { Button, Chip, MainContainer } from "../../components";
import { OnOrderActions, RootState } from "../../store";
import { ProductsRowCard } from "../WaiterProducts/components";
import "./styles.scss";

interface WaiterOrderProductsPageProps {}

const WaiterOrderProductsPage: React.FC<WaiterOrderProductsPageProps> = () => {
	const { orderId } = useParams();
	const { order } = useSelector((state: RootState) => state.onOrder);
	const { t } = useTranslation();

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
		// const newStatus =
		// 	filters.product_status === "delivered" ? "ordered" : "delivered";
		// setFilters({ ...filters, product_status: newStatus });
	};

	const dispatch = useDispatch();

	const getOrder = useCallback(async () => {
		try {
			if (!orderId) {
				navigate(Pages.WaiterHome);
				return;
			}

			const { data } = await WaiterOrdersService.getById(orderId);
			if (data) {
				dispatch(OnOrderActions.setOrder(data));
			}
			if (!data) {
				navigate(Pages.WaiterHome);
			}
		} catch (error) {
			navigate(Pages.WaiterHome);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const changeOrderProductQuantity = async (
		product: IProduct,
		quantity: number,
		order_product_id: string
	) => {
		if (!orderId) {
			return;
		}

		try {
			const payload: UpdateOrderProductPayload = {
				quantity,
				order_product_id,
			};

			await WaiterOrdersService.update_order_products(orderId || "", [payload]);

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
						<span
							className="page-title"
							dangerouslySetInnerHTML={{
								__html: t("WaiterOrderProducts.Title"),
							}}
						></span>
					</header>

					<div>
						<Chip
							// active={filters.product_status === "delivered"}
							onClick={seeDeliveredProducts}
							theme="secondary"
							clickable
						>
							{t("WaiterOrderProducts.Labels.SeeServed")}
						</Chip>
					</div>

					<div className="w-o-products-list no-scroll">
						{order?.items.map((op, index) => {
							const product =
								typeof op.product !== "string" ? op.product : ({} as IProduct);

							return (
								<ProductsRowCard
									product={product}
									key={index}
									showChangeButtons={op.status === "PENDING"}
									onChange={(product, n) => {
										changeOrderProductQuantity(product, n, op._id);
									}}
									quantity={op.quantity}
									slashedText={op.status === "DELIVERED"}
								/>
							);
						})}
					</div>

					<div className="w-o-products-total">
						<span>{t("WaiterOrderProducts.Labels.Total")}</span>
						<span>R$ {order?.total}</span>
					</div>

					<footer className="w-o-products-actions">
						<Button
							theme="primary"
							className="fill-row"
							onClick={goToAddProducts}
						>
							{t("WaiterOrderProducts.Buttons.SeeAll")}
						</Button>
					</footer>
				</main>
			</div>
		</MainContainer>
	);
};

export { WaiterOrderProductsPage };
