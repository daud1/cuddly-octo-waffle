import React, { Component } from 'react';
import Navbar from './Navbar';
import AccountToggle from './AccountToggle';
import Footer from './Footer';

class AccountSelector extends Component {
  proceed = () => {
    const { renderForms } = this.props;
    renderForms(true);
  }

  render() {
    return (
      <div className="full-cover-image display-flex flex-direction-column justify-content-space-between" style={{ overflow: 'hidden' }}>
        <Navbar page='accountSelector' />
        <AccountToggle  proceed={this.proceed} />
        <Footer page='accountSelector' />
      </div>
    );
  }
}

export default AccountSelector;
