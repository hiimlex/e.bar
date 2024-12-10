import { IAttendance } from "./attendances.model";
import { IOrder } from "./orders.model";
import { IStore } from "./store.model";

export type TPaymentMethods = "credit-card" | "cash" | "pix";

export interface IPaymentForm {
	received_value: number;
	pix_name?: string;
	nf_number?: string;
	attachment?: File | null;
}

export type IPayment = {
	amount: number;
	remaining: number;
	_id: string;
	created_at: Date;
	updated_at: Date;
	attendance: string | IAttendance;
	store: string | IStore;
	order: string | IOrder;
	items: IPaymentItem[];
};

export type ICreatePaymentItem = {
	method: TPaymentMethods;
} & IPaymentForm;

export type ICreatePayment = {
	order_id: string;
	items: ICreatePaymentItem[];
};

export type IUpdatePayment = {
	items: ICreatePaymentItem[];
};

export type IPaymentItem = ICreatePaymentItem & { _id: string };
