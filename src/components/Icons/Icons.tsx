export interface GenericIconProps {
	fill?: string;
	width?: number;
	height?: number;
}

import CashSVG from "./CashSVG";
import CreditCardSVG from "./CreditCardSVG";
import { PaymentSVG } from "./PaymentSVG";
import PixSVG from "./PixSVG";
import { SendSVG } from "./SendSVG";
import TablesIconSVG from "./TablesIconSVG";

const Icons = {
	PaymentSVG,
	SendSVG,
	PixSVG,
	CreditCardSVG,
	CashSVG,
	TablesIconSVG,
};

export default Icons;
