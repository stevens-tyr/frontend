import React, { Component } from 'react';
import './styles.scss';
import * as eva from 'eva-icons';

import Tear from '../common/Tear';

class Navigation extends Component {
  componentDidMount() {
    eva.replace({
      class: 'icons',
      height: 30,
      width: 30
    });
  }

  render() {
    const {
      name: [first, last]
    } = this.props;
    return (
      <header className="nav">
        <div className="left">
          <Tear sizeClass="icon" />
          <i data-eva="layout-outline" />
          <i data-eva="inbox-outline" />
          <i data-eva="calendar-outline" />
        </div>
        <div className="right">
          <div className="name">
            {first} {last}
          </div>
          <i data-eva="log-out-outline" />
        </div>
      </header>
    );
  }
}

export default Navigation;
