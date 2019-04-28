/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Icon, Table, Spin, Alert } from 'antd';
import { withRouter } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

import tyr from 'Utils/tyr';
import './Submission.scss';

class SubmissionTable extends Component {
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

  state = {
    testNum: 0,
    currTestCase: null,
    fetched: false,
    submission: {}
  };

  async componentDidMount() {
    await this.fetchInfo();
  }

  componentWillUnmount() {
    this._mounted = false;
    if (this.timer) clearInterval(this.timer);
  }

  fetchInfo = async () => {
    const { cid, aid } = this.props.match.params;
    const { id } = this.props;
    this._mounted = true;
    try {
      const {
        data: { submission }
      } = await tyr.get(
        `plague_doctor/course/${cid}/assignment/${aid}/submission/${id}/details`
      );
      // Prevents state from being updated when component becomes unmounted
      // eslint-disable-next-line no-unused-expressions
      if (submission.inProgress) {
        if (!this.timer) this.timer = setInterval(this.fetchInfo, 2000);
      } else if (this.timer) clearInterval(this.timer);

      // eslint-disable-next-line no-unused-expressions
      this._mounted &&
        this.setState({
          submission,
          currTestCase: (submission.results || [])[0],
          fetched: true
        });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  selectTestCase = testNum => {
    const { submission } = this.state;
    this.setState({ testNum, currTestCase: submission.results[testNum] });
  };

  renderInProgress = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Spin size="large" tip="Grading in progress..." />
    </div>
  );

  renderError = () => (
    <Alert
      message="Error"
      description="An irrecoverable error occurred while testing the submission."
      type="error"
      showIcon
    />
  );

  renderTestCases() {
    const { submission, testNum, currTestCase, fetched } = this.state;
    const { selectTestCase, testCaseSelectorColumns } = this;
    if (!fetched) return null;
    return !submission.results.length ? (
      <h3 style={{ textAlign: 'center' }}>
        <Icon
          style={{ marginRight: '1rem' }}
          type="eye-invisible"
          theme="twoTone"
          twoToneColor="#f5222d"
        />No visible test cases!
      </h3>
    ) : (
      <div className="submission-table">
        <Table
          className="cases-selector"
          dataSource={(this.state.submission.results || []).map((r, idx) => ({
            idx,
            result: r
          }))}
          columns={testCaseSelectorColumns}
          pagination={{ defaultPageSize: Infinity, hideOnSinglePage: true }}
          showHeader={false}
          scroll={{ y: 500 }}
          rowKey={r => r.result.id}
          onRow={(record, rowIndex) => ({
            onClick: () => selectTestCase(rowIndex)
          })}
        />
        <div className="case-viewer">
          <h1>{`Test Case ${testNum + 1}`}</h1>
          <pre>{currTestCase.testCMD}</pre>
          <div className="subheader">Test Case Status:</div>
          <div className="status">
            {currTestCase.passed ? 'Success' : 'Failure'}
          </div>
          {currTestCase.panicked ? (
            <Alert
              message="Execution Error"
              description="This test case caused the program to crash with a non-zero exit code."
              type="warning"
              style={{ marginTop: '2rem' }}
              showIcon
            />
          ) : (
            <>
              <div className="subheader">
                Output Diff (Comparison between expected output and actual
                output):
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
            </>
          )}
        </div>
      </div>
    );
  }

  render() {
    const { submission } = this.state;

    return submission.inProgress
      ? this.renderInProgress()
      : submission.errorTesting
        ? this.renderError()
        : this.renderTestCases();
  }
}

export default withRouter(SubmissionTable);
