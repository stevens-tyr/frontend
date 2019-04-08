/* eslint-disable */
import React, { Component } from 'react';

import tyr from '../../../utils/tyr';

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

    if (!fetched) return null;
    return (
      <div className="course">
        {course.role === 'student' ? (
          <StudentView data={course} />
        ) : (
          <ProfessorView data={course} />
        )}
      </div>
    );
  }
}

export default Course;
