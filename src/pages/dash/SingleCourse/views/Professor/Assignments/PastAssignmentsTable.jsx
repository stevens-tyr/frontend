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
    let { uid } = record;
    uid = '5c55c6885da3fe5041f96be4';
    if (uid === null || uid === undefined) {
      return 'Assignment not found';
    }
    const { cid } = this.props;

    // TODO: how do i find assignment ID?
    // s = `plague_doctor/course/${cid}/assignment/${uid}/details`
    const res = await tyr.get(
      `plague_doctor/course/${cid}/assignment/${uid}/details`
    );
    console.log('res is', res);
    this.setState({ modalData: JSON.stringify(res) });
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
