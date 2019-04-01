/* eslint-disable */
// TODO: Cleanup this into multiple components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';
import * as eva from 'eva-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PieChart from 'react-minimal-pie-chart';

import Card from 'Components/Card';
import tyr from '../../../utils/tyr';
import { stringToColour } from '../../../utils/misc';
import './styles.scss';

dayjs.extend(relativeTime);

class Default extends Component {
  state = {
    fetched: false
  };

  async componentDidMount() {
    this._mounted = true;
    try {
      const { data } = await tyr.get('plague_doctor/dashboard');
      // Prevents state from being updated when component becomes unmounted
      this._mounted && this.setState({ ...data, fetched: true });
    } catch (e) {
      console.error(e);
    }
  }

  componentDidUpdate() {
    eva.replace();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  renderCourses() {
    const { courses } = this.state;
    return courses.map(c => (
      <Link key={c.id} to={`/dashboard/course/${c.id}`}>
        <Card
          style={{
            borderLeft: `0.8rem solid ${stringToColour(
              c.department + c.number + c.role
            )}`
          }}
        >
          <div className="number">
            {c.department}-{c.number} {c.section}
          </div>
          <div>{c.longName}</div>
        </Card>
      </Link>
    ));
  }

  renderTodo() {
    const { assignments, courses } = this.state;
    const filtered = assignments.filter(e => new Date(e.dueDate) > new Date());
    if (filtered.length) {
      return filtered.map(a => {
        const c = courses.find(e => e._id === a.couseID); // im vv lazy
        return (
          <Link key={a.id} to={`/dashboard/course/${c.id}/${a.id}`}>
            <Card className="assignment">
              <div>
                <div className="name">{a.name}</div>
                <div>{c.longName}</div>
              </div>
              <div>
                <div className="date">
                  {dayjs(a.dueDate).format('MMM D [at] h:mm A')}
                </div>
                <div>({dayjs(a.dueDate).fromNow()})</div>
              </div>
            </Card>
          </Link>
        );
      });
    }
    return (
      <Card>
        <Empty description="Nothing to do!" />
      </Card>
    );
  }

  renderRecent() {
    const { mostRecentSubmissions } = this.state;
    if (mostRecentSubmissions.length) {
      return mostRecentSubmissions.slice(0, 3).map(s => (
        <Link
          key={s._id}
          to={`/dashboard/course/${s.course._id}/${s.assignment._id}`}
        >
          <Card className="sub">
            <div className="name">{s.assignment.name}</div>
            <div>
              {s.course.department}-{s.course.number} {s.course.section}
            </div>
            <div>Submitted: {dayjs(s.submissionDate).fromNow()}</div>
            <div>
              Attempt: {s.attemptNumber}/{s.assignment.numAttempts}
            </div>
            <PieChart
              lineWidth={30}
              label
              labelStyle={{
                fontSize: '1rem'
              }}
              labelPosition={45}
              className="pie"
              data={[
                {
                  title: 'Pass',
                  color: '#61e786',
                  value: s.cases.studentFacing.pass
                },
                {
                  title: 'Fail',
                  color: '#e27a70',
                  value: s.cases.studentFacing.fail
                }
              ]}
            />
          </Card>
        </Link>
      ));
    }
    return (
      <Card>
        <Empty description="Nothing submitted yet!" />
      </Card>
    );
  }

  render() {
    const { user, fetched, courses, assignments } = this.state;
    if (!fetched) return null; // im lazy
    return (
      <>
        <div className="intro">
          <Card className="profile dark">
            <div>
              <div className="name">
                {user.firstName} {user.lastName}
              </div>
              <div>{user.email}</div>
            </div>
            <i
              data-eva="person-outline"
              data-eva-height="72"
              data-eva-width="72"
            />
          </Card>
          <Card className="secondary">
            <i
              data-eva="layers-outline"
              data-eva-height="100"
              data-eva-width="100"
            />
            <div className="num">{courses.length}</div>
            <div className="label">Total Courses</div>
          </Card>
          <Card className="secondary">
            <i
              data-eva="file-text-outline"
              data-eva-height="100"
              data-eva-width="100"
            />
            <div className="num">{assignments.length}</div>
            <div className="label">Total Assignments</div>
          </Card>
        </div>
        <div className="dash-label">Courses</div>
        <div className="courses">{this.renderCourses()}</div>
        <div className="split">
          <div className="recent">
            <div className="dash-label">Most Recent Submissions</div>
            {this.renderRecent()}
          </div>
          <div className="upcoming">
            <div className="dash-label">Upcoming Assignments</div>
            {this.renderTodo()}
          </div>
        </div>
      </>
    );
  }
}

export default Default;
