import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Table, Modal } from 'antd';

class PastAssignmentsTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { ...props, modalVisible: false };
  }

  toggleModal = () => {
    const { modalVisible } = this.state;
    this.setState({ modalVisible: !modalVisible });
  };

  render() {
    const { tableColumns, pastAssignments, rowKey } = this.props;
    const { modalVisible } = this.state;
    const { toggleModal } = this;
    return (
      <>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Table
          columns={tableColumns}
          dataSource={pastAssignments}
          rowKey={rowKey}
          onRow={record => ({
            onClick: () => {
              console.log(record);
              console.log('pastAssignments', pastAssignments);
              toggleModal();
            }
          })}
        />
        <Modal visible={modalVisible} footer={null} onCancel={toggleModal}>
          Hullo you is the suck
        </Modal>
      </>
    );
  }
}

export default withRouter(PastAssignmentsTable);
