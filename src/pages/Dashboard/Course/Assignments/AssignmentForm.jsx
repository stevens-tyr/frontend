/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  Upload,
  Row,
  Col,
  Form,
  message,
  Input,
  Button,
  Icon,
  DatePicker,
  Select,
  InputNumber
} from 'antd';
import Quill from 'Components/Quill/Quill';
import Ace from 'Components/Ace/Ace';

const { Dragger } = Upload;
const { Option } = Select;

// Simple Counter for generating different test IDs
let id = 0;

class CustomForm extends Component {
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
    multiple: true,
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  addTestCase = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat((id += 1));
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  removeTestCase = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields(async (err, values) => {
      console.log(values);
      if (!err) {
        console.log('Form has received values of form: ', values);
        try {
          // await onSubmit(values);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  renderTestCases = () => {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    return keys.map((k, index) => (
      <Form.Item label={`Test Case ${index + 1}`} required={false} key={k}>
        {getFieldDecorator(`testCases[${index}]`, {
          rules: [{ required: true, message: 'Please enter a test case!' }]
        })(
          <Ace
            name={`testCase-${index}`}
            height="50px"
            width="90%"
            style={{ display: 'inline-block' }}
          />
        )}
        <Icon
          type="close-square"
          theme="twoTone"
          twoToneColor="#ef2d56"
          style={{
            fontSize: '32px'
          }}
          onClick={() => this.removeTestCase(k)}
        />
      </Form.Item>
    ));
  };

  render() {
    const { handleSubmit, formItemLayout, draggerProps, dummyUpload } = this;
    const { title, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <>
        {title && <h1>{title}</h1>}
        <Form {...formItemLayout} hideRequiredMark onSubmit={handleSubmit}>
          <Form.Item label="Assignment Name">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please enter an assignment name!'
                }
              ]
            })(<Input placeholder="Assignment Name" />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator('description', {
              rules: [
                { required: true, message: 'Please enter a description!' }
              ]
            })(<Quill placeholder="Type a Description Here!" />)}
          </Form.Item>
          <Form.Item label="Language">
            {getFieldDecorator('language', {
              rules: [{ required: true, message: 'Please choose a language!' }]
            })(
              <Select placeholder="Pick a Programming Language">
                <Option value="python">Python</Option>
                <Option value="java">Java</Option>
                <Option value="c">C</Option>
                <Option value="c++">C++</Option>
              </Select>
            )}
          </Form.Item>
          <Row>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Due Date">
                {getFieldDecorator('dueDate', {
                  rules: [
                    { required: true, message: 'Please select a due date!' }
                  ]
                })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Maximum Allowed Submissions">
                {getFieldDecorator('numAttempts', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select a number of attempts!'
                    }
                  ]
                })(<InputNumber min={1} max={Infinity} placeholder="5" />)}
                <span className="ant-form-text"> submissions</span>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Supporting File(s)">
            {getFieldDecorator('supportingFiles')(
              <Dragger {...draggerProps} customRequest={dummyUpload}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </Dragger>
            )}
          </Form.Item>
          <Form.Item label="Build Command">
            {getFieldDecorator('buildCMD')(
              <Ace
                defaultStr={
                  '# Shell Commands to initialize each assignment\n# Use for Makefiles, installing dependencies, etc\n'
                }
                name="buildCMD"
                width="100%"
                height="200px"
              />
            )}
          </Form.Item>
          {this.renderTestCases()}
          <Form.Item>
            <Button
              type="dashed"
              onClick={this.addTestCase}
              style={{ width: '100%' }}
            >
              <Icon type="plus" /> Add Test Case
            </Button>
          </Form.Item>
          <Row type="flex" justify="center">
            <Button type="primary" icon="export" htmlType="submit">
              Create Assignment
            </Button>
          </Row>
        </Form>
      </>
    );
  }
}

export default Form.create()(CustomForm);
