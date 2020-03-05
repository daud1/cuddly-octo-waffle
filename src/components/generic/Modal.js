import React from "react";
import PropTypes from "prop-types";

class Modal extends React.Component {
  state = {
    open: false
  };

  toggleModal = () => this.setState({ open: !this.state.open });

  render() {
    const { render, buttonText } = this.props;
    return (
      <>
        <button onClick={this.toggleModal}>{buttonText}</button>
        {this.state.open && render({ onClose: this.toggleModal })}
      </>
    );
  }
}

Modal.propTypes = {
  render: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default Modal;
