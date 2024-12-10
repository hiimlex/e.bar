import { IOrder, IPaymentForm, TPaymentMethods } from "../../../@types";

export interface IAddPaymentBottomSheetProps {
	order: IOrder;
	onAddPayment: (formData: IPaymentForm, method: TPaymentMethods, payment_item_id?: string) => void;
	payment_item_id?: string;
	payment_data?: Partial<IPaymentForm>;
	initial_method?: TPaymentMethods;
}
