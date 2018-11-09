import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { notify } from 'reapop';

import './styles.scss';
import Tear from '../../components/common/Tear';

class Auth extends Component {
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
    const { history, type, noti } = this.props;
    const json = this.serializeFormData(ev.target);
    try {
      if (type === 'login') {
        await axios.post('/api/v1/auth/login', json);
        history.push('/dashboard');
      } else {
        await axios.post('/api/v1/auth/register', json);
        noti({
          title: 'Account Created Successfully',
          message: 'You can now login.',
          position: 't',
          status: 'success',
          dismissible: true,
          dismissAfter: 5000
        });
        history.push('/login');
      }
    } catch (e) {
      noti({
        title: 'An Error Occurred',
        message: e.response.data.message,
        position: 't',
        status: 'error',
        dismissible: true,
        dismissAfter: 5000
      });
    }
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
        {type === 'login' ? this.renderLogin() : this.renderSignup()}
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { noti: notify }
  )(Auth)
);
