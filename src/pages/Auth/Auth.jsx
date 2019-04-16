import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import tyr from 'Utils/tyr';
import Tear from 'Components/Tear/Tear';
import { addMsg, clearMsg } from '../../actions/auth.actions';
import './Auth.scss';

class Auth extends Component {
  componentWillUnmount = () => {
    const { auth, clearMsg: clear } = this.props;
    // If we have an error message, clear it when unmounting
    if (auth.msgType === 'ERR') {
      clear();
    }
  };

  serializeFormData = form => {
    const formData = new FormData(form);
    return [...formData.entries()].reduce(
      (acc, entry) => ({
        ...acc,
        [entry[0]]: entry[1]
      }),
      {}
    );
  };

  sendReq = async ev => {
    ev.preventDefault();
    const { history, type, addMsg: add, clearMsg: clear } = this.props;
    const json = this.serializeFormData(ev.target);
    try {
      if (type === 'login') {
        await tyr.post('auth/login', json);
        clear();
        history.push('/dashboard');
      } else {
        await tyr.post('auth/register', json);
        add('SUCC', 'Account Created Successfully', 'You may now login.');
        history.push('/login');
      }
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        add('ERR', `Unable to ${type}`, e.response.data.message);
      } else {
        add('ERR', 'An Unknown Error Occurred', 'Unable to Process Request');
      }
    }
  };

  renderMsg = () => {
    const { auth } = this.props;
    if (!auth.msg) return null;
    return (
      <div className={`auth-msg-${auth.msgType}`}>
        <div className="head">{auth.msgHead}</div>
        <div className="msg">{auth.msg.toLowerCase()}</div>
      </div>
    );
  };

  renderLogin = () => (
    <>
      <form className="auth-form" onSubmit={this.sendReq}>
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
        <button className="button-success" type="submit">
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
      <form className="auth-form" onSubmit={this.sendReq}>
        <span className="form-label">Sign Up</span>
        <input
          className="text-input"
          type="text"
          name="firstName"
          placeholder="First Name"
        />
        <input
          className="text-input"
          type="text"
          name="lastName"
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
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          className="text-input"
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
        />
        <button className="button-info" type="submit">
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
        <Link className="auth-header" to="/">
          <Tear className="icon" />
          <span>Tyr</span>
        </Link>
        {this.renderMsg()}
        {type === 'login' ? this.renderLogin() : this.renderSignup()}
      </div>
    );
  }
}

export default withRouter(
  connect(
    ({ auth }) => ({
      auth
    }),
    { addMsg, clearMsg }
  )(Auth)
);
