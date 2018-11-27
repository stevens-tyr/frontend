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
          <hr />
          {courses.map(course => (
            <ListItem
              header={`${course.department}${course.number} ${
                course.section
              } - ${course.name}`}
              subheader="Last updated on 2018-06-01"
              thumbnailColor={course.color}
            />
          ))}

          <h2>Assignments</h2>
          <hr />
          {assignments.map(a => (
            <ListRow
              header={`${a.course} | ${a.name}`}
              subheader={`Due on ${a.dueDate}`}
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
