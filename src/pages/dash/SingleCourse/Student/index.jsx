/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';

import dayjs from 'dayjs';

import Card from 'Components/Card';
import { stringToColour } from 'Utils/misc';
import Collapse from '../Collapse';

import './styles.scss';

class Student extends Component {
  state = {};

  render() {
    const { data: course } = this.props;
    const { role } = course;
    let pastAssignments;
    let upcomingAssignments;

    if (course) {
      pastAssignments = course.assignments.filter(a =>
        dayjs(a.dueDate).isAfter(dayjs())
      );
      upcomingAssignments = course.assignments
        .filter(a => dayjs(a.dueDate).isBefore(dayjs()))
        .reverse();
    }
    return (
      <>
        <div className="student-view course-info">
          <Card
            style={{
              borderLeft: `0.8rem solid ${stringToColour(
                course.department + course.number + course.role
              )}`
            }}
          >
            <div className="number">
              {`${course.department} ${course.number}${course.section}: ${
                course.longName
              }`}
            </div>
          </Card>

          <Card className="dark">
            <div className="profs">
              {course.professors.map(p => (
                <div key={p._id}>
                  <div className="name">{`Prof. ${p.firstName} ${
                    p.lastName
                  }`}</div>
                  <div>{p.email}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="dark">
            <div className="assistants">
              {course.assistants.map(a => (
                <div key={a._id}>
                  <div className="name">{`TA: ${a.firstName} ${
                    a.lastName
                  }`}</div>
                  <div>{a.email}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="dash-label">Upcoming Assignments</div>
        <Collapse data={upcomingAssignments} role={role} />

        <div className="dash-label">Past Assignments</div>
        <Collapse data={pastAssignments} role={role} />
      </>
    );
  }
}

export default Student;
