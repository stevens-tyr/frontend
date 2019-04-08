/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, InputNumber } from 'antd';

const { TextArea } = Input;
class CustomForm extends Component {
  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    },
    labelAlign: 'right'
  };

  state = {};

  handleSubmit = e => {
    console.log('submitting!');
    const { form } = this.props;
    e.preventDefault();
    // TODO: implement submission function
    form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { handleSubmit, formItemLayout } = this;
    const { title, fields, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <>
        <h1>{title}</h1>
        <Form {...formItemLayout} onSubmit={e => handleSubmit(e)}>
          {fields.map((input, i) => {
            let output;
            const fieldDecorator = getFieldDecorator(input.name);
            switch (input.type) {
              case 'date-time':
                output = fieldDecorator(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" key={i} />
                );
                break;
              case 'date':
                output = fieldDecorator(<DatePicker key={i} />);
                break;
              case 'editor':
                output = fieldDecorator(<TextArea />);
                break;
              case 'number':
                output = fieldDecorator(<InputNumber />);
                break;
              case 'file':
                // TODO: Implemented File Uploader
                output = fieldDecorator(<p>File uploader</p>);
                break;
              case 'text':
                output = fieldDecorator(<Input key={i} />);
                break;
              default:
                break;
            }
            return (
              <Form.Item>
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label htmlFor={input.name}>{input.label}:</label>
                <br />
                {output}
              </Form.Item>
            );
          })}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

export default Form.create()(CustomForm);
