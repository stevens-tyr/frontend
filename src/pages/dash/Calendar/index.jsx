/* eslint-disable */
import React, { Component } from 'react';

import Card from 'Components/Card';
import { Calendar, Badge } from 'antd';
import tyr from 'Utils/tyr';
import { stringToColour } from 'Utils/misc';
import dayjs from 'dayjs';

import './styles.scss';
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

  /**
   * TODO: offload this functionality to the backend
   *
   * Create a dictionary of the schema: {Date: [{id, courseId, name}]}
   */
  buildAssignmentsDict = assignments => {
    let dict = {};
    for (let a of assignments) {
      console.log(a);
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
    return (
      <ul className="events">
        {assignments.map(a => {
          return (
            <li key={a.id}>
              <Badge color={stringToColour(a.courseID)} text={a.name} />
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
      this.state && (
        <div>
          <Card>
            <div className="calendar-header-box">
              <h2 className="calendar-header">Your Calendar</h2>
            </div>
            <Calendar
              dateCellRender={this.dateCellRender}
              monthCellRender={this.monthCellRender}
            />
          </Card>
        </div>
      )
    );
  }
}

export default DashCalendar;
