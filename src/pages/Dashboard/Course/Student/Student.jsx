/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';

import './Student.scss';

class Student extends Component {
  state = {};

  render() {
    const { course } = this.props;
    return <pre>{JSON.stringify(course)}</pre>;
  }
}

export default Student;
