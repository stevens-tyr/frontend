import React, { Component } from 'react';

import './styles.scss';
import Tear from '../../components/common/Tear';

class Auth extends Component {
  state = {};

  render() {
    return (
      <div className="auth-container">
        <div className="auth-header">
          <Tear className="icon" />
          <span>Tyr</span>
        </div>
        <form className="auth-form">
          <h1>Log In</h1>
          <input type="text" name="name" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Auth;
