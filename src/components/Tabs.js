import React from "react";
import PropTypes from "prop-types";

import Tab from "./generic/Tab";

class Tabs extends React.Component {
  state = {
    activeTab: this.props.children[0].props.label
  };

  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { children } = this.props;
    const { activeTab } = this.state;

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map(child => {
            const { label } = child.props;
            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={this.onClickTabItem}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map(child => {
            return child.props.label === activeTab
              ? child.props.children
              : undefined;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
