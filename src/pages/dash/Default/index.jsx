/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tyr from '../../../utils/tyr';
import Card from 'Components/Card';
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
    const { assignments } = this.state;
    // const filtered = assignments.filter(e => new Date(e.dueDate) > new Date());
    // if (filtered.length) {
    return assignments.map(a => <Card key={a.id}>{JSON.stringify(a)}</Card>);
    // } else {
    //   return <Card>Nothing To Do!</Card>;
    // }
  }

  renderRecent() {
    const { mostRecentSubmissions } = this.state;
    return mostRecentSubmissions.map(s => (
      <Card key={s._id}>{JSON.stringify(s)}</Card>
    ));
  }

  render() {
    const { user, fetched } = this.state;
    console.log(this.state);
    if (!fetched) return null;
    return (
      <>
        <div className="intro">
          <Card className="profile dark">
            <div>
              <h1>
                {user.firstName} {user.lastName}
              </h1>
            </div>
            <div>{user.email}</div>
          </Card>
          <Card className="courses">Lorem ipsum</Card>
          <Card className="courses">Lorem ipsum</Card>
        </div>
        <h3 className="m-l-1">Courses</h3>
        <div className="courses">{this.renderCourses()}</div>
        <h3 className="m-l-1">Todo Assignments</h3>
        <div className="recent-submissions">{this.renderTodo()}</div>
        <h3 className="m-l-1">Most Recent Submissions</h3>
        <div className="recent-submissions">{this.renderRecent()}</div>
      </>
    );
  }
}

export default Default;
