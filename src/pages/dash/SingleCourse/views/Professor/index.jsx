import React, { Component } from 'react';

import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import Card from 'Components/Card';
// eslint-disable-next-line import/no-unresolved
import Form from 'Components/Form';
import Menu from './Menu';
import Assignments from './Assignments';
import People from './People';
import { stringToColour } from '../../../../../utils/misc';

import './styles.scss';

class Professor extends Component {
  assignmentForm = [
    { type: 'text', label: 'Assignment Name', name: 'assignment-name' },
    { type: 'date-time', label: 'Due Date', name: 'assignment-duedate' },
    {
      type: 'editor',
      label: 'Assignment Description',
      name: 'assignment-description'
    }
  ];

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
            {/* TODO: .../assignments/new route should be removed in favor of a model */}
            <Route
              exact
              path="/dashboard/course/:cid/assignments/new"
              component={() =>
                React.createElement(Form, {
                  title: 'New Assignment',
                  fields: this.assignmentForm
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
