/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Icon, Table } from 'antd';
import sanitizeHtml from 'sanitize-html';
import './SubmissionTable.scss';

export default class SubmissionTable extends Component {
  testCaseSelectorColumns = [
    {
      title: 'Test Case #',
      dataIndex: 'idx',
      render: (text, record) => (
        <div style={{ cursor: 'pointer' }}>
          {record.result.name}
          {record.result.passed ? (
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
      )
    }
  ];

  testCaseSelectorData = (this.props.submissions.results || []).map(
    (r, idx) => ({
      idx,
      result: r
    })
  );

  state = {
    submissions: this.props.submissions,
    testNum: 0,
    currTestCase: (this.props.submissions.results || [])[0]
  };

  selectTestCase = testNum => {
    const { submissions } = this.state;
    this.setState({ testNum, currTestCase: submissions.results[testNum] });
  };

  render() {
    const { submissions, testNum, currTestCase } = this.state;
    const {
      selectTestCase,
      testCaseSelectorData,
      testCaseSelectorColumns
    } = this;
    return submissions.inProgress ? (
      'Currently grading...'
    ) : (
      <div className="submission-table">
        <Table
          className="cases-selector"
          dataSource={testCaseSelectorData}
          columns={testCaseSelectorColumns}
          pagination={{ defaultPageSize: Infinity, hideOnSinglePage: true }}
          showHeader={false}
          scroll={{ y: 500 }}
          // eslint-disable-next-line
          rowKey={r => r.result.id}
          onRow={(record, rowIndex) => ({
            onClick: () => selectTestCase(rowIndex)
          })}
        />
        <div className="case-viewer">
          <h1>{`Test Case ${testNum + 1}`}</h1>
          <div className="subheader">Test Case Status:</div>
          <div className="status">
            {currTestCase.passed ? 'Success' : 'Failure'}
          </div>
          <div className="subheader">
            Output Diff (Comparison between expected output and actual output):
          </div>
          <div className="diff">
            <code // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(currTestCase.html, {
                  allowedTags: ['span', 'del', 'ins'],
                  allowedAttributes: false
                })
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
