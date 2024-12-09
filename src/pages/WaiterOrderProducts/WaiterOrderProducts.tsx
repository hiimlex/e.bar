import { AxiosError } from "axios";
import { Box, useToast } from "leux";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	IListOrdersFilters,
	IProduct,
	Pages,
	UpdateOrderProductPayload,
} from "../../@types";
import { WaiterOrdersService } from "../../api";
import { Button, Chip, MainContainer, ProductRowCard } from "../../components";
import { OnOrderActions, RootState } from "../../store";

import S from "./WaiterOrderProducts.styles";
import { Styled } from "../../styles";
import { FileMinus } from "react-feather";

const WaiterOrderProductsPage: React.FC = () => {
	const { orderId } = useParams();
	const { order } = useSelector((state: RootState) => state.onOrder);
	const { t } = useTranslation();
	const ToastService = useToast();
	const [filters, setFilters] = useState<IListOrdersFilters>({
		order_product_status: "PENDING",
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
		const order_product_status: IListOrdersFilters["order_product_status"] =
			filters?.order_product_status?.includes("DELIVERED")
				? "PENDING"
				: ["DELIVERED", "PENDING"];

		setFilters({ ...filters, order_product_status });
	};

	const dispatch = useDispatch();

	const getOrder = useCallback(async () => {
		try {
			if (!orderId) {
				navigate(Pages.WaiterHome);
				return;
			}

			const { data } = await WaiterOrdersService.getById(orderId, filters);

			if (data) {
				dispatch(OnOrderActions.setOrder(data));
			}

			if (!data) {
				navigate(Pages.WaiterHome);
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
			navigate(Pages.WaiterHome);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

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
		getOrder();
	}, [getOrder]);

	return (
		<MainContainer wrapperRef={wrapperRef} showGoBack onGoBack={goBack} showMenu={false}>
			<S.Container>
				<S.Content>
					<S.Header>
						<span
							className="page-title"
							dangerouslySetInnerHTML={{
								__html: t("WaiterOrderProducts.Title"),
							}}
						></span>
					</S.Header>

					<S.Filters>
						<Chip
							active={filters.order_product_status?.includes("DELIVERED")}
							onClick={seeDeliveredProducts}
							theme="secondary"
							clickable
						>
							{t("WaiterOrderProducts.Labels.SeeServed")}
						</Chip>
					</S.Filters>

					<Box
						flex
						flexDirection="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Styled.Typography.Subtitle2>
							{t("WaiterOrderProducts.Labels.Total")}
						</Styled.Typography.Subtitle2>
						<Styled.Typography.Subtitle2>
							R$ {order?.total}
						</Styled.Typography.Subtitle2>
					</Box>

					<S.List className="no-scroll">
						{order?.items.map((op, index) => {
							const product =
								typeof op.product !== "string" ? op.product : ({} as IProduct);

							return (
								<ProductRowCard
									product={product}
									key={index}
									opStatus={op.status}
									showChangeButtons={op.status === "PENDING"}
									onChange={(product, n) => {
										changeOrderProductQuantity(product, n, op._id);
									}}
									quantity={op.quantity}
									slashedText={op.status === "DELIVERED"}
								/>
							);
						})}

						{!order?.items ||
							(order?.items.length === 0 && (
								<Styled.Empty>
									<FileMinus size={32} />
									<Styled.Typography.Caption>
										{t("Empty.Products")}
									</Styled.Typography.Caption>
								</Styled.Empty>
							))}
					</S.List>

					<S.Footer className="w-o-products-actions">
						<Button
							theme="primary"
							className="fill-row"
							onClick={goToAddProducts}
						>
							{t("WaiterOrderProducts.Buttons.SeeAll")}
						</Button>
					</S.Footer>
				</S.Content>
			</S.Container>
		</MainContainer>
	);
};

export { WaiterOrderProductsPage };
