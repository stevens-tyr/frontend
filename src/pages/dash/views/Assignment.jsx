import React, { Component } from 'react';

class Assignment extends Component {
  state = {};

  render() {
    console.log('assignment props:', this.props);
    return <div>Assignment</div>;
  }
}

export default Assignment;
