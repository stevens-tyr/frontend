import React, { Component } from 'react';
import tyr from '../../utils/tyr';
import Sidebar from '../../components/sidebar';
import ListItem from '../../components/listItem';
import ListRow from '../../components/listRow';

import './styles.scss';
import { courses, assignments } from './data';

class Dashboard extends Component {
  state = {};

  async componentDidMount() {
    const { history } = this.props;
    try {
      await tyr.get('auth/logged_in');
      const { data } = await tyr.get('plague_doctor/dashboard');
      /* eslint-disable-next-line */
      console.log(data);
    } catch (e) {
      history.push('/not-authorized');
    }
  }

  render() {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="content-dashboard">
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
        </div>
      </div>
    );
  }
}

export default Dashboard;
