import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, SyntheticEvent, useEffect} from "react";
import ModalOverlay from "./modal-overlay";
const modalRoot = document.getElementById("react-modals")!;

interface IModalProps {
  children: React.ReactNode;
  header?: string;
  onClose: () => void;
}

const Modal:FC<IModalProps> = ({ children, header, onClose }) => {
  const handleEscClick = (e:KeyboardEvent):void => {
    if (e.key === "Escape") {
      onClose();
    }
  }
  useEffect(() => {
    modalRoot.className = 'show';
    document.body.style.overflow = 'hidden';
    document.addEventListener("keydown", handleEscClick, false);
    return () => {
      modalRoot.className = '';
      document.body.style.overflow = '';
      document.removeEventListener("keydown", handleEscClick, false);
    }
  }, []);
  const onAnyClickInsideModal = (e:SyntheticEvent) => {
    e.stopPropagation();
  }

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <section className={`${modalStyles.content} pt-10 pr-10 pl-10 pb-15`} onClick={onAnyClickInsideModal}>
        <div className={`${modalStyles.header} flex`}>
          <h3 className="text text_type_main-large">{header}</h3>
          <div className={modalStyles.button}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        {children}
      </section>
    </ModalOverlay>,
    modalRoot
  );
}

export default Modal;
