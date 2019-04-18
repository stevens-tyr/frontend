import React from 'react';
import { Table, Icon } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Roles } from 'Utils/vars';

dayjs.extend(advancedFormat);

const Submissions = ({ submissions, role }) => {
  const expandedRowRender = record => {
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

    // TODO: Add Teacher-facing test cases
    const data =
      role === Roles.student
        ? record.cases.studentFacing
        : record.cases.studentFacing;

    return (
      <Table
        columns={columns}
        dataSource={[data]}
        pagination={false}
        rowKey={(r, index) => index}
      />
    );
  };

  const columns = [
    { title: 'Attempt', dataIndex: 'attemptNumber', key: 'attemptNumber' },
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
