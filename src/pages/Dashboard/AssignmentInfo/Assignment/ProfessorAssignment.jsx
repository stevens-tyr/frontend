import React from 'react';
import { Table } from 'antd';
import { withRouter } from 'react-router';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import sanitizeHtml from 'sanitize-html';
import LanguageTag from 'Components/LanguageTag/LanguageTag';
import SubmissionList from './SubmissionList/SubmissionList';

import './Assignment.scss';

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

const nameSort = (a, b) => {
  const aLast = a.student.lastName.toLowerCase();
  const bLast = b.student.lastName.toLowerCase();
  if (aLast < bLast) return -1;
  if (aLast < bLast) return 1;
  return 0;
};

const Assignments = ({ assignment, updateParent }) => {
  const {
    name,
    description,
    dueDate,
    language,
    numAttempts,
    studentSubmissions,
    tests
  } = assignment;

  const columns = [
    {
      title: 'Last Name',
      dataIndex: 'student.lastName',
      key: 'lastname'
    },
    {
      title: 'First Name',
      dataIndex: 'student.firstName',
      key: 'firstname'
    },
    {
      title: 'Email',
      dataIndex: 'student.email',
      key: 'email'
    },
    {
      title: 'Attempts',
      key: 'attempts',
      render: r => `${r.submissions.length} out of ${numAttempts}`
    },
    {
      title: 'Highest Grade',
      key: 'high',
      render: r => {
        const high = r.submissions.reduce((max, sub) => {
          const currGrade = (sub.results || []).reduce(
            (acc, e) => acc + e.passed,
            0
          );
          return currGrade > max ? currGrade : max;
        }, 0);
        return high;
      }
    }
  ];
  const expandedRowRender = record => (
    <SubmissionList
      submissions={record.submissions}
      updateParent={updateParent}
      tests={tests}
    />
  );

  return (
    <div className="assignment">
      <div className="header">
        <h1>{name}</h1>
        <div className="dueDate">
          <h3>Due on: {dayjs(dueDate).format('MMM Do YYYY')}</h3>
          <p>{dayjs(dueDate).fromNow()}</p>
        </div>
      </div>
      <div className="subheader desc">
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(description, {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                'h1',
                'h2'
              ])
            })
          }}
        />
      </div>
      <div className="subheader">
        <h3>
          Language:
          <LanguageTag style={{ marginLeft: 15 }} language={language} />
        </h3>
      </div>
      <div className="subheader">
        <h3>Total Number of Attempts: {numAttempts}</h3>
      </div>
      <div className="subheader">
        <h3>Student Submissions</h3>
        <Table
          columns={columns}
          rowKey={r => r.student.email}
          expandedRowRender={expandedRowRender}
          dataSource={studentSubmissions.sort(nameSort)}
          pagination={{ defaultPageSize: Infinity, hideOnSinglePage: true }}
        />
      </div>
    </div>
  );
};

export default withRouter(Assignments);
