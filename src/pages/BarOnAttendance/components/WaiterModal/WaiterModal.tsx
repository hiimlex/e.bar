import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateWaiterPayload } from "../../../../@types";
import { WaitersService } from "../../../../api";
import { Button, Input } from "../../../../components";
import { useModal } from "../../../../hooks";
import "./styles.scss";
import { Checkbox } from "leux";
import { useTranslation } from "react-i18next";

interface WaiterModalProps {
	modalId?: string;
	waiterId?: number;
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
		const { email, name, password, phone, is_admin } = data;
		setLoading(true);

		if (mode === "create") {
			// create waiter
			try {
				await WaitersService.create({ email, name, password, phone, is_admin });

				setLoading(false);

				if (modalId) {
					closeModal(modalId);
				}

				if (beforeClose) {
					beforeClose();
				}
			} catch (error) {
				setLoading(false);
			}
		}

		if (mode === "edit") {
			if (!waiterId) {
				setLoading(false);

				return;
			}

			// edit waiter
			try {
				await WaitersService.update(waiterId.toString(), {
					email,
					name,
					phone,
					is_admin,
				});

				setLoading(false);

				if (modalId) {
					closeModal(modalId);
				}

				if (beforeClose) {
					beforeClose();
				}
			} catch (error) {
				setLoading(false);
			}
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
						disabled={disabled}
						value={value}
						fieldKey={name}
						onChange={onChange}
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

			<Controller
				control={control}
				name="is_admin"
				render={({ field }) => (
					<Checkbox
						fieldKey={field.name}
						customClass="start-attendance-checkbox"
						onChange={() => field.onChange(field.value)}
						label={t("Modals.Waiter.Fields.IsAdmin")}
						checkBoxProps={{
							onBlur: field.onBlur,
						}}
					/>
				)}
			/>

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
