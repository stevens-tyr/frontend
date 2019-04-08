import React, { Component } from 'react';

import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

class ProfessorMenu extends Component {
  state = {
    selectedKey: 'assignments'
  };

  /**
   * When a user clicks on the top menu in the
   * Professor View Component, they will be
   * redirected to the appropriate subview
   * @param {Antd Menu onClick Event} location
   */
  handleClick(onClick) {
    const { match, history } = this.props;
    const { cid } = match.params;
    // desired location from menu
    const { key } = onClick;
    this.setState({ selectedKey: key });
    // course id
    history.push(`/dashboard/course/${cid}/${key}`);
  }

  render() {
    const { selectedKey } = this.state;
    return (
      <Menu
        className="menu"
        onClick={e => this.handleClick(e)}
        selectedKeys={[selectedKey]}
        mode="horizontal"
        style={{ marginBottom: 30 }}
      >
        <Menu.Item key="assignments">
          <Icon type="inbox" /> Assignments
        </Menu.Item>
        <Menu.Item key="students">
          <Icon type="user" /> Students
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(ProfessorMenu);
