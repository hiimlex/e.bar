import { useMemo, useState } from "react";
import {
	CreateProductPayload,
	ProductCategoriesArray,
} from "../../../../@types";
import { ProductsService } from "../../../../api";
import { Button, Input } from "../../../../components";
import { useModal } from "../../../../hooks";
import "./styles.scss";

interface ProductModalProps {
	id?: string;
	productId?: string;
	initialProduct?: CreateProductPayload;
	beforeClose?: () => void;
	mode?: "edit" | "create";
}

const ProductModal: React.FC<ProductModalProps> = ({
	id,
	productId,
	initialProduct,
	beforeClose,
	mode,
}) => {
	const { closeModal } = useModal();
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState<CreateProductPayload>(
		initialProduct || {
			name: "",
			category: "",
			image_url: "",
			price: 0,
			stock: 0,
		}
	);

	const canAdd = useMemo(() => {
		return (
			form.name.length > 0 &&
			form.category.length > 0 &&
			form.image_url.length > 0
		);
	}, [form]);

	const createProduct = async () => {
		try {
			setLoading(true);

			const { name, category, price, stock, image_url } = form;

			await ProductsService.create({
				name,
				category,
				price: +price,
				stock: +stock,
				image_url,
			});

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

	const saveProduct = async () => {
		if (!productId) {
			return;
		}

		try {
			setLoading(true);

			const { name, category, price, stock, image_url } = form;

			await ProductsService.update(productId, {
				name,
				category,
				price: +price,
				stock: +stock,
				image_url,
			});

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

	return (
		<div className="product-modal">
			<span className="product-modal-title">
				{mode === "create" ? "Adicionar produto" : "Editar produto"}
			</span>

			{form.image_url && (
				<div className="image-preview">
					<img src={form.image_url} alt="Preview imagem" />
				</div>
			)}
			<Input
				placeholder="URL Imagem"
				wrapperClassName="fill-row"
				className="filled-input"
				onChangeValue={(value) => setForm({ ...form, image_url: value })}
				value={form.image_url}
			/>
			<Input
				placeholder="Nome"
				wrapperClassName="fill-row"
				className="filled-input"
				value={form.name}
				onChangeValue={(value) => setForm({ ...form, name: value })}
			/>
			<Input
				placeholder="Estoque"
				type="number"
				wrapperClassName="fill-row"
				className="filled-input"
				onChangeValue={(value) => setForm({ ...form, stock: +value })}
				value={form.stock.toString()}
			/>
			<select
				className="filled-select"
				onChange={({ target: { value } }) =>
					setForm((curr) => ({ ...curr, category: value }))
				}
				defaultValue={form.category}
			>
				<option disabled value="">
					Categoria
				</option>
				{ProductCategoriesArray.map((value) => (
					<option key={value.key} value={value.value}>
						{value.key}
					</option>
				))}
			</select>
			<Input
				type="number"
				placeholder="Preço"
				wrapperClassName="fill-row"
				className="filled-input"
				onChangeValue={(value) => setForm({ ...form, price: +value })}
				value={form.price.toString()}
			/>

			{mode === "create" && (
				<Button
					loading={loading}
					onClick={createProduct}
					disabled={!canAdd}
					className="fill-row"
				>
					CRIAR
				</Button>
			)}

			{mode === "edit" && (
				<Button
					loading={loading}
					onClick={saveProduct}
					disabled={!canAdd}
					className="fill-row"
				>
					SALVAR
				</Button>
			)}
		</div>
	);
};

export { ProductModal };
