import { AxiosResponse } from "axios";
import { api } from "../api";
import { Endpoints } from "../endpoints";
import { ICreatePayment, IPayment, IUpdatePayment } from "../../@types";

const fetchAll = () => {};
const create = async (
	createPaymentData: ICreatePayment
): Promise<AxiosResponse<IPayment>> => {
	try {
		const response = await api.post(Endpoints.PaymentCreate, createPaymentData);

		return response;
	} catch (error) {
		return Promise.reject(error);
	}
};
const update = async (
	paymentId: string,
	paymentData: IUpdatePayment
): Promise<AxiosResponse<IPayment>> => {
	try {
		const url = Endpoints.PaymentUpdate.replace(":id", paymentId);
		const response = await api.put(url, paymentData);

		return response;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const PaymentsService = {
	fetchAll,
	create,
	update,
};
