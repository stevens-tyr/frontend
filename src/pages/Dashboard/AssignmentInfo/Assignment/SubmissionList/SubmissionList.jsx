import React from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import SubmissionTable from './Submission';

dayjs.extend(advancedFormat);

const Submissions = ({ submissions }) => {
  const expandedRowRender = record => <SubmissionTable submissions={record} />;

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
      render: text => (text ? 'An error occurred while testing.' : 'None')
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
