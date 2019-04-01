import React, { Component } from 'react';

class Professor extends Component {
  state = {};

  render() {
    const { data } = this.props;
    return (
      <>
        <div>Professor View</div>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </>
    );
  }
}

export default Professor;
