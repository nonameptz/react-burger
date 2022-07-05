import modalStyles from './modal.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose, children }) => {
  return (
    <div onClick={onClose} className={modalStyles.overlay}>
      { children }
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};

export default ModalOverlay;
