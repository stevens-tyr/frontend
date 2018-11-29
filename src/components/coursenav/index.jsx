import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as eva from 'eva-icons';
import './styles.scss';

class CourseNav extends Component {
  componentDidMount() {
    eva.replace({
      class: 'course-icons',
      fill: '#42526e'
    });
  }

  render() {
    const { department: dept, number, section, name, id } = this.props;
    return (
      <div className="course-nav">
        <div className="course-num">
          {dept}-{number} {section}
        </div>
        <div className="course-name">{name}</div>
        <div className="course-links">
          <Link to={`/dashboard/course/${id}`}>
            <i data-eva="home-outline" />Home
          </Link>
          <Link to={`/dashboard/course/${id}/assignments/`}>
            <i data-eva="folder-outline" />Assignments
          </Link>
          <Link to={`/dashboard/course/${id}`}>
            <i data-eva="archive-outline" />Grades
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(CourseNav);
