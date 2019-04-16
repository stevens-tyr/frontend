import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import * as Pages from './pages/Pages';

const App = () => (
  <BrowserRouter>
    <>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route path="/login" component={() => <Pages.Auth type="login" />} />
        <Route path="/signup" component={() => <Pages.Auth type="signup" />} />
        <Route path="/dashboard" component={Pages.Dashboard} />
        {/* TODO: Make a 404 Page */}
        <Route path="*" component={() => <Redirect to="/login" />} />
      </Switch>
    </>
  </BrowserRouter>
);

export default hot(module)(App);
