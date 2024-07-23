import { Checkbox } from "leux";
import { useMemo, useState } from "react";
import { Minus, Plus } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ModalIds, StartAttendancePayload } from "../../../../@types";
import { AttendancesService } from "../../../../api";
import { Button, IconButton, Input } from "../../../../components";
import { useModal } from "../../../../hooks";
import "./styles.scss";

interface StartAttendanceModalProps {
	total_tables?: number;
	onClose?: () => void;
}

const StartAttendanceModal: React.FC<StartAttendanceModalProps> = ({
	total_tables,
	onClose,
}) => {
	const { t } = useTranslation();
	const { closeModal } = useModal();
	const { control, setValue, handleSubmit, formState } =
		useForm<StartAttendancePayload>({
			mode: "all",
			defaultValues: {
				tables_count: 1,
				finish_active_attendances: true,
			},
		});
	const [loading, setLoading] = useState(false);

	const onChangeTableCount = (value: number) => {
		if (value !== 0) {
			if (total_tables && value > total_tables) {
				return;
			}

			setValue("tables_count", value);
		}
	};

	const canStart = useMemo(() => formState.isValid, [formState]);

	const startAttendance = async (data: StartAttendancePayload) => {
		try {
			setLoading(true);

			await AttendancesService.startAttendance(data);

			closeModal(ModalIds.StartAttendance);

			onClose && onClose();

			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<form className="start-attendance" onSubmit={handleSubmit(startAttendance)}>
			<div className="start-attendance-group">
				<Controller
					name="code"
					control={control}
					render={({ field }) => (
						<Input
							fieldKey={field.name}
							mode="uncontrolled"
							placeholder="Modals.StartAttendance.Fields.Code"
							onBlur={field.onBlur}
							value={field.value}
							onChangeValue={(value) => field.onChange(value)}
						/>
					)}
				/>
				<Controller
					name="finish_active_attendances"
					control={control}
					render={({ field }) => (
						<Checkbox
							fieldKey={field.name}
							customClass="start-attendance-checkbox"
							onChange={() => field.onChange(field.value)}
							label={t("Modals.StartAttendance.Fields.FinishActiveAttendances")}
							checkBoxProps={{
								onBlur: field.onBlur,
							}}
						/>
					)}
				/>
			</div>
			<div className="start-attendance-group">
				<span className="start-attendance-subtitle">
					{t("Modals.StartAttendance.Fields.SelectTables")}
				</span>
				<Controller
					name="tables_count"
					control={control}
					rules={{
						min: 0,
					}}
					render={({ field }) => (
						<div className="start-attendance-quantity">
							<span>{t("Modals.StartAttendance.Fields.Quantity")}</span>
							<IconButton
								theme="primary"
								disabled={field.value === 0}
								onClick={() => onChangeTableCount(field.value - 1)}
							>
								<Minus size={16} />
							</IconButton>
							<span>{field.value}</span>
							<IconButton
								theme="primary"
								onClick={() => onChangeTableCount(field.value + 1)}
							>
								<Plus size={16} />
							</IconButton>
						</div>
					)}
				/>
			</div>

			<div className="start-attendance-footer">
				<Button
					variant="outlined"
					theme="secondary"
					className="fill-row"
					onClick={() => closeModal(ModalIds.StartAttendance)}
				>
					{t("Modals.StartAttendance.Buttons.GoBack")}
				</Button>
				<Button
					className="fill-row"
					type="submit"
					disabled={!canStart}
					loading={loading}
				>
					{t("Modals.StartAttendance.Buttons.Start")}
				</Button>
			</div>
		</form>
	);
};

export { StartAttendanceModal };
