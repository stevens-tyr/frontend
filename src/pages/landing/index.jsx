import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';
import Tear from '../../components/common/Tear';

const Landing = () => (
  <div className="landing-container">
    <Tear className="logo" />
    <Link className="button-success no-link-style" to="/login">
      Login
    </Link>
    <Link className="button-info no-link-style" to="/signup">
      Register
    </Link>
  </div>
);

export default Landing;
