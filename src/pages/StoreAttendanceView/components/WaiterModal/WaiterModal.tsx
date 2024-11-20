import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CreateWaiterPayload } from "../../../../@types";
import { WaitersService } from "../../../../api";
import { Button, Input } from "../../../../components";
import { useModal } from "../../../../hooks";
import { format } from "../../../../utils";
import "./styles.scss";
import { AxiosError } from "axios";
import { useToast } from "leux";

interface WaiterModalProps {
	modalId?: string;
	waiterId?: string;
	initialWaiter?: CreateWaiterPayload;
	beforeClose?: () => void;
	mode?: "edit" | "create";
}

const WaiterModal: React.FC<WaiterModalProps> = ({
	modalId,
	beforeClose,
	initialWaiter,
	mode,
	waiterId,
}) => {
	const { t } = useTranslation();
	const ToastService = useToast();
	const { closeModal } = useModal();
	const [loading, setLoading] = useState(false);
	const {
		handleSubmit,
		control,
		formState: { isValid },
		reset,
	} = useForm<CreateWaiterPayload>({
		mode: "all",
		defaultValues: initialWaiter,
	});

	const onSubmit = async (data: CreateWaiterPayload) => {
		const { email, name, password, phone } = data;
		setLoading(true);

		if (mode === "create") {
			createWaiter(data);
		}

		if (mode === "edit") {
			editWaiter(data);
		}
	};

	const createWaiter = async (data: CreateWaiterPayload) => {
		const { email, name, password, phone } = data;

		try {
			const unmaskPhone = phone.replace(/\D/g, "");

			await WaitersService.create({
				email,
				name,
				password,
				phone: unmaskPhone,
			});

			setLoading(false);

			if (modalId) {
				closeModal(modalId);
			}

			if (beforeClose) {
				beforeClose();
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

			setLoading(false);
		}
	};

	const editWaiter = async (data: CreateWaiterPayload) => {
		const { email, name, password, phone } = data;

		if (!waiterId) {
			setLoading(false);

			return;
		}

		// edit waiter
		try {
			const unmaskPhone = phone.replace(/\D/g, "");

			await WaitersService.update(waiterId.toString(), {
				email,
				name,
				phone: unmaskPhone,
			});

			setLoading(false);

			if (modalId) {
				closeModal(modalId);
			}

			if (beforeClose) {
				beforeClose();
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

			setLoading(false);
		}
	};

	useEffect(() => {
		return () => {
			reset();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<form className="waiter-modal" onSubmit={handleSubmit(onSubmit)}>
			<Controller
				control={control}
				name="name"
				rules={{ required: true }}
				render={({ field: { name, onBlur, onChange, value, disabled } }) => (
					<Input
						placeholder="Modals.Waiter.Fields.Name"
						wrapperClassName="fill-row"
						className="filled-input"
						disabled={disabled}
						value={value}
						fieldKey={name}
						onChange={onChange}
						onBlur={onBlur}
						defaultValue={value}
					/>
				)}
			/>
			<Controller
				control={control}
				name="email"
				rules={{ required: true, pattern: /\S+@\S+\.\S+/ }}
				defaultValue={control._defaultValues.email}
				render={({ field: { name, onBlur, onChange, value, disabled } }) => (
					<Input
						placeholder="Modals.Waiter.Fields.Email"
						wrapperClassName="fill-row"
						className="filled-input"
						disabled={disabled}
						value={value}
						fieldKey={name}
						onChange={onChange}
						onBlur={onBlur}
						defaultValue={value}
					/>
				)}
			/>
			<Controller
				control={control}
				name="phone"
				rules={{ required: true }}
				render={({ field: { name, onBlur, onChange, value, disabled } }) => (
					<Input
						placeholder="Modals.Waiter.Fields.Phone"
						wrapperClassName="fill-row"
						mode="controlled"
						disabled={disabled}
						value={value}
						fieldKey={name}
						onChangeValue={(value) => {
							const formattedPhone = format.phone(value);

							onChange(formattedPhone);
						}}
						onBlur={onBlur}
						defaultValue={value}
					/>
				)}
			/>
			{mode === "create" && (
				<Controller
					control={control}
					name="password"
					rules={{ required: true, minLength: 5 }}
					render={({ field: { name, onBlur, onChange, value, disabled } }) => (
						<Input
							placeholder="Modals.Waiter.Fields.Password"
							type="password"
							wrapperClassName="fill-row"
							disabled={disabled}
							value={value}
							fieldKey={name}
							onChange={onChange}
							onBlur={onBlur}
							defaultValue={value}
						/>
					)}
				/>
			)}

			<Button
				type="submit"
				className="fill-row"
				loading={loading}
				disabled={!isValid}
			>
				{mode === "create"
					? t("Modals.Waiter.Buttons.Add")
					: t("Modals.Waiter.Buttons.Save")}
			</Button>
		</form>
	);
};

export { WaiterModal };
