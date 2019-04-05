/* eslint-disable */
import React, { Component } from 'react';

import dayjs from 'dayjs';
import tyr from '../../../utils/tyr';
import './styles.scss';

import Collapse from './Collapse';
import StudentView from './views/Student';
import ProfessorView from './views/Professor';

class Course extends Component {
  state = {
    fetched: false
  };

  async componentDidMount() {
    const { cid } = this.props.match.params;
    this._mounted = true;
    try {
      const {
        data: { course }
      } = await tyr.get(`plague_doctor/course/${cid}`);
      // Prevents state from being updated when component becomes unmounted
      this._mounted && this.setState({ course, fetched: true });
    } catch (e) {
      console.error(e);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const { fetched, course } = this.state;
    let pastAssignments, upcomingAssignments;

    if (course) {
      pastAssignments = course.assignments.filter(a =>
        dayjs(a.dueDate).isAfter(dayjs())
      );
      upcomingAssignments = course.assignments
        .filter(a => dayjs(a.dueDate).isBefore(dayjs()))
        .reverse();
    }

    if (!fetched) return null;
    return (
      <div className="course">
        {course.role === 'student' ? (
          <StudentView data={course} />
        ) : (
          <ProfessorView data={course} />
        )}

        <div className="dash-label">Upcoming Assignments</div>
        <Collapse data={upcomingAssignments} />

        <div className="dash-label">Past Assignments</div>
        <Collapse data={pastAssignments} />
      </div>
    );
  }
}

export default Course;
