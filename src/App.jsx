import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { hot } from 'react-hot-loader';
import * as Pages from './pages';

const App = () => (
  <BrowserRouter>
    <>
      <LoadingBar className="loading-bar" />
      <Switch>
        <Route exact path="/" component={Pages.Landing} />
        <Route path="/login" component={() => <Pages.Auth type="login" />} />
        <Route path="/signup" component={() => <Pages.Auth type="signup" />} />
        <Route path="/dashboard" component={Pages.Dashboard} />
        <Route path="/not-authorized" component={Pages.NotAuthorized} />
        <Route path="*" component={Pages.FourOhFour} />
      </Switch>
    </>
  </BrowserRouter>
);

export default hot(module)(App);
