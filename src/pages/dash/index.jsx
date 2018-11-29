import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';

import { addMsg } from '../../actions/auth.actions';
import tyr from '../../utils/tyr';
import SideNav from '../../components/sidenav';

import Default from './views/Default';
import Course from './views/Course';
import Assignment from './views/Assignment';

import './styles.scss';

class Dashboard extends Component {
  async componentDidMount() {
    const { history } = this.props;
    try {
      await tyr.get('auth/logged_in');
    } catch (e) {
      addMsg('ERR', 'Not Authorized', 'Please Login');
      history.push('/login');
    }
  }

  render() {
    const { match } = this.props;
    return (
      <div className="dashboard">
        <SideNav />
        <Switch>
          <Route exact path={`${match.url}/`} component={Default} />
          <Route exact path={`${match.url}/course/:cid`} component={Course} />
          <Route
            path={`${match.url}/course/:cid/assignment/:aid`}
            component={Assignment}
          />
          <Route path="*" component={() => <Redirect to={`${match.url}/`} />} />
        </Switch>
      </div>
    );
  }
}
export default connect(
  null,
  { addMsg }
)(Dashboard);
