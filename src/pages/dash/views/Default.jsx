/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import eva from 'eva-icons';
import tyr from '../../../utils/tyr';
import Card from '../../../components/Card';

// import MyHead from './myhead.jpg';

class Default extends Component {
  state = {
    activity: [
      {
        course: 'CS-385',
        name: 'GCD',
        passed: 10,
        failed: 0
      },
      {
        course: 'CS-546',
        name: 'Async',
        passed: 22,
        failed: 4
      },
      {
        course: 'CS-115',
        name: 'Recursion',
        passed: 2,
        failed: 13
      },
      {
        course: 'CS-392',
        name: 'mylib',
        passed: 1,
        failed: 72
      },
      {
        course: 'CS-496',
        name: 'HW 2',
        passed: 16,
        failed: 8
      }
    ]
  };

  async componentDidMount() {
    eva.replace({
      height: 30,
      width: 30
    });
    try {
      const { data: courses } = await tyr.get('plague_doctor/dashboard');
      // this.setState({ courses });
      /* eslint-disable-next-line */
      console.log(data);
    } catch (e) {
      /* eslint-disable-next-line */
      console.error(e);
    }
  }

  render() {
    const { activity } = this.state;
    return (
      <>
        <div className="activity">Tyr Home</div>
        <div className="home">
          <Card className="profile">
            <img alt="head" />
            <div className="intro">
              <h1>Howdy,</h1>
              <h2>Rob</h2>
              <div className="email">
                <i data-eva="credit-card-outline" />
                student@stevens.edu
              </div>
            </div>
          </Card>
          <div className="split">
            <Card className="total">
              <div className="assignments">
                <h1>30</h1>
                <div className="tiny">Total Assignments</div>
              </div>
              <div className="mid">-In-</div>
              <div className="courses">
                <h1>5</h1>
                <div className="tiny">Courses</div>
              </div>
            </Card>
            <Card className="unfinished">
              <h1>12</h1>
              <div>
                <h2>Unfinished</h2>
                <h3>Assignments</h3>
              </div>
            </Card>
          </div>
        </div>
        <div className="activity">Recent Activity</div>
        {activity.map(e => (
          <Card className="recent" key={e.course + '-' + e.name}>
            <div className="course">
              <h1>{e.course}</h1>
              <div className="tiny">Course</div>
            </div>
            <div className="name">
              <h1>{e.name}</h1>
              <div className="tiny">Name</div>
            </div>
            <div className="passed">
              <h1>{e.passed}</h1>
              <div className="tiny">Passed</div>
            </div>
            <div className="failed">
              <h1>{e.failed}</h1>
              <div className="tiny">Failed</div>
            </div>
            <div className="more">
              <i data-eva="more-vertical-outline" />
            </div>
          </Card>
        ))}
      </>
    );
  }
}

export default Default;
