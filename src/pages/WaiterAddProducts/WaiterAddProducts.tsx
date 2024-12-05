import { AxiosError } from "axios";
import { useToast } from "leux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileMinus } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounceValue } from "usehooks-ts";
import {
	AddProduct,
	IProduct,
	Pages,
	SafeAny,
	WaiterAddProductsPageProps,
} from "../../@types";
import { WaiterOrdersService } from "../../api";
import {
	BottomSheet,
	Button,
	Chip,
	Input,
	MainContainer,
	ProductColumnCard,
	Sheets,
	Spinner,
} from "../../components";
import {
	AppDispatch,
	OnOrderActions,
	ProductsActions,
	ProductsThunks,
	RootState,
} from "../../store";

import { Styled } from "../../styles";
import S from "./WaiterAddProducts.styles";

const WaiterAddProductsPage: React.FC<WaiterAddProductsPageProps> = () => {
	const { orderId } = useParams();
	const { t } = useTranslation();
	const ToastService = useToast();

	const { filters, products, categories, isLoadingProducts } = useSelector(
		(state: RootState) => state.products
	);

	const [toAddProducts, setToAddProducts] = useState<AddProduct>({});

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [value, setValue] = useState("");
	const [search, setSearch] = useDebounceValue("", 300);

	useEffect(() => {
		dispatch(ProductsActions.setFilters({ name: search }));
	}, [search]);

	const goBack = () => {
		const to = Pages.WaiterOrderProducts.replace(":orderId", orderId || "");

		navigate(to);
	};

	const canAddProducts = useMemo(
		() => Object.keys(toAddProducts).length > 0,
		[toAddProducts]
	);

	const onSelectCategory = (category_id?: string) => {
		dispatch(ProductsActions.setFilters({ category_id, no_stock: undefined }));
	};

	const onStockFilter = () => {
		let newFilter: boolean | undefined = !filters.no_stock;
		if (!newFilter) {
			newFilter = undefined;
		}
		dispatch(
			ProductsActions.setFilters({
				no_stock: newFilter,
				category_id: undefined,
			})
		);
	};

	const clearFilters = () => {
		dispatch(
			ProductsActions.setFilters({
				no_stock: undefined,
				category_id: undefined,
			})
		);
	};

	const onAddProduct = (product: IProduct, quantity: number) => {
		const newToAddProducts = { ...toAddProducts };
		if (!newToAddProducts[product._id]) {
			newToAddProducts[product._id] = { product, quantity };
		}
		if (newToAddProducts[product._id]) {
			newToAddProducts[product._id].quantity = quantity;
			if (quantity === 0) {
				delete newToAddProducts[product._id];
			}
		}
		setToAddProducts(newToAddProducts);
	};

	const loadProducts = useCallback(
		async (enableLoader = true) => {
			await dispatch(
				ProductsThunks.fetchProducts({
					loading: enableLoader,
					onError: (error) => {
						if (error.response?.data) {
							const { message } = error.response.data as SafeAny;

							if (message && typeof message === "string") {
								const translateMessage = t(`Errors.${message}`);

								ToastService.createToast({
									label: translateMessage,
									colorScheme: "danger",
								});
							}
						}
					},
				})
			);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filters]
	);

	const loadCategories = useCallback(async () => {
		await dispatch(
			ProductsThunks.fetchStoreCategories({
				loading: true,
				onError: (error) => {
					if (error.response?.data) {
						const { message } = error.response.data as SafeAny;

						if (message && typeof message === "string") {
							const translateMessage = t(`Errors.${message}`);

							ToastService.createToast({
								label: translateMessage,
								colorScheme: "danger",
							});
						}
					}
				},
			})
		);
	}, []);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	useEffect(() => {
		loadCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getOrder = useCallback(async () => {
		try {
			if (!orderId) {
				return;
			}

			const { data } = await WaiterOrdersService.getById(orderId);

			if (data) {
				dispatch(OnOrderActions.setOrder(data));
			} else {
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
	}, []);

	useEffect(() => {
		getOrder();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// const value = search !== "" ? search : undefined;
		// dispatch(ProductsActions.setFilters({ nome: value }));
	}, [search]);

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			showGoBack
			onGoBack={goBack}
			showSearch
			onSearch={() => setShowSearch((curr) => !curr)}
		>
			<S.Container>
				<S.Content>
					<S.Header>
						<Styled.Typography.Title
							className="page-title"
							dangerouslySetInnerHTML={{ __html: t("WaiterAddProducts.Title") }}
						></Styled.Typography.Title>
						{showSearch && (
							<Input
								placeholder="Buscar produto..."
								onChangeValue={(value) => {
									setValue(value);
									setSearch(value);
								}}
								hideLabel
								value={value}
							/>
						)}
						<S.Filters className="scrollable-x no-scroll">
							<Chip
								active={!filters.category_id && !filters.no_stock}
								clickable
								theme="secondary"
								onClick={clearFilters}
							>
								{t("WaiterAddProducts.Filters.All")}
							</Chip>
							<Chip
								active={filters.no_stock}
								clickable
								theme="secondary"
								onClick={onStockFilter}
							>
								{t("WaiterAddProducts.Filters.NoStock")}
							</Chip>
							{categories.map((category, index) => (
								<Chip
									key={index}
									active={category._id === filters.category_id}
									clickable
									theme="secondary"
									onClick={() => onSelectCategory(category._id)}
								>
									{category.name}
								</Chip>
							))}
						</S.Filters>
					</S.Header>

					{/* Products section */}
					{!isLoadingProducts && (
						<S.ProductList>
							{products.map((product, index) => (
								<ProductColumnCard
									product={product}
									key={index}
									showChangeButtons={true}
									onChange={onAddProduct}
									quantity={toAddProducts[product._id]?.quantity ?? 0}
								/>
							))}
						</S.ProductList>
					)}
					{/* Empty section */}
					{!isLoadingProducts && products.length === 0 && (
						<Styled.Empty>
							<FileMinus size={32} />
							<Styled.Typography.Caption>
								{t("Empty.Products")}
							</Styled.Typography.Caption>
						</Styled.Empty>
					)}
					{/* Loading section */}
					{isLoadingProducts && (
						<Styled.LoadingContainer>
							<Spinner size={32} theme="primary" />
							<Styled.Typography.Caption>
								{t("Loaders.Products")}
							</Styled.Typography.Caption>
						</Styled.LoadingContainer>
					)}

					{canAddProducts && (
						<S.FloatingFooter>
							<Button
								theme="secondary"
								className="fill-row"
								onClick={() => setShowConfirmModal(true)}
							>
								{t("Generics.Buttons.Add")}
							</Button>
						</S.FloatingFooter>
					)}
				</S.Content>
			</S.Container>
			{showConfirmModal && orderId && (
				<BottomSheet title="WaiterAddProducts.Confirm.Title">
					<Sheets.ConfirmAddProducts
						orderId={orderId}
						productList={toAddProducts}
						cancel={() => setShowConfirmModal(false)}
						onChange={(newToAddProducts) => setToAddProducts(newToAddProducts)}
						onConfirm={() => {
							setShowConfirmModal(false);
							goBack();
						}}
					/>
				</BottomSheet>
			)}
		</MainContainer>
	);
};

export { WaiterAddProductsPage };
