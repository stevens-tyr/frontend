import React, { Component } from 'react';

// eslint-disable-next-line import/no-unresolved
import Card from 'Components/Card';
import { stringToColour } from '../../../../utils/misc';

class Professor extends Component {
  state = {};

  render() {
    const { data: course } = this.props;
    return (
      <div className="professor-view course-info">
        <Card
          style={{
            borderLeft: `0.8rem solid ${stringToColour(
              course.department + course.number + course.role
            )}`
          }}
        >
          <div className="number">
            {`${course.department} ${course.number}${course.section}: ${
              course.longName
            }`}
          </div>
        </Card>

        <Card className="dark">
          <div className="assistants">
            {course.assistants.map(a => (
              // eslint-disable-next-line no-underscore-dangle
              <div key={a._id}>
                <div className="name">{`TA: ${a.firstName} ${a.lastName}`}</div>
                <div>{a.email}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }
}

export default Professor;
