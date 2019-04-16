import React, { Component } from 'react';

import { Switch, Route } from 'react-router';
import { withRouter, Redirect } from 'react-router-dom';
import Card from 'Components/Card';
import { stringToColour } from 'Utils/misc';
import Menu from './Menu';
import Assignments from './Assignments';
import People from './People';

import './styles.scss';

class Professor extends Component {
  state = {};

  render() {
    const { data: course, match } = this.props;
    return (
      <div className="professor-view">
        <Card>
          <div
            className="course-name"
            style={{
              borderLeft: `6px solid ${stringToColour(
                course.department + course.number + course.role
              )}`
            }}
          >
            {`${course.department} ${course.number}${course.section}: ${
              course.longName
            }`}
          </div>

          <Menu />

          <Switch>
            <Route
              exact
              path="/dashboard/course/:cid/assignments/"
              component={() =>
                Assignments({
                  assignments: course.assignments
                })
              }
            />
            <Route
              exact
              path="/dashboard/course/:cid/people/"
              component={() =>
                People({
                  students: course.students,
                  assistants: course.assistants
                })
              }
            />
            <Route
              path="*"
              component={() => (
                <Redirect
                  to={`/dashboard/course/${match.params.cid}/assignments/`}
                />
              )}
            />
          </Switch>
        </Card>
      </div>
    );
  }
}

export default withRouter(Professor);
