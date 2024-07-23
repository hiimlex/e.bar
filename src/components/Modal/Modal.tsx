import { X } from "react-feather";
import { ModalProps } from "../../@types";
import { useModal } from "../../hooks";
import { IconButton } from "../IconButton";
import { useTranslation } from "react-i18next";

const Modal: React.FC<ModalProps> = ({
	id,
	title,
	children,
	headerClassName,
	bodyClassName,
}) => {
	const { t } = useTranslation();
	const { closeModal } = useModal();

	return (
		<div className="modal">
			<IconButton
				onClick={() => {
					closeModal(id);
				}}
				theme="default"
				variant="filled"
				className="modal-close"
			>
				<X size={18} />
			</IconButton>
			<header className={`modal-header ${headerClassName}`}>
				{title && <h3 className="modal-title">{t(title)}</h3>}
			</header>
			<main className={`modal-body ${bodyClassName}`}>{children}</main>
		</div>
	);
};

export { Modal };
