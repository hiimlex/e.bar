import { IOrder, IPaymentForm } from "../../../@types";

export interface IAddPaymentBottomSheetProps {
	order: IOrder;
	onAddPayment: (formData: IPaymentForm) => void;
}
