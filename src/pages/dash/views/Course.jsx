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
      /* eslint-disable-next-line */
      this.setState(course, () => console.log(this.state));
      console.log('course data:', course);
    } catch (e) {
      /* eslint-disable-next-line */
      console.error(e);
    }
  }

  render() {
    const { id } = this.state;
    return (
      id && (
        <div style={{ display: 'flex' }}>
          <CourseNav {...this.state} />
          <div>TEST</div>
        </div>
      )
    );
  }
}

export default Course;
