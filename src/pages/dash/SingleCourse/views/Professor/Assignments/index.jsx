import React from 'react';

import { Table, Divider, Button, Icon } from 'antd';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { splitAssignments } from './utils';
import './styles.scss';

const Assignments = ({ assignments, match }) => {
  // TODO: Offload intermediate data processing to backend
  const { pastAssignments, upcomingAssignments } = splitAssignments(
    assignments
  );

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

  /**
   * Builds a url for any path under /dashboard/course/:cid
   * @param {Any subpath under :cid} subpath
   */
  const buildPath = subpath => {
    const { cid } = match.params;
    return `/dashboard/course/${cid}/${subpath}`;
  };

  return (
    <>
      <div className="flex-container">
        <div className="dash-label">Upcoming Assignments</div>
        {/* TODO: This should open a model */}
        <Link to={buildPath('assignments/new')}>
          <Button type="primary">
            <Icon type="plus" /> New Assignment
          </Button>
        </Link>
      </div>
      <Table columns={tableColumns} dataSource={upcomingAssignments} />

      <div className="dash-label">Past Assignments</div>
      <Table columns={tableColumns} dataSource={pastAssignments} />
    </>
  );
};

export default withRouter(Assignments);
