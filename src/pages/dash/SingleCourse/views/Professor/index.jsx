import React, { Component } from 'react';

import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import Card from 'Components/Card';
import Menu from './Menu';
import Assignments from './Assignments';
import Students from './Students';
import { stringToColour } from '../../../../../utils/misc';

import './styles.scss';

class Professor extends Component {
  state = {};

  render() {
    const { data: course, history, match } = this.props;
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
              path="/dashboard/course/:cid/students/"
              component={() => Students({ students: course.students })}
            />
            <Route
              render={() => {
                history.push(
                  `/dashboard/course/${match.params.cid}/assignments`
                );
                return null;
              }}
            />
          </Switch>

          {/* eslint-disable-next-line react/destructuring-assignment */}
          {this.props.children}
        </Card>
      </div>
    );
  }
}

export default withRouter(Professor);
