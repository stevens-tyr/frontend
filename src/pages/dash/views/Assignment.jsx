import React, { Component } from 'react';

class Assignment extends Component {
  state = {};

  render() {
    const {
      match: {
        param: { aid }
      }
    } = this.props;

    return <div>Assignment {aid} </div>;
  }
}

export default Assignment;
