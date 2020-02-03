import React from "react";
import PropTypes from "prop-types";

class Tab extends React.Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const { activeTab, label } = this.props;
    let className = "tab-list-item";
    className += activeTab !== label ? "" : "tab-list-item";

    return (
      <li className={className} onClick={this.onClick}>
        {label}
      </li>
    );
  }
}

export default Tab;
