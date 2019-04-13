import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Table, Modal } from 'antd';
import tyr from '../../../../../../utils/tyr';

class PastAssignmentsTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { modalVisible: false };
  }

  setModalData = async record => {
    const { uid } = record;
    if (uid === null || uid === undefined) {
      return 'Assignment not found';
    }
    const { cid } = this.props;

    // TODO: debug this get() so i can format stuff
    const res = await tyr.get(
      `plague_doctor/course/${cid}/assignment/${uid}/details`
    );
    console.log('res is', res);
    this.setState({ modalData: res });
    return res;
  };

  toggleModal = () => {
    const { modalVisible } = this.state;
    this.setState({ modalVisible: !modalVisible });
  };

  render() {
    const { tableColumns, pastAssignments, rowKey } = this.props;
    const { modalVisible, modalData } = this.state;
    /* eslint-disable no-unused-vars */
    const { toggleModal, setModalData } = this;
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
              setModalData(record);
            }
          })}
        />
        <Modal visible={modalVisible} footer={null} onCancel={toggleModal}>
          {modalData}
        </Modal>
      </>
    );
  }
}

export default withRouter(PastAssignmentsTable);
