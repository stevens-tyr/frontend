import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';

import { addMsg } from '../../actions/auth.actions';
import tyr from '../../utils/tyr';

import Navigation from '../../components/Navigation';
import Default from './Default';
import Courses from './Courses';
import SingleCourse from './SingleCourse';

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
        <Navigation />
        <Switch>
          <Route exact path="/dashboard/" component={Default} />
          <Route exact path="/dashboard/course" component={Courses} />
          <Route exact path="/dashboard/course/:cid" component={SingleCourse} />
          <Route
            path="/dashboard/course/:cid/:aid"
            component={() => <p>assignment page</p>}
          />
          <Route
            exact
            path="/dashboard/calendar"
            component={() => <p>calendar page</p>}
          />
        </Switch>
      </div>
    );
  }
}
export default connect(
  null,
  { addMsg }
)(Dashboard);
