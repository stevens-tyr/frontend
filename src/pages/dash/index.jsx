import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';

import { addMsg } from '../../actions/auth.actions';
import tyr from '../../utils/tyr';
import SideNav from '../../components/sidenav';

import Default from './views/Default';
import Course from './views/Course';
import Assignments from './views/Assignments';
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
    return (
      <div className="dashboard">
        <SideNav />
        <Switch>
          <Route exact path="/dashboard/" component={Default} />
          <Route exact path="/dashboard/course/:cid" component={Course} />
          <Route
            path="/dashboard/course/:cid/assignments/"
            component={Assignments}
          />
          <Route
            path="/dashboard/course/:cid/assignments/:aid"
            component={Assignment}
          />
          <Route path="*" component={() => <Redirect to="/dashboard/" />} />
        </Switch>
      </div>
    );
  }
}
export default connect(
  null,
  { addMsg }
)(Dashboard);
