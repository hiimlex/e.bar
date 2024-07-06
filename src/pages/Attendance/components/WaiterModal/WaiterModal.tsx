import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateWaiterPayload } from "../../../../@types";
import { WaitersService } from "../../../../api";
import { Button, Input } from "../../../../components";
import { useModal } from "../../../../hooks";
import "./styles.scss";

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
	const { closeModal } = useModal();
	const [loading, setLoading] = useState(false);
	const {
		handleSubmit,
		control,
		formState: { isValid, errors },
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
			<span className="waiter-modal-title">
				{mode === "create" ? "Adicionar garçon" : "Editar garçon"}
			</span>

			<Controller
				control={control}
				name="name"
				rules={{ required: true }}
				render={({ field: { name, onBlur, onChange, value, disabled } }) => (
					<Input
						placeholder="Nome"
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
						placeholder="Email"
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
						placeholder="Telefone"
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
			{mode === "create" && (
				<Controller
					control={control}
					name="password"
					rules={{ required: true, minLength: 5 }}
					render={({ field: { name, onBlur, onChange, value, disabled } }) => (
						<Input
							placeholder="Senha"
							type="password"
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
			)}

			<Controller
				control={control}
				name="is_admin"
				render={({ field: { name, onBlur, onChange, value, disabled } }) => (
					<div className="checkbox">
						<Input
							type="checkbox"
							className="filled-input"
							disabled={disabled}
							defaultChecked={value}
							name={name}
							id={name}
							onChange={onChange}
							onBlur={onBlur}
						/>
						<label htmlFor="name" className="checkbox-label">
							Administrador ?
						</label>
					</div>
				)}
			/>

			<Button
				type="submit"
				className="fill-row"
				loading={loading}
				disabled={!isValid}
			>
				{mode === "create" ? "CRIAR" : "SALVAR"}
			</Button>
		</form>
	);
};

export { WaiterModal };
