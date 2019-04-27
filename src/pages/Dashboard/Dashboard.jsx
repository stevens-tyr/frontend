import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';

import tyr from 'Utils/tyr';
import Navigation from 'Components/Navigation/Navigation';
import { addMsg } from '../../actions/auth.actions';

import Default from './Default/Default';
import CourseList from './CourseList/CourseList';
import Course from './Course/Course';
import AssignmentInfo from './AssignmentInfo/AssignmentInfo';
import Calendar from './Calendar/Calendar';

import './Dashboard.scss';

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
          <Route exact path="/dashboard/course" component={CourseList} />
          <Route
            exact
            path="/dashboard/course/:cid/assignments/:aid"
            component={AssignmentInfo}
          />
          <Route path="/dashboard/course/:cid" component={Course} />
          <Route exact path="/dashboard/calendar" component={Calendar} />
        </Switch>
      </div>
    );
  }
}
export default connect(
  null,
  { addMsg }
)(Dashboard);
