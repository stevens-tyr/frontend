import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';
import Tear from '../../components/common/Tear';

class Auth extends Component {
  state = {};

  renderLogin = () => (
    <>
      <form className="auth-form">
        <span className="form-label">Log In</span>
        <input
          className="text-input"
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="text-input"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="button" type="submit">
          Log in
        </button>
      </form>
      <div className="bottom-text">
        Don{"'"}t have an account?{' '}
        <Link to="/signup" className="link">
          Sign up.
        </Link>
      </div>
    </>
  );

  renderSignup = () => (
    <>
      <form className="auth-form" autoComplete="off">
        <span className="form-label">Sign Up</span>
        <input
          className="text-input"
          type="text"
          name="firstname"
          placeholder="First Name"
        />
        <input
          className="text-input"
          type="text"
          name="lastname"
          placeholder="Last Name"
        />
        <input
          className="text-input"
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="text-input"
          type="text"
          name="confirme"
          placeholder="Confirm Email"
        />
        <input
          className="text-input"
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          className="text-input"
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
        />
        <button className="button" type="submit">
          Sign Up
        </button>
      </form>
      <div className="bottom-text">
        Have an account?{' '}
        <Link to="/login" className="link">
          Log In.
        </Link>
      </div>
    </>
  );

  render() {
    const { type } = this.props;
    return (
      <div className="auth-container">
        <div className="auth-header">
          <Tear className="icon" />
          <span>Tyr</span>
        </div>
        {type === 'login' ? this.renderLogin() : this.renderSignup()}
      </div>
    );
  }
}

export default Auth;
