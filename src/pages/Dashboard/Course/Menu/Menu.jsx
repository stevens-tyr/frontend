import React, { Component } from 'react';

import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

class ProfessorMenu extends Component {
  state = {};

  componentDidMount() {
    this.setState({ selectedKey: 'assignments' });
  }

  // TODO: Fix this to be more efficient
  getProfessorSubPath() {
    const { location } = this.props;
    let path = location.pathname;
    if (path[path.length - 1] === '/') {
      path = path.substr(0, path.length - 1);
    }
    return path.split('/').slice(-1)[0];
  }

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
        <Menu.Item key="people">
          <Icon type="user" /> People
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(ProfessorMenu);
