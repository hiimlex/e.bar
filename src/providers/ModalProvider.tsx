import { PropsWithChildren, createContext, useState } from "react";
import { X } from "react-feather";
import { ModalContextType, ModalProps } from "../@types";
import { IconButton } from "../components";

export const ModalContext = createContext<ModalContextType>({
	modals: [],
	closeModal: () => {},
	openModal: () => {},
});

const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [modals, setModals] = useState<ModalProps[]>([]);

	const openModal = (modalProps: ModalProps) => {
		setModals((curr) => [...curr, modalProps]);
	};

	const closeModal = (modalId: string) => {
		setModals((curr) => curr.filter((modal) => modal.id !== modalId));
	};

	return (
		<ModalContext.Provider value={{ modals, openModal, closeModal }}>
			{children}
			{modals.length > 0 && (
				<div className="modal-wrapper">
					{modals.map((modal) => (
						<div key={modal.id} className="modal">
							{modal.component}

							<IconButton
								onClick={() => {
									closeModal(modal.id);
								}}
								theme="default"
								variant="filled"
								className="modal-close"
							>
								<X size={18} />
							</IconButton>
						</div>
					))}
				</div>
			)}
		</ModalContext.Provider>
	);
};

export { ModalProvider };
