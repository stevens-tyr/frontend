/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  Upload,
  Switch,
  Form,
  message,
  Input,
  Button,
  Icon,
  DatePicker,
  Select,
  InputNumber
} from 'antd';
import './styles.scss';

/* eslint-disable no-console */

const { Dragger } = Upload;
const { TextArea } = Input;
const { Option } = Select;
class CustomForm extends Component {
  formItemLayout = {
    labelCol: {
      xs: { span: 24 }
    },
    wrapperCol: {
      xs: { span: 24 }
    },
    labelAlign: 'right'
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

  /**
   * These are the types of fields that should have a label
   */
  dataFields = new Set([
    'text',
    'file',
    'number',
    'editor',
    'date',
    'date-time',
    'switch',
    'select'
  ]);

  state = {};

  /**
   * No-op function to be used in the upload component to
   * stop it from POSTing upon file upload
   *  */
  dummyUpload = () => {};

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Form has received values of form: ', values);
        try {
          await onSubmit(values);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // onUploadChange = info => {
  //   const reader = new FileReader();
  //   reader.onloadend = obj => {
  //     this.setState({ fileDataUrl: obj.srcElement.result });
  //   };
  //   reader.readAsDataURL(info.file.originFileObj);
  // };

  render() {
    const {
      dataFields,
      handleSubmit,
      formItemLayout,
      draggerProps,
      dummyUpload
    } = this;
    const { title, fields, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <>
        {title && <h1>{title}</h1>}
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          {fields.map((input, i) => {
            let output;
            if (input.name) {
              const fieldDecorator = getFieldDecorator(input.name);
              switch (input.type) {
                case 'date-time':
                  output = fieldDecorator(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                  );
                  break;
                case 'date':
                  output = fieldDecorator(<DatePicker />);
                  break;
                case 'editor':
                  output = fieldDecorator(
                    <TextArea placeholder={input.placeholder || ''} rows={6} />
                  );
                  break;
                case 'number':
                  output = fieldDecorator(
                    <InputNumber
                      min={input.min >= 0 ? input.min : Infinity}
                      max={input.max || Infinity}
                    />
                  );
                  break;
                case 'file':
                  output = fieldDecorator(
                    <Dragger {...draggerProps} customRequest={dummyUpload}>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit
                        from uploading company data or other band files
                      </p>
                    </Dragger>
                  );
                  break;
                case 'select':
                  output = getFieldDecorator(input.name, {
                    initialValue: input.options[0].value
                  })(
                    <Select>
                      {input.options.map((o, j) => (
                        <Option key={j} value={o.value}>
                          {o.name}
                        </Option>
                      ))}
                    </Select>
                  );
                  break;
                case 'text':
                  output = fieldDecorator(
                    <Input placeholder={input.placeholder || ''} />
                  );
                  break;
                case 'switch':
                  output = fieldDecorator(<Switch onChange={input.onChange} />);
                  break;
                default:
                  break;
              }
            } else {
              switch (input.type) {
                case 'header':
                  output = <h2 key={i}>{input.label}</h2>;
                  break;
                default:
                  break;
              }
            }

            return dataFields.has(input.type) ? (
              <Form.Item key={i}>
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label htmlFor={input.name} className="form-label">
                  {input.label}:
                </label>
                <br />
                {output}
              </Form.Item>
            ) : (
              output
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
