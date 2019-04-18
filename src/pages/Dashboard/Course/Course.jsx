/* eslint-disable */
import React, { Component } from 'react';

import tyr from 'Utils/tyr';

import StudentView from './Student/Student';
import ProfessorView from './Professor/Professor';

class Course extends Component {
  state = {
    fetched: false
  };

  async componentDidMount() {
    await this.fetchInfo();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  fetchInfo = async () => {
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
  };

  render() {
    const { fetched, course } = this.state;

    if (!fetched) return null;
    return (
      <div className="course">
        {course.role === 'student' ? (
          <StudentView course={course} />
        ) : (
          <ProfessorView course={course} updateParent={this.fetchInfo} />
        )}
      </div>
    );
  }
}

export default Course;
