import React, { Component } from 'react';
import { Table, Divider, Button, Icon, Modal } from 'antd';
import { withRouter } from 'react-router';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import Form from 'Components/Form/Form';
import tyr from 'Utils/tyr';
import { assignmentForm } from './formTemplate';
import './Assignments.scss';

dayjs.extend(advancedFormat);

/* eslint-disable no-console */

const sortAssignments = (a, b, asc = true) => {
  const timeA = dayjs(a.dueDate);
  const timeB = dayjs(b.dueDate);
  if (timeA.isSame(timeB)) return 0;
  return timeA[asc ? 'isBefore' : 'isAfter'](timeB) ? 1 : -1;
};

const splitAssignments = assignments => {
  if (assignments.length === 0) {
    return null;
  }

  const pastAssignments = [];
  const upcomingAssignments = [];
  assignments.sort((a, b) => sortAssignments(a, b, false));
  assignments.forEach(a => {
    const dueDate = dayjs(a.dueDate);
    // this assignment is a past assignment
    if (dueDate.isBefore(dayjs())) {
      pastAssignments.push(a);
    } else {
      upcomingAssignments.push(a);
    }
  });
  return { upcomingAssignments, pastAssignments };
};

class Assignments extends Component {
  // reference: https://ant.design/components/table/
  tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Due Date',
      key: 'dueDate',
      render: record => dayjs(record.dueDate).format('MMM Do, YYYY')
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

  state = {
    modalVisible: false
  };

  componentDidMount() {
    const { assignments } = this.props;
    // TODO: Offload intermediate data processing to backend
    const { pastAssignments, upcomingAssignments } = splitAssignments(
      assignments
    );
    this.setState({ pastAssignments, upcomingAssignments });
  }

  toggleModal = () => {
    const { modalVisible } = this.state;
    this.setState({ modalVisible: !modalVisible });
  };

  submitForm = async values => {
    const { match } = this.props;
    const { cid } = match.params;
    const body = {
      ...values,
      dueDate: values.dueDate.valueOf(),
      tests: ['./thing'],
      supportingFiles: values.supportingFiles
        ? values.supportingFiles.file
        : null,
      version: '3.7'
    };
    console.log('Body:', body);
    const res = await tyr.post(
      `plague_doctor/course/${cid}/assignment/create`,
      body,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (res.status === 200) {
      console.log('success in submitForm');
    } else {
      console.log('dang:', res.status, res.statusText);
    }
    this.toggleModal();
  };

  render() {
    const { modalVisible, pastAssignments, upcomingAssignments } = this.state;
    const { toggleModal, tableColumns, submitForm } = this;
    return (
      <>
        <div className="flex-container">
          <div className="dash-label">Upcoming Assignments</div>
          <Button type="primary" onClick={toggleModal}>
            <Icon type="plus" /> New Assignment
          </Button>
        </div>
        <Table
          columns={tableColumns}
          dataSource={upcomingAssignments}
          rowKey="_id"
        />
        <div className="dash-label">Past Assignments</div>
        <Table
          columns={tableColumns}
          dataSource={pastAssignments}
          rowKey="_id"
        />
        <Modal
          title="New Assignment"
          visible={modalVisible}
          footer={null}
          onCancel={toggleModal}
        >
          <Form fields={assignmentForm} onSubmit={() => submitForm()} />
        </Modal>
      </>
    );
  }
}

export default withRouter(Assignments);
