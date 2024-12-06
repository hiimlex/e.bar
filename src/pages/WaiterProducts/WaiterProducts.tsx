import { useToast } from "leux";
import { useCallback, useEffect, useRef, useState } from "react";
import { FileMinus } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounceValue } from "usehooks-ts";
import { SafeAny } from "../../@types";
import {
	Chip,
	Input,
	MainContainer,
	Spinner,
	WaiterProductCard,
} from "../../components";
import {
	AppDispatch,
	ProductsActions,
	ProductsThunks,
	RootState,
} from "../../store";

import { Styled } from "../../styles";
import S from "./WaiterProducts.styles";

interface WaiterProductsPageProps {}

const WaiterProductsPage: React.FC<WaiterProductsPageProps> = () => {
	const { t } = useTranslation();
	const ToastService = useToast();
	const { filters, products, isLoadingProducts, categories } = useSelector(
		(state: RootState) => state.products
	);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const [showSearch, setShowSearch] = useState(false);
	const [value, setValue] = useState("");
	const [search, setSearch] = useDebounceValue("", 300);

	useEffect(() => {
		dispatch(ProductsActions.setFilters({ name: search }));
	}, [search]);

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

	const onShowSearch = () => {
		setShowSearch((curr) => !curr);
	};

	useEffect(() => {
		if (!isLoadingProducts) {
			loadProducts();
		}
	}, [loadProducts]);

	useEffect(() => {
		loadCategories();
	}, []);

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			showGoBack
			onGoBack={() => navigate(-1)}
			showSearch
			onSearch={onShowSearch}
		>
			<S.Container>
				<S.Content>
					<S.Header>
						<Styled.Typography.Title
							dangerouslySetInnerHTML={{ __html: t("WaiterProducts.Title") }}
						></Styled.Typography.Title>
						<S.Filters className="w-products-filters">
							{showSearch && (
								<Input
									placeholder="Buscar produto..."
									onChangeValue={(value) => {
										setValue(value);
										setSearch(value);
									}}
									wrapperClassName="fill-row"
									hideLabel
									value={value}
								/>
							)}
							<S.ChipsWrapper className="scrollable-x no-scroll">
								<Chip
									active={!filters.category_id && !filters.no_stock}
									clickable
									theme="secondary"
									onClick={clearFilters}
								>
									{t("WaiterHome.Filters.All")}
								</Chip>
								<Chip
									active={filters.no_stock}
									clickable
									theme="secondary"
									onClick={onStockFilter}
								>
									{t("WaiterHome.Filters.NoStock")}
								</Chip>
								{categories.map((category) => (
									<Chip
										key={category._id}
										active={category._id === filters.category_id}
										clickable
										theme="secondary"
										onClick={() => onSelectCategory(category._id)}
									>
										{category.name}
									</Chip>
								))}
							</S.ChipsWrapper>
						</S.Filters>
					</S.Header>

					{/* Products List */}
					{!isLoadingProducts && (
						<S.List className="no-scroll">
							{products.map((product, index) => (
								<WaiterProductCard
									product={product}
									key={index}
									onCategoryClick={(categoryId) => onSelectCategory(categoryId)}
								/>
							))}
						</S.List>
					)}
					{/* Empty */}
					{!isLoadingProducts && products.length === 0 && (
						<Styled.Empty className="empty-box">
							<FileMinus strokeWidth={2} size={32} />
							<Styled.Typography.Caption>
								{t("Empty.Products")}
							</Styled.Typography.Caption>
						</Styled.Empty>
					)}
					{/* Loading  */}
					{isLoadingProducts && (
						<Styled.LoadingContainer className="w-products-loading">
							<Spinner size={32} theme="primary" />
							<Styled.Typography.Caption>
								{t("Loaders.Products")}
							</Styled.Typography.Caption>
						</Styled.LoadingContainer>
					)}
				</S.Content>
			</S.Container>
		</MainContainer>
	);
};

export { WaiterProductsPage };
