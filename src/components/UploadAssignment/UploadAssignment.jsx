import React, { Component } from 'react';
import { Upload, Form, Button, Row, Icon, message } from 'antd';

import tyr from 'Utils/tyr';

const { Dragger } = Upload;

class UploadAssignment extends Component {
  formItemLayout = {
    labelCol: {
      xs: { span: 24 }
    },
    wrapperCol: {
      xs: { span: 24 }
    },
    labelAlign: 'left'
  };

  draggerProps = {
    name: 'supportingFiles',
    accept: '.gz',
    beforeUpload: () => {
      this.setState({ fileSelected: true });
      return false;
    },
    onRemove: () => {
      this.setState({ fileSelected: false });
    }
  };

  state = {
    fileSelected: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, updateParent, cid, aid } = this.props;
    form.validateFields(async (invalid, values) => {
      if (!invalid) {
        const formData = new FormData();
        formData.append('submission', values.submission.file);
        try {
          await tyr.post(
            `plague_doctor/course/${cid}/assignment/submit/${aid}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );
          await updateParent();
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('ERROR SUB UPLOAD:', err);
          message.error('An error occurred while uploading the submission!');
        }
      } else {
        message.error('Please upload a file before submitting!');
      }
    });
  };

  render() {
    const { handleSubmit, formItemLayout, draggerProps } = this;
    const { fileSelected } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form {...formItemLayout} hideRequiredMark onSubmit={handleSubmit}>
        <Form.Item label="Upload Submission">
          {getFieldDecorator('submission', {
            rules: [
              {
                required: true,
                message: 'Please upload a file to submit!'
              }
            ]
          })(
            <Dragger {...draggerProps} disabled={fileSelected}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload!
              </p>
              <p className="ant-upload-text">
                Compressed Tarball (tar.gz) Only!
              </p>
            </Dragger>
          )}
        </Form.Item>
        <Row type="flex" justify="center">
          <Button type="primary" icon="export" htmlType="submit">
            Upload Submission
          </Button>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(UploadAssignment);
