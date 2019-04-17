import React, { Component } from 'react';

import { Switch, Route } from 'react-router';
import { withRouter, Redirect } from 'react-router-dom';
import Card from 'Components/Card/Card';
import { stringToColour } from 'Utils/misc';
import { Roles } from 'Utils/vars';
import Menu from '../Menu/Menu';
import Assignments from '../Assignments/Assignments';
import People from '../People/People';

import './Student.scss';

class Student extends Component {
  state = {};

  render() {
    const { course, match } = this.props;
    return (
      <div className="professor-view">
        <Card>
          <div className="course-name">
            <span
              style={{
                backgroundColor: stringToColour(
                  course.department + course.number + course.role
                )
              }}
            />
            <h2>
              {`${course.department} ${course.number}${course.section}: ${
                course.longName
              }`}
            </h2>
          </div>

          <Menu />

          <Switch>
            <Route
              exact
              path="/dashboard/course/:cid/assignments/"
              component={() =>
                Assignments({
                  assignments: course.assignments,
                  role: Roles.student
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

export default withRouter(Student);
