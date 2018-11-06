import React, { Component } from 'react';
import axios from 'axios';

import './styles.scss';

class Dashboard extends Component {
  state = {
    isAuth: null
  };

  async componentDidMount() {
    try {
      await axios.get('/api/v1/auth/test', { withCredentials: true });
      this.setState({ isAuth: true });
    } catch (e) {
      this.setState({ isAuth: false });
    }
  }

  render() {
    const { isAuth } = this.state;
    return (
      <div className={isAuth ? 'good' : 'bad'}>
        {isAuth ? 'Authorized' : 'Not Authorized'}
      </div>
    );
  }
}

export default Dashboard;
