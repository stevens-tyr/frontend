/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from 'Components/Card';
import tyr from '../../../utils/tyr';
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

class Courses extends Component {
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

  render() {
    const { user, fetched, courses } = this.state;
    if (!fetched) return null; // im lazy
    return (
      <div className="users-courses">
        <h1>{user.firstName}'s Courses</h1>
        {courses.map(c => (
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
        ))}
      </div>
    );
  }
}

export default Courses;
