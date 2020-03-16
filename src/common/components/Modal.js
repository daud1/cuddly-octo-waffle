import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  z-index: 1;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(5px);
  // background-color: rgb(105,105,105, 0.4);
`;

const PopUp = styled.div`
  background-color: white;
  width: ${props => props.width};
  height: ${props => props.height};
  padding: 40px 50px;
  overflow-y: auto;
  margin-bottom: 17vh;
`;

const Modal = props => {
  const [open, setOpen] = useState(false);
  const { render, openButton, height, width } = props;

  return (
    <>
      {openButton({ onClose: () => setOpen(!open) })}
      {open ? (
        <Container>
          <PopUp className="grey-box-shadow" width={width} height={height}>
            {render({ onClose: () => setOpen(!open) })}
          </PopUp>
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

Modal.propTypes = {
  render: PropTypes.func.isRequired,
  openButton: PropTypes.func.isRequired
};

export default Modal;
