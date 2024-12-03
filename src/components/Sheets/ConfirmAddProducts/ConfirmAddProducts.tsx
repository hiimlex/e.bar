import { AxiosError } from "axios";
import { useToast } from "leux";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	ConfirmAddProductsProps,
	CreateOrderProductPayload,
	IProduct,
} from "../../../@types";
import { WaiterOrdersService } from "../../../api";
import { ProductsRowCard } from "../../../pages/WaiterProducts/components";
import { Button } from "../../Button";

import S from "./ConfirmAddProducts.styles";

const ConfirmAddProducts: React.FC<ConfirmAddProductsProps> = ({
	productList,
	cancel,
	onChange,
	orderId,
	onConfirm,
}) => {
	const { t } = useTranslation();
	const ToastService = useToast();
	const [adding, setAdding] = useState(false);

	const onAddProduct = (product: IProduct, quantity: number) => {
		const newToAddProducts = JSON.parse(JSON.stringify(productList));

		if (!newToAddProducts[product._id]) {
			newToAddProducts[product._id] = { product, quantity };
		}

		if (newToAddProducts[product._id]) {
			newToAddProducts[product._id].quantity = quantity;

			if (+newToAddProducts[product._id].quantity === 0) {
				delete newToAddProducts[product._id];
			}
		}

		onChange && onChange(newToAddProducts);
	};

	const confirmAddProducts = async () => {
		setAdding(true);

		try {
			const arr: CreateOrderProductPayload[] = Object.values(productList).map(
				({ product, quantity }) => ({
					product_id: product._id,
					quantity,
				})
			);

			await WaiterOrdersService.add_order_products(orderId, arr);

			setAdding(false);

			onConfirm && onConfirm();
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
			setAdding(false);
		}
	};

	return (
		<S.Container>
			<S.List>
				{Object.values(productList).map(({ product, quantity }) => (
					<ProductsRowCard
						key={product._id}
						product={product}
						quantity={quantity}
						showChangeButtons
						onChange={onAddProduct}
					/>
				))}
			</S.List>

			<S.Footer>
				<Button
					className="fill-row"
					theme="secondary"
					variant="outlined"
					onClick={cancel}
				>
					{t("WaiterAddProducts.Buttons.Cancel")}
				</Button>
				<Button
					className="fill-row"
					theme="secondary"
					loading={adding}
					onClick={confirmAddProducts}
				>
					{t("WaiterAddProducts.Buttons.Confirm")}
				</Button>
			</S.Footer>
		</S.Container>
	);
};

export default ConfirmAddProducts;
