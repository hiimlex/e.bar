import { useContext } from "react";
import { ModalContext, ModalContextType } from "../providers";

const useModal = (): ModalContextType => {
	const context = useContext(ModalContext);

	return context;
};

export default useModal;
