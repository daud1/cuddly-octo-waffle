import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import Tab from "./Tab";
import { Button } from "../../employer/components/Common";
import CreateJobForm from "../../employer/components/CreateJobForm";
import Modal from "../../common/components/Modal";

const TabsBar = styled.div`
  height: 40px;
  background-color: #ebf5f6;
  display: flex;
  align-items: center;
  font-size: 12px;
`;

export const PostButton = styled(Button)`
  position: fixed;
  right: 2%;
  bottom: 3%;
  width: 106px;
  height: 35px;
`;

const TabList = styled.ul`
  padding-top: 10px;
`;

class Tabs extends React.Component {
  state = {
    activeTab: this.props.children[0].props.label
  };

  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  onClickTab = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { children } = this.props;
    const { activeTab } = this.state;

    return (
      <React.Fragment>
        <TabsBar>
          <TabList className="tab-list">
            {children.map(child => {
              const { label } = child.props;
              return (
                <Tab
                  activeTab={activeTab}
                  key={label}
                  label={label}
                  onClick={this.onClickTab}
                />
              );
            })}
          </TabList>
        </TabsBar>
        <div className="tab-content">
          <Modal
            height="80%"
            width="50%"
            openButton={props => (
              <PostButton onClick={props.onClose}>Post a Job</PostButton>
            )}
            render={props => CreateJobForm({ onClose: props.onClose })}
          />
          {children.map(child => {
            return child.props.label === activeTab
              ? child.props.children
              : undefined;
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Tabs;
