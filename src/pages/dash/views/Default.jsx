/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tyr from '../../../utils/tyr';
import Card from '../../../components/Card';

class Default extends Component {
  state = {
    courses: []
  };

  async componentDidMount() {
    try {
      const { data: courses } = await tyr.get('plague_doctor/dashboard');
      this.setState({ courses });
      /* eslint-disable-next-line */
      console.log(data);
    } catch (e) {
      /* eslint-disable-next-line */
      console.error(e);
    }
  }

  render() {
    const { courses } = this.state;
    return (
      <>
        <div className="home">
          <Card className="profile">testing</Card>
          <div className="split">
            <Card className="total">testing</Card>
            <Card className="unfinished">testing</Card>
          </div>
        </div>
        <div className="activity">Recent Activity</div>
        <Card className="total">testing</Card>
        <Card className="total">testing</Card>
        <Card className="total">testing</Card>
        <Card className="total">testing</Card>
        <Card className="total">testing</Card>
      </>
    );
  }
}

export default Default;
