import React, { useState } from "react";
import PropTypes from "prop-types";

const Modal = props => {
  const [open, setOpen] = useState(false);
  const { render, openButton } = props;

  return (
    <>
      {openButton({ onClose: () => setOpen(!open) })}
      {open && render({ onClose: () => setOpen(!open) })}
    </>
  );
};

Modal.propTypes = {
  render: PropTypes.func.isRequired,
  openButton: PropTypes.func.isRequired
};

export default Modal;
