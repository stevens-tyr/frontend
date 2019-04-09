import React from 'react';

import { Table, Divider } from 'antd';

const Students = ({ students, assistants }) => {
  let studentsData;
  let assistantsData;

  // Should really be doing this in the backend, but we aint got no time
  if (students) {
    studentsData = students.map(s => {
      const { firstName, lastName, email } = s;
      return { name: `${firstName} ${lastName}`, email };
    });
  }
  if (assistants) {
    assistantsData = assistants.map(a => {
      const { firstName, lastName, email } = a;
      return { name: `${firstName} ${lastName}`, email };
    });
  }

  // reference: https://ant.design/components/table/
  const tableColumns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email'
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
      <div className="dash-label">Course Assistants</div>
      <Table columns={tableColumns} dataSource={assistantsData} />

      <div className="dash-label">Enrolled Students</div>
      <Table columns={tableColumns} dataSource={studentsData} />
    </>
  );
};

export default Students;
