/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tyr from '../../../utils/tyr';
import Card from 'Components/Card';
import { Empty } from 'antd';
import * as eva from 'eva-icons';
import './styles.scss';

// Src: https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
const stringToColour = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
};

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

  componentWillUnmount() {
    this._mounted = false;
  }

  componentDidUpdate() {
    eva.replace();
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
    console.log(courses);
    if (filtered.length) {
      return filtered.map(a => {
        const c = courses.find(e => e._id === a.couseID);
        return (
          <Card key={a.id}>
            <div>{a.name}</div>
            <div>{c.longName}</div>
            <div>{new Date(a.dueDate).toLocaleDateString()}</div>
          </Card>
        );
      });
    } else {
      return (
        <Card>
          <Empty description="Nothing to do!" />
        </Card>
      );
    }
  }

  renderRecent() {
    const { mostRecentSubmissions } = this.state;
    if (mostRecentSubmissions.length) {
      return mostRecentSubmissions.map(s => (
        <Card key={s._id}>{JSON.stringify(s)}</Card>
      ));
    } else {
      return (
        <Card>
          <Empty description="Nothing submitted yet!" />
        </Card>
      );
    }
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
