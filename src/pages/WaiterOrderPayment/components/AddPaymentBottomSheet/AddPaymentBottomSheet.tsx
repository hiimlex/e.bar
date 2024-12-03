import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
	FieldErrorsType,
	IOrder,
	IPaymentForm,
	TPaymentMethods,
} from "../../../../@types";
import { Button, Icons, Input } from "../../../../components";

import { Box } from "leux";
import { Paperclip } from "react-feather";
import { useTheme } from "styled-components";
import { Styled } from "../../../../styles";
import S from "./AddPaymentBottomSheet.styles";
import svg from "../../../../assets/cash.svg";

interface IAddPaymentBottomSheetProps {
	order: IOrder;
	onAddPayment: () => void;
}

const AddPaymentBottomSheet: React.FC<IAddPaymentBottomSheetProps> = ({
	order,
}) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const [method, setMethod] = useState<TPaymentMethods>("pix");
	const {
		control,
		formState: { isValid },
		watch,
		handleSubmit,
	} = useForm<IPaymentForm>({
		mode: "all",
	});
	const values = watch();

	const selectPaymentMethod = (method: TPaymentMethods) => {
		setMethod(method);
	};

	const chargeBack = useMemo(() => {
		if (order?.total) {
			if (values.receivedValue > order.total) {
				return values.receivedValue - order.total;
			}
		}

		return 0;
	}, [values.receivedValue]);

	return (
		<S.Container>
			<S.PaymentMethod className="w-op-methods">
				<Styled.Typography.Label>
					{t("WaiterOrderPayment.Labels.PaymentMethod")}
				</Styled.Typography.Label>
				<Box
					flex
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					customClass="gap-4"
				>
					<S.PaymentMethodItem
						role="button"
						active={method === "pix"}
						onClick={() => selectPaymentMethod("pix")}
					>
						<Icons.PixSVG
							fill={method === "pix" ? theme.colors.primary : theme.text.dark}
						/>
						<label className="label">
							{t("WaiterOrderPayment.Labels.Pix")}
						</label>
					</S.PaymentMethodItem>
					<S.PaymentMethodItem
						active={method === "credit-card"}
						role="button"
						onClick={() => selectPaymentMethod("credit-card")}
					>
						<Icons.CreditCardSVG
							fill={
								method === "credit-card"
									? theme.colors.primary
									: theme.text.dark
							}
						/>
						<label>{t("WaiterOrderPayment.Labels.CreditCard")}</label>
					</S.PaymentMethodItem>
					<S.PaymentMethodItem
						role="button"
						onClick={() => selectPaymentMethod("cash")}
						active={method === "cash"}
					>
						<Icons.CashSVG
							fill={method === "cash" ? theme.colors.primary : theme.text.dark}
						/>
						<label>{t("WaiterOrderPayment.Labels.Cash")}</label>
					</S.PaymentMethodItem>
				</Box>
			</S.PaymentMethod>

			<Box>
				<Styled.Typography.FieldLabel>
					{t("WaiterOrderPayment.Labels.ReceivedValue")}
				</Styled.Typography.FieldLabel>
				<Controller
					control={control}
					name="receivedValue"
					rules={{
						required: {
							value: true,
							message: FieldErrorsType.Required,
						},
						min: {
							value: order?.total || 0,
							message: FieldErrorsType.Min,
						},
					}}
					render={({ field, fieldState: { error } }) => (
						<Input
							hasPrefix
							prefixContent={<span className="text-body-1">R$</span>}
							value={field.value}
							placeholder="0"
							type="number"
							hideLabel
							onChangeValue={(value) => {
								field.onChange(value);
							}}
							errorMessage={error?.message}
							showError={!!error}
							errorValue={{ min: order?.total || 0 }}
						/>
					)}
				/>
			</Box>
			{method === "pix" && (
				<Box flex flexDirection="column" customClass="gap-3">
					<Box>
						<Styled.Typography.FieldLabel>
							{t("WaiterOrderPayment.Labels.Name")}
						</Styled.Typography.FieldLabel>
						<Controller
							control={control}
							name="name"
							rules={{
								required: {
									value: true,
									message: FieldErrorsType.Required,
								},
							}}
							render={({ field, fieldState: { error } }) => (
								<Input
									placeholder={t("WaiterOrderPayment.Labels.Name")}
									value={field.value}
									hideLabel
									onChangeValue={(value) => {
										field.onChange(value);
									}}
									errorMessage={error?.message}
									showError={!!error}
								/>
							)}
						/>
					</Box>
					<Box>
						<Styled.Typography.FieldLabel>
							{t("WaiterOrderPayment.Labels.Attachment")}
						</Styled.Typography.FieldLabel>
						<Controller
							control={control}
							name="attachment"
							rules={{
								required: {
									value: true,
									message: FieldErrorsType.Required,
								},
							}}
							render={({ field, fieldState: { error } }) => (
								<Input
									hideLabel
									onChange={(event) => {
										const {
											target: { files },
										} = event;

										if (files && files[0]) {
											field.onChange({
												target: { value: files[0] },
												name: field.name,
											});
										}
									}}
									hasSuffix
									suffixContent={<Paperclip color={theme.colors.gray300} />}
									type="file"
									errorMessage={error?.message}
									showError={!!error}
								/>
							)}
						/>
					</Box>
				</Box>
			)}
			{method === "credit-card" && (
				<Box flex flexDirection="column" customClass="gap-3">
					<Box>
						<Styled.Typography.FieldLabel className="text-subtitle-2">
							{t("WaiterOrderPayment.Labels.NF")}
						</Styled.Typography.FieldLabel>
						<Controller
							control={control}
							rules={{
								required: {
									value: true,
									message: FieldErrorsType.Required,
								},
							}}
							name="nf"
							render={({ field, fieldState: { error } }) => (
								<Input
									hasPrefix
									prefixContent={<span className="text-body-1">#</span>}
									value={field.value}
									placeholder="0"
									hideLabel
									type="number"
									onChangeValue={(value) => {
										field.onChange(value);
									}}
									errorMessage={error?.message}
									showError={!!error}
								/>
							)}
						/>
					</Box>
					<Box>
						<Styled.Typography.FieldLabel>
							{t("WaiterOrderPayment.Labels.Attachment")}
						</Styled.Typography.FieldLabel>
						<Controller
							control={control}
							name="name"
							rules={{
								required: {
									value: true,
									message: FieldErrorsType.Required,
								},
							}}
							render={({ field, fieldState: { error } }) => (
								<Input
									value={field.value}
									hideLabel
									onChangeValue={(value) => {
										field.onChange(value);
									}}
									hasSuffix
									suffixContent={<Paperclip color={theme.colors.gray300} />}
									type="file"
									errorMessage={error?.message}
									showError={!!error}
								/>
							)}
						/>
					</Box>
				</Box>
			)}
			{method === "cash" && (
				<div className="flex flex-row justify-between">
					<Styled.Typography.BodyBold>
						{t("WaiterOrderPayment.Labels.PurchaseChange")}
					</Styled.Typography.BodyBold>
					<Styled.Typography.BodyBold>
						R$ {chargeBack}
					</Styled.Typography.BodyBold>
				</div>
			)}
			<Box flex flexDirection="row" alignItems="center" customClass="gap-3">
				<Button className="fill-row" theme="default">
					{t("WaiterOrderPayment.Buttons.Cancel")}
				</Button>
				<Button className="fill-row" theme="primary" disabled={!isValid}>
					{t("WaiterOrderPayment.Buttons.Confirm")}
				</Button>
			</Box>
		</S.Container>
	);
};

export default AddPaymentBottomSheet;
