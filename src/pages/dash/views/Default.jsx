import React, { Component } from 'react';
import tyr from '../../../utils/tyr';
import { courses, assignments } from '../data';

import ListItem from '../../../components/listItem';
import ListRow from '../../../components/listRow';

class Default extends Component {
  async componentDidMount() {
    try {
      const { data } = await tyr.get('plague_doctor/dashboard');
      /* eslint-disable-next-line */
      console.log(data);
    } catch (e) {
      /* eslint-disable-next-line */
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <h1 className="header">Dashboard</h1>
        <h2>Courses</h2>
        {courses.map(({ department, number, section, name, color }) => (
          <ListItem
            key={`${department}-${number}-${section}`}
            header={`${department}${number} ${section} - ${name}`}
            subheader="Last updated on 2018-06-01"
            thumbnailColor={color}
          />
        ))}

        <h2>Recent Assignments</h2>
        {assignments.map(({ course, name, dueDate }) => (
          <ListRow
            key={`${course}-${name}`}
            header={`${course} | ${name}`}
            subheader={`Due on ${dueDate}`}
            thumbnailColor="red"
            cols={['Submitted on 2018-12-01', '85']}
          />
        ))}
      </>
    );
  }
}

export default Default;