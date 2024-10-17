import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CreateProductPayload, SafeAny } from "../../../../@types";
import { ProductsService } from "../../../../api";
import { Button, Input, Select, UploadBox } from "../../../../components";
import { useModal } from "../../../../hooks";
import { RootState } from "../../../../store";
import "./styles.scss";

interface ProductModalProps {
	id?: string;
	productId?: string;
	initialProduct?: CreateProductPayload;
	beforeClose?: () => void;
	mode?: "edit" | "create";
	imagePreview?: string;
}

const ProductModal: React.FC<ProductModalProps> = ({
	id,
	productId,
	initialProduct,
	beforeClose,
	mode,
	imagePreview,
}) => {
	const { t } = useTranslation();
	const { closeModal } = useModal();
	const [loading, setLoading] = useState(false);
	const { control, handleSubmit, formState, watch } =
		useForm<CreateProductPayload>({
			mode: "all",
			defaultValues: initialProduct,
		});
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | undefined>(imagePreview);
	const values = watch();

	const { categories } = useSelector((state: RootState) => state.products);
	const canAdd = useMemo(() => formState.isValid && !!file, [formState, file]);

	const onChangeFile = (file: File) => {
		setFile(file);
		setPreview(URL.createObjectURL(file));
	};

	const onSubmit = (data: SafeAny) => {
		if (mode === "create") {
			createProduct(data);
		}

		if (mode === "edit") {
			saveProduct(data);
		}
	};

	const createProduct = async (data: CreateProductPayload) => {
		try {
			setLoading(true);

			if (!file) {
				return;
			}

			const { name, category, price, stock } = data;

			await ProductsService.create(
				{
					name,
					category,
					price: +price,
					stock: +stock,
				},
				file
			);

			setLoading(false);

			if (id) {
				closeModal(id);
			}

			if (beforeClose) {
				beforeClose();
			}
		} catch (error) {
			setLoading(false);
		}
	};

	const saveProduct = async (data: SafeAny) => {
		if (!productId) {
			return;
		}

		try {
			setLoading(true);

			const { name, category, price, stock } = data;

			await ProductsService.update(
				productId,
				{
					name,
					category,
					price: +price,
					stock: +stock,
				},
				file
			);

			setLoading(false);

			if (id) {
				closeModal(id);
			}

			if (beforeClose) {
				beforeClose();
			}
		} catch (error) {
			setLoading(false);
		}
	};

	const hasChangedImage = useMemo(
		() => imagePreview !== preview,
		[imagePreview, preview]
	);
	const hasChangedData = useMemo(() => {
		if (!initialProduct) {
			return true;
		}

		type ProductKeys = keyof CreateProductPayload;

		const hasChanged = Object.keys(initialProduct).some(
			(key) =>
				values[key as ProductKeys].toString() !==
				initialProduct[key as ProductKeys].toString()
		);

		return hasChanged;
	}, [initialProduct, values]);

	return (
		<form className="product-modal" onSubmit={handleSubmit(onSubmit)}>
			{preview && (
				<div className="image-preview">
					<img src={preview} alt={t("Modals.Product.Fields.ImagePreview")} />
				</div>
			)}

			<UploadBox
				minify={!!preview}
				minifyText="Modals.Product.Fields.ChangeImage"
				label="Modals.Product.Fields.Upload"
				onChange={onChangeFile}
			/>

			<Controller
				name="name"
				control={control}
				rules={{
					required: {
						value: true,
						message: "Generics.FieldErrors.Required",
					},
				}}
				render={({
					field: { name, value, onChange, disabled },
					fieldState: { error },
				}) => (
					<Input
						fieldKey={name}
						placeholder="Modals.Product.Fields.Name"
						wrapperClassName="fill-row"
						className="filled-input"
						disabled={disabled}
						value={value}
						onChangeValue={onChange}
						errorMessage={error?.message}
						showError={!!error}
						defaultValue={initialProduct?.name || ""}
					/>
				)}
			/>

			<Controller
				name="price"
				rules={{
					required: {
						value: true,
						message: "Generics.FieldErrors.Required",
					},
				}}
				control={control}
				render={({
					field: { name, value, onChange, disabled },
					fieldState: { error },
				}) => (
					<Input
						fieldKey={name}
						placeholder="Modals.Product.Fields.Price"
						wrapperClassName="fill-row"
						className="filled-input"
						disabled={disabled}
						value={value}
						onChangeValue={onChange}
						hasPrefix
						prefixContent={<span className="dollar-prefix">R$</span>}
						errorMessage={error?.message}
						showError={!!error}
						defaultValue={initialProduct?.price || ""}
					/>
				)}
			/>

			<Controller
				name="stock"
				rules={{
					required: {
						value: true,
						message: "Generics.FieldErrors.Required",
					},
				}}
				control={control}
				render={({
					field: { name, value, onChange, disabled },
					fieldState: { error },
				}) => (
					<Input
						fieldKey={name}
						placeholder="Modals.Product.Fields.Stock"
						wrapperClassName="fill-row"
						className="filled-input"
						disabled={disabled}
						value={value}
						onChangeValue={onChange}
						errorMessage={error?.message}
						showError={!!error}
						defaultValue={initialProduct?.stock || ""}
					/>
				)}
			/>

			<Controller
				name="category"
				control={control}
				render={({ field: { name, value, onChange, disabled } }) => (
					<Select
						fieldKey={name}
						onChange={({ target: { value } }) => onChange(value as string)}
						disabled={disabled}
						defaultValue={initialProduct?.category || ""}
						value={value}
						label="Modals.Product.Fields.Category"
					>
						<option disabled value="">
							{t("Modals.Product.Fields.Category")}
						</option>
						{categories.map((value) => (
							<option key={value._id} value={value._id}>
								{value.name}
							</option>
						))}
					</Select>
				)}
			/>

			{mode === "create" && (
				<Button loading={loading} className="fill-row" disabled={!canAdd}>
					Adicionar
				</Button>
			)}

			{mode === "edit" && (
				<Button
					loading={loading}
					disabled={!hasChangedData && !hasChangedImage}
					className="fill-row"
				>
					Salvar
				</Button>
			)}
		</form>
	);
};

export { ProductModal };
