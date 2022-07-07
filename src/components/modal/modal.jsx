import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";
import ModalOverlay from "./modal-overlay";
import { node, string, func } from "prop-types";
const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, header, onClose }) => {
  const handleEscClick = e => {
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
  const onAnyClickInsideModal = e => {
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

Modal.propTypes = {
  children: node.isRequired,
  header: string,
  onClose: func.isRequired
};

export default Modal;
