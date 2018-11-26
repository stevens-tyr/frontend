import React, { Component } from 'react';
import tyr from '../../utils/tyr';

import './styles.scss';

class Dashboard extends Component {
  state = {
    isAuth: null
  };

  async componentDidMount() {
    try {
      await tyr.get('auth/logged_in');
      const { data } = await tyr.get('plague_doctor/dashboard');
      console.log(data);
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
