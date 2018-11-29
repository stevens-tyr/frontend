/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tyr from '../../../utils/tyr';

import ListItem from '../../../components/listItem';
import ListRow from '../../../components/listRow';

class Default extends Component {
  state = {
    courses: []
  };

  async componentDidMount() {
    try {
      const { data } = await tyr.get('plague_doctor/dashboard');
      /* eslint-disable-next-line */
      this.setState(data);
      console.log(data);
    } catch (e) {
      /* eslint-disable-next-line */
      console.error(e);
    }
  }

  color = ['red', 'green', 'blue'];

  render() {
    const { courses } = this.state;
    return (
      <div className="content-dashboard">
        <h1 className="header">Dashboard</h1>
        <h2>Courses</h2>
        {courses.map(({ department, number, section, name, id }, i) => (
          <Link to={`/dashboard/course/${id}/`} key={id}>
            <ListItem
              header={`${department}-${number} ${section} ${name}`}
              subheader="Last updated on 2018-06-01"
              thumbnailColor={this.color[i]}
            />
          </Link>
        ))}

        <h2>Recent Activity</h2>
        <p style={{ paddingTop: '1rem' }}>Nothing to Show!</p>
        {/* {assignments.map(({ course, name, dueDate }) => (
          <Link
            to={`${match.url}/course/:cid/assignment/:aid`}
            key={`${course}-${name}`}
          >
            <ListRow
              header={`${course} | ${name}`}
              subheader={`Due on ${dueDate}`}
              thumbnailColor="red"
              cols={['Submitted on 2018-12-01', '85']}
            />
          </Link>
        ))} */}
      </div>
    );
  }
}

export default Default;
