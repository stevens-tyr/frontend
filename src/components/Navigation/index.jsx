import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './styles.scss';

import Tear from '../common/Tear';

// eslint-disable-next-line no-underscore-dangle
const _NavLink = ({ to, text, match }) => (
  <Link to={to} className={`${match.path === to && 'active'} navlink`}>
    <div className="text">{text}</div>
  </Link>
);

const NavLink = withRouter(_NavLink);

const Navigation = () => (
  <header className="nav">
    <div className="nav-container">
      <div className="left">
        <Tear sizeClass="icon" />
        <NavLink to="/dashboard" text="Dashboard" />
        <NavLink to="/courses" text="Courses" />
        <NavLink to="/calendar" text="Calendar" />
      </div>
      <div className="right">
        <a href="/logout" className="logout">
          Log Out
        </a>
      </div>
    </div>
  </header>
);

export default Navigation;
