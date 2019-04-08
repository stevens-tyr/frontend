import React from 'react';

import { Table, Divider, Button } from 'antd';
import dayjs from 'dayjs';
import './styles.scss';

const Assignments = ({ assignments }) => {
  let pastAssignments;
  let upcomingAssignments;

  // Should really be doing this in the backend, but we aint got no time
  if (assignments) {
    pastAssignments = assignments
      .filter(a => dayjs(a.dueDate).isBefore(dayjs()))
      .map(a => {
        const { name, dueDate, language } = a;
        return { name, dueDate, language };
      });
    upcomingAssignments = assignments
      .filter(a => dayjs(a.dueDate).isAfter(dayjs()))
      .reverse()
      .map(a => {
        const { name, dueDate, language } = a;
        return { name, dueDate, language };
      });
  }

  // reference: https://ant.design/components/table/
  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Due Date',
      key: 'dueDate',
      render: record => dayjs(record.dueDate).format('MMM Do YYYY')
    },
    {
      title: 'Required Language',
      dataIndex: 'language',
      key: 'language'
    },
    {
      title: 'Action(s)',
      key: 'action',
      // eslint-disable-next-line no-unused-vars
      render: (text, record) => (
        <span>
          <a href="/#">Edit</a>
          <Divider type="vertical" />
          <a href="/#">Delete</a>
        </span>
      )
    }
  ];

  return (
    <>
      <div className="flex-container">
        <div className="dash-label">Upcoming Assignments</div>
        <Button type="primary">New Assignment</Button>
      </div>
      <Table columns={tableColumns} dataSource={upcomingAssignments} />

      <div className="dash-label">Past Assignments</div>
      <Table columns={tableColumns} dataSource={pastAssignments} />
    </>
  );
};

export default Assignments;
