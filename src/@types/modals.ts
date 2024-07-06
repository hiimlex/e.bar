export interface ModalProps {
	id: string;
	component: React.ReactNode;
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
}
