import React from 'react';
import { Table, Tag } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import SubmissionTable from './Submission';

dayjs.extend(advancedFormat);

const Submissions = ({ submissions, updateParent }) => {
  const expandedRowRender = record => (
    <SubmissionTable id={record._id} updateParent={updateParent} />
  );

  const columns = [
    { title: 'Attempt #', dataIndex: 'attemptNumber', key: 'attemptNumber' },
    {
      title: 'Submission Date',
      dataIndex: 'submissionDate',
      render: text => dayjs(text).format('MMM Do, YYYY hh:mm')
    },
    {
      title: 'Grade',
      key: 'grade',
      render: r =>
        r.errorTesting ? (
          <Tag color="red">Error</Tag>
        ) : r.inProgress ? (
          <Tag color="blue">Testing</Tag>
        ) : (
          <Tag color="green">
            {r.results.reduce((acc, e) => acc + e.passed, 0)}/{r.results.length}
          </Tag>
        )
    }
  ];
  return (
    <Table
      columns={columns}
      dataSource={submissions}
      expandedRowRender={expandedRowRender}
      pagination={{ defaultPageSize: Infinity, hideOnSinglePage: true }}
      rowKey={record => record._id}
    />
  );
};

export default Submissions;
