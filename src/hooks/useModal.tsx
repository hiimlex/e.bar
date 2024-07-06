import { useContext } from "react";
import { ModalContext } from "../providers";
import { ModalContextType } from "../@types";

const useModal = (): ModalContextType => {
	const context = useContext(ModalContext);

	return context;
};

export default useModal;
