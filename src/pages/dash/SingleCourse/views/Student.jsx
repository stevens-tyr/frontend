import React, { Component } from 'react';

class Student extends Component {
  state = {};

  render() {
    const { data } = this.props;
    return (
      <>
        <div>Student View</div>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </>
    );
  }
}

export default Student;
