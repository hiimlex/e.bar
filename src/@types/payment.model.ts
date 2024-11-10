import { IAttendance } from "./attendances.model";
import { IOrder } from "./orders.model";
import { IStore } from "./store.model";

export type TPaymentMethods = "credit-card" | "cash" | "pix";

export interface IPaymentForm {
	receivedValue: number;
	name: string;
	nf: string;
}

interface IPixPayment {
	method: "pix";
	pix_config: {
		name: string;
	};
}

interface IPixPayment {
	method: "pix";
	pix_config: {
		name: string;
	};
}

interface ICreditCardPayment {
	method: "credit-card";
	credit_card_config: {
		nf: string;
	};
}

interface ICashPayment {
	method: "cash";
	cash_config: {
		charge: number;
	};
}

export type IPayment =
	| {
			amount: number;
			_id: string;
			created_at: Date;
			updated_at: Date;
			attendance: string | IAttendance;
			store: string | IStore;
			order: string | IOrder;
			method: TPaymentMethods;
	  }
	| IPixPayment
	| ICreditCardPayment
	| ICashPayment;

export type ICreatePayment = {
	amount: number;
	order_id: string;
	method: TPaymentMethods;
	cash_config?: {
		charge: number;
	};
	pix_config?: {
		name: string;
	};
	credit_card_config?: {
		nf: string;
	};
};

export type IUpdatePayment = {
	method: TPaymentMethods;
	cash_config?: {
		charge: number;
	};
	pix_config?: {
		name: string;
	};
	credit_card_config?: {
		nf: string;
	};
};
