import React, { Component } from 'react';
import { Table, Button, Icon, Modal, Checkbox, message } from 'antd';
import { withRouter } from 'react-router';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import LanguageTag from 'Components/LanguageTag/LanguageTag';
import tyr from 'Utils/tyr';
import Form from './AssignmentForm';
import Assignment from './Assignment/Assignment';
import './Assignments.scss';

const { confirm } = Modal;
const { Group } = Button;
dayjs.extend(advancedFormat);

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
  tableColumns =
    this.props.role === 'teacher'
      ? [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '250px'
          },
          {
            title: 'Published',
            key: 'published',
            render: (_, record) => (
              <Checkbox
                checked={record.published}
                onClick={async () =>
                  this.togglePubAssignment(record._id, !record.published)
                }
              />
            )
          },
          {
            title: 'Due Date',
            key: 'dueDate',
            render: (_, record) => dayjs(record.dueDate).format('MMM Do, YYYY')
          },
          {
            title: 'Required Language',
            key: 'language',
            render: (_, record) => <LanguageTag language={record.language} />
          },
          {
            title: 'Action(s)',
            key: 'action',
            render: (_, record) => (
              <Group>
                <Button
                  onClick={() => this.openAssignmentModal(record, 'assignment')}
                >
                  View
                </Button>
                <Button
                  onClick={() => this.openAssignmentModal(record, 'edit')}
                >
                  Edit
                </Button>
                <Button onClick={() => this.showConfirm(record)}>Delete</Button>
              </Group>
            )
          }
        ]
      : [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '250px'
          },
          {
            title: 'Due Date',
            key: 'dueDate',
            render: (_, record) => dayjs(record.dueDate).format('MMM Do, YYYY')
          },
          {
            title: 'Required Language',
            key: 'language',
            render: (_, record) => <LanguageTag language={record.language} />
          },
          {
            title: 'Action(s)',
            key: 'action',
            render: (_, record) => (
              <Group>
                <Button
                  onClick={() => this.openAssignmentModal(record, 'assignment')}
                >
                  View
                </Button>
              </Group>
            )
          }
        ];

  state = {
    modalVisible: {
      new: false,
      edit: false,
      assignment: false
    },
    currentAssignment: null
  };

  componentDidMount() {
    const { assignments } = this.props;
    // TODO: Offload intermediate data processing to backend
    const { pastAssignments, upcomingAssignments } = splitAssignments(
      assignments
    );
    this.setState({ pastAssignments, upcomingAssignments });
  }

  toggleModal = type => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: { ...modalVisible, [type]: !modalVisible[type] }
    });
  };

  togglePubAssignment = async (aid, toggle) => {
    const { match, updateParent } = this.props;
    const { cid } = match.params;

    const verb = toggle ? 'Published' : 'Hidden';
    try {
      const formData = new FormData();
      formData.append('published', toggle);
      await tyr.patch(
        `plague_doctor/course/${cid}/assignment/${aid}/update`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      message.success(`Assignment ${verb} Successfully.`);
      await updateParent();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('TOGGLE ASSIGNMENT ERROR:', err);
      message.error(
        `An error occurred, assignment could not be ${verb.toLowerCase()}.`
      );
    }
  };

  openAssignmentModal = (currentAssignment, type) => {
    this.setState({ currentAssignment });
    this.toggleModal(type);
  };

  showConfirm = record => {
    const { match, updateParent } = this.props;
    const { cid } = match.params;
    confirm({
      title: 'Are you sure delete this assignment?',
      content: 'This cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Go Back',
      onOk: async () => {
        try {
          await tyr.delete(
            `plague_doctor/course/${cid}/assignment/${record._id}/delete`
          );
          await updateParent();
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('DELETE ASSIGNMENT ERROR:', err);
          message.error('An error occurred while deleting the assignment!');
        }
      }
    });
  };

  updateAssignment = async formData => {
    const { match, updateParent } = this.props;
    const { cid } = match.params;
    const {
      currentAssignment: { _id: aid }
    } = this.state;

    try {
      await tyr.patch(
        `plague_doctor/course/${cid}/assignment/${aid}/update`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      message.success('Assignment Updated Successfully.');
      this.toggleModal('edit');
      await updateParent();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('UPDATE ASSIGNMENT ERROR:', err);
      message.error('An error occurred while updating the assignment!');
    }
  };

  createAssignment = async formData => {
    const { match, updateParent } = this.props;
    const { cid } = match.params;

    try {
      await tyr.post(
        `plague_doctor/course/${cid}/assignment/create`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      message.success('Assignment Created Successfully.');
      this.toggleModal('new');
      await updateParent();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('CREATE ASSIGNMENT ERROR:', err);
      message.error('An error occurred while creating the assignment!');
    }
  };

  render() {
    const {
      modalVisible,
      pastAssignments,
      upcomingAssignments,
      currentAssignment
    } = this.state;
    const {
      toggleModal,
      tableColumns,
      createAssignment,
      updateAssignment
    } = this;
    return (
      <>
        <div className="flex-container">
          <div className="dash-label">Upcoming Assignments</div>
          <Button type="primary" onClick={() => toggleModal('new')}>
            <Icon type="plus" /> New Assignment
          </Button>
        </div>
        <Table
          columns={tableColumns}
          dataSource={upcomingAssignments}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
        <div className="dash-label">Past Assignments</div>
        <Table
          columns={tableColumns}
          dataSource={pastAssignments}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
        <Modal
          title="New Assignment"
          visible={modalVisible.new}
          footer={null}
          width={800}
          destroyOnClose
          onCancel={() => {
            // eslint-disable-next-line no-alert
            const result = window.confirm(
              'Are you sure you want to close? (Changes will not be saved)'
            );
            if (result) toggleModal('new');
          }}
        >
          <Form onSubmit={createAssignment} />
        </Modal>
        <Modal
          title="View Assignment"
          visible={modalVisible.assignment}
          footer={null}
          onCancel={() => toggleModal('assignment')}
          width={800}
          destroyOnClose
        >
          <Assignment assignment={currentAssignment} />
        </Modal>
        <Modal
          title="Edit Assignment"
          visible={modalVisible.edit}
          footer={null}
          width={800}
          destroyOnClose
          onCancel={() => {
            // eslint-disable-next-line no-alert
            const result = window.confirm(
              'Are you sure you want to close? (Changes will not be saved)'
            );
            if (result) toggleModal('edit');
          }}
        >
          <Form updateData={currentAssignment} onSubmit={updateAssignment} />
        </Modal>
      </>
    );
  }
}

export default withRouter(Assignments);
