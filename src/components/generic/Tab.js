import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const TabItem = styled.li`
  display: inline-block;
  list-style: none;
  width: 100px;
  margin: 0;
  cursor: pointer;
  padding: 10px;
  text-align: center;
`;

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
    if (activeTab === label) {
      className += " active-tab-item";
    }

    return (
      <TabItem className={className} onClick={this.onClick}>
        {label}
      </TabItem>
    );
  }
}

export default Tab;
