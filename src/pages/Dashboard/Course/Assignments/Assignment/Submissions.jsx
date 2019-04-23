import React from 'react';
import { Table, Icon } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const Submissions = ({ submissions }) => {
  const expandedRowRender = record => {
    if (record.inProgress) return 'Currently grading...';
    const columns = [
      {
        title: (
          <div>
            <Icon
              style={{ marginRight: 10 }}
              type="check-circle"
              theme="twoTone"
              twoToneColor="#52c41a"
            />
            Pass
          </div>
        ),
        dataIndex: 'pass',
        key: 'pass'
      },
      {
        title: (
          <div>
            <Icon
              style={{ marginRight: 10 }}
              type="close-circle"
              theme="twoTone"
              twoToneColor="#f5222d"
            />
            Fail
          </div>
        ),
        dataIndex: 'fail',
        key: 'fail'
      }
    ];

    const data = record.results.reduce(
      (acc, curr) =>
        curr.passed
          ? { pass: acc.pass++, ...acc }
          : { fail: acc.fail++, ...acc },
      { pass: 0, fail: 0 }
    );

    return (
      <>
        <Table
          columns={columns}
          dataSource={[data]}
          pagination={false}
          rowKey={(r, index) => index}
        />
        <code>{JSON.stringify(record, null, '  ')}</code>
      </>
    );
  };

  const columns = [
    { title: 'Attempt #', dataIndex: 'attemptNumber', key: 'attemptNumber' },
    {
      title: 'Submission Date',
      dataIndex: 'submissionDate',
      render: text => dayjs(text).format('MMM Do, YYYY hh:mm')
    },
    {
      title: 'Errors',
      dataIndex: 'errorTesting',
      render: text =>
        text
          ? 'An error occurred while testing. Please check your code.'
          : 'None'
    }
  ];
  return (
    <Table
      columns={columns}
      dataSource={submissions}
      expandedRowRender={expandedRowRender}
      rowKey={record => record._id}
    />
  );
};

export default Submissions;
