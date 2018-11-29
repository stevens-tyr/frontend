import React, { Component } from 'react';
import tyr from '../../../utils/tyr';
import CourseNav from '../../../components/coursenav';

class Course extends Component {
  state = {
    id: null
  };

  async componentDidMount() {
    try {
      const {
        match: {
          params: { cid }
        }
      } = this.props;
      const {
        data: { course }
      } = await tyr.get(`plague_doctor/course/${cid}`);
      this.setState(course);
    } catch (e) {
      /* eslint-disable-next-line */
      console.error(e);
    }
  }

  render() {
    const { id, name, department, section, number } = this.state;
    return (
      id && (
        <div style={{ display: 'flex', width: '100%' }}>
          <CourseNav {...this.state} />
          <div className="course-info">
            <h1>
              {department}
              {number}
              {section}
            </h1>
            <h2>{name}</h2>
            <div style={{ maxWidth: '600px' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              vero quibusdam necessitatibus. Quasi omnis, nisi quibusdam amet
              perspiciatis excepturi ratione fugit? Provident veritatis nemo
              sapiente deleniti aut tempore magnam soluta!
            </div>
          </div>
        </div>
      )
    );
  }
}

export default Course;
