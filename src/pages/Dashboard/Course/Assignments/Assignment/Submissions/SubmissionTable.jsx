/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Icon } from 'antd';
import './SubmissionTable.scss';

export default class SubmissionTable extends Component {
  state = {
    submissions: this.props.submissions,
    testNum: 0,
    currTestCase: this.props.submissions.results[0]
  };

  // TODO: Remove this lifecycle method after developing submission ui
  componentDidMount() {
    const { submissions } = this.state;
    console.log(submissions);
  }

  selectTestCase = testNum => {
    const { submissions } = this.state;
    this.setState({ testNum, currTestCase: submissions.results[testNum] });
  };

  render() {
    const { submissions, testNum, currTestCase } = this.state;
    const { selectTestCase } = this;
    return submissions.inProgress ? (
      'Currently grading...'
    ) : (
      <div className="submission-table">
        <div className="cases-selector">
          {submissions.results.map((s, idx) => (
            <div
              key={s.id}
              className={`testcase ${testNum === idx ? 'active' : 'nonactive'}`}
              onClick={() => selectTestCase(idx)}
            >
              <div
                className={`testcase-name ${s.passed ? 'passed' : 'failed'}`}
              >
                Test Case {idx + 1}
                {s.passed ? (
                  <Icon
                    style={{ marginLeft: 10 }}
                    type="check-circle"
                    theme="twoTone"
                    twoToneColor="#52c41a"
                  />
                ) : (
                  <Icon
                    style={{ marginLeft: 10 }}
                    type="close-circle"
                    theme="twoTone"
                    twoToneColor="#f5222d"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="case-viewer">
          <div className="subheader">Test Case Status:</div>
          <div className="status">
            {currTestCase.passed ? 'Success' : 'Failure'}
          </div>
          <div className="subheader">
            Output Diff (Comparison between expected output and actual output):
          </div>
          <div className="diff">
            <code dangerouslySetInnerHTML={{ __html: currTestCase.html }} />
          </div>
        </div>
      </div>
    );
  }
}
