export interface ModalProps {
	id: string;
	title?: string;
	children: React.ReactNode;
	bodyClassName?: string;
	headerClassName?: string;
}

export interface ModalContextType {
	modals: ModalProps[];
	openModal: (modalProps: ModalProps) => void;
	closeModal: (modalId: string) => void;
}

export enum ModalIds {
	AddProduct = "add-product",
	EditProduct = "edit-product",

	AddWaiter = "add-waiter",
	EditWaiter = "edit-waiter",

	StartAttendance = "start-attendance",
}
