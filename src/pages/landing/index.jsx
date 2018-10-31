import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <>
    <h1>Landing Page</h1>
    <div>
      <Link to="/login">Auth</Link>
    </div>
    <div>
      <Link to="/dashboard">Dashboard</Link>
    </div>
    <div>
      <Link to="/fourohfour">404 Page</Link>
    </div>
  </>
);

export default Landing;
