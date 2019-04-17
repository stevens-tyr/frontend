import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Quill.scss';

// See: https://github.com/ant-design/ant-design/blob/master/components/form/demo/customized-form-controls.md
class Editor extends Component {
  constructor(props) {
    super(props);

    const value = props.value || '';
    this.state = { text: value };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || '')
      };
    }
    return null;
  }

  handleChange = text => {
    if (!('value' in this.props)) {
      this.setState({ text });
    }
    this.triggerChange({ text });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    return (
      <ReactQuill
        value={this.state.text}
        onChange={this.handleChange}
        placeholder="Write Description Here!"
      />
    );
  }
}

export default Editor;
