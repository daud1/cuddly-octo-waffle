import React from "react";
import PropTypes from "prop-types";
const Modal = props => {
  const { children, onClose } = props;

  return <div>{children}</div>;
};

Modal.propTypes = {
  onClose: PropTypes.function,
  isOpen: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
