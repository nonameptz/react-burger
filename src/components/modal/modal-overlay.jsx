import modalStyles from './modal.module.css';
import { node, func } from "prop-types";

const ModalOverlay = ({ onClose, children }) => {
  return (
    <div onClick={onClose} className={modalStyles.overlay}>
      { children }
    </div>
  );
}

ModalOverlay.propTypes = {
  children: node.isRequired,
  onClose: func.isRequired
};

export default ModalOverlay;
