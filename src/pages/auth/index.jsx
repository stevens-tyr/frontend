import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';

import './styles.scss';
import Tear from '../../components/common/Tear';

class Auth extends Component {
  state = {};

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

  sendLogin = async ev => {
    ev.preventDefault();
    const { history } = this.props;
    const json = this.serializeFormData(ev.target);
    try {
      const { data } = await axios.post('/api/v1/auth/login', json);
      history.push('/dashboard');
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  sendSignup = async ev => {
    ev.preventDefault();
    const { history } = this.props;
    const json = this.serializeFormData(ev.target);
    try {
      const { data } = await axios.post('/api/v1/auth/register', json);
      history.push('/login');
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  renderLogin = () => (
    <>
      <form className="auth-form" onSubmit={this.sendLogin}>
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
      <form className="auth-form" onSubmit={this.sendSignup}>
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
          type="text"
          name="emailConfirmation"
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
          name="passwordConfirmation"
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

export default withRouter(Auth);
