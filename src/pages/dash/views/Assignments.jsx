/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import * as eva from 'eva-icons';

import tyr from '../../../utils/tyr';
import CourseNav from '../../../components/coursenav';
import ListRow from '../../../components/listRow';

class Assignment extends Component {
  state = {
    course: {
      id: null
    },
    assignments: [],
    currentKey: null,
    jobLog: null
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
      const assignments = await Promise.all(
        course.assignments.map(async aid => {
          const {
            data: { assign }
          } = await tyr.get(`plague_doctor/assignment/${aid}`);
          return assign;
        })
      );
      this.setState({ assignments, course });
    } catch (e) {
      /* eslint-disable-next-line */
      console.error(e);
    }
    eva.replace({
      height: 40,
      width: 40,
      fill: 'black'
    });
  }

  startJob = async () => {
    const { currentKey } = this.state;
    await axios.post(`http://localhost:4000/api/v1/grader/${currentKey}/new`);
  };

  jobStatus = async () => {
    const { currentKey } = this.state;
    try {
      const {
        data: { logs }
      } = await axios.get(
        `http://localhost:4000/api/v1/grader/${currentKey}/status`
      );
      this.setState({ jobLog: logs });
    } catch (e) {
      if (e.response.data) {
        if (e.response.data.err) {
          if (e.response.data.err.ErrStatus) {
            const { message, reason } = e.response.data.err.ErrStatus;
            this.setState({ jobLog: `[${reason}]: ${message}` });
            return;
          }
        }
      }
      this.setState({ jobLog: `Error Getting Job Info From Kubernetes` });
    }
  };

  setKey = async id => {
    const { currentKey } = this.state;
    this.setState(
      { currentKey: currentKey === id ? null : id, jobLog: null },
      async () => {
        if (this.state.currentKey) {
          await this.jobStatus();
        }
      }
    );
  };

  showCode = () => {
    const { jobLog } = this.state;
    return (
      <div>
        <button onClick={this.startJob} className="button-error tiny-but">
          Trigger Job
        </button>
        <button onClick={this.jobStatus} className="button-info tiny-but ">
          Refresh
        </button>
        <pre className="code">{jobLog ? jobLog : 'Loading...'}</pre>
      </div>
    );
  };

  render() {
    const { assignments, course, currentKey } = this.state;
    return (
      course.id && (
        <div style={{ display: 'flex', width: '100%' }}>
          <CourseNav {...course} />
          <div className="assignments">
            <h2>Assignments</h2>
            {assignments.map(({ name, id, dueDate }) => (
              <div key={id}>
                <ListRow
                  header={name}
                  subheader={`Due on ${dueDate}`}
                  thumbnailColor="green"
                  cols={[
                    'Not Grade Yet',
                    '0/0 Tests',
                    <div onClick={() => this.setKey(id)}>
                      <i data-eva="arrowhead-down-outline" />
                    </div>
                  ]}
                />
                {currentKey === id && this.showCode()}
              </div>
            ))}
          </div>
        </div>
      )
    );
  }
}

export default Assignment;
