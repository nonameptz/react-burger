import modalStyles from './modal.module.css';
import React, {FC, MouseEventHandler} from "react";

interface IModalOverlayProps {
  children: React.ReactNode;
  onClose: MouseEventHandler;
}

const ModalOverlay:FC<IModalOverlayProps> = ({ onClose, children }) => {
  return (
    <div onClick={onClose} className={modalStyles.overlay}>
      { children }
    </div>
  );
}

export default ModalOverlay;
