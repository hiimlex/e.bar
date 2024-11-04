export type TPayments = "credit-card" | "cash" | "pix";


export interface IPaymentForm {
	receivedValue: number;
	name: string;
	nf: string;
}