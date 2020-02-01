import React from "react";
import PropTypes from "prop-types";

const Modal = props => {
  const { children, isOpen, onClose } = props;

  return isOpen ? (
    <div>
      <span onClick={onClose}>X</span>
      {children}
    </div>
  ) : null;
};

Modal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
