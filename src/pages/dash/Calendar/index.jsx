/* eslint-disable */
import React, { Component } from 'react';

import Card from 'Components/Card';
import { Calendar, Badge } from 'antd';
import tyr from '../../../utils/tyr';
import { stringToColour } from '../../../utils/misc';
import dayjs from 'dayjs';

class DashCalendar extends Component {
  async componentDidMount() {
    this._mounted = true;
    try {
      const { data } = await tyr.get('plague_doctor/dashboard');
      // Prevents state from being updated when component becomes unmounted
      this._mounted &&
        this.setState({
          assignments: this.buildAssignmentsDict(data.assignments),
          fetched: true
        });
    } catch (e) {
      console.error(e);
    }
  }

  // TODO: offload this functionality to the backend
  /**
   * Create a dictionary of the schema: {Date: [{id, courseId, name}]}
   */
  buildAssignmentsDict = assignments => {
    let dict = {};
    for (let a of assignments) {
      let { id, courseID, dueDate, name } = a;
      dueDate = dayjs(dueDate).format('YYYY-MM-DD');
      if (dict[dueDate] === undefined) {
        dict[dueDate] = [];
      }
      dict[dueDate].push({
        id,
        courseID,
        name
      });
    }
    return dict;
  };

  /**
   * Get all assignments that are due on a given day
   */
  getListData = day => {
    let listData;
    const { assignments } = this.state;
    const currDate = dayjs(day).format('YYYY-MM-DD');
    listData = assignments[currDate];
    return listData || [];
  };

  getMonthData = value => {
    if (value.month()) {
      return 1394;
    }
    return null;
  };

  dateCellRender = value => {
    const assignments = this.getListData(value);
    console.log('test', assignments);
    return (
      <ul className="events">
        {assignments.map(a => {
          console.log(a);
          return (
            <li key={a.id}>
              {/*<Badge color={stringToColour(a.courseID)} text={a.name} />*/}
              {/* TODO: Fix this color. For some reason, antd color property not working... */}
              <Badge status="error" text={a.name} />
            </li>
          );
        })}
      </ul>
    );
  };

  monthCellRender = value => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  render() {
    return (
      <Card>
        <Badge style={{ color: 'red' }} text={'Test'} />
        {this.state && (
          <Calendar
            dateCellRender={this.dateCellRender}
            monthCellRender={this.monthCellRender}
          />
        )}
      </Card>
    );
  }
}

export default DashCalendar;
