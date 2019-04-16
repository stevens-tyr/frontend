import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import tyr from 'Utils/tyr';
import './styles.scss';
import Tear from '../../components/common/Tear';

class Landing extends Component {
  state = {
    loaded: false
  };

  async componentDidMount() {
    const { history } = this.props;
    try {
      await tyr.get('auth/logged_in');
      history.push('/home');
    } catch (e) {
      // we aren't authed
      this.setState({ loaded: true });
    }
  }

  render() {
    const { loaded } = this.state;
    return (
      loaded && (
        <div className="landing-container">
          <Tear className="logo" />
          <Link className="button-success no-link-style" to="/login">
            Login
          </Link>
          <Link className="button-info no-link-style" to="/signup">
            Register
          </Link>
        </div>
      )
    );
  }
}

export default Landing;
