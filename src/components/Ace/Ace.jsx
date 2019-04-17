import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

import 'brace/mode/sh';
import 'brace/theme/tomorrow';

class CodeEditor extends Component {
  constructor(props) {
    super(props);

    const value = props.value || props.defaultStr || '';
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
      <AceEditor
        {...this.props}
        mode="sh"
        theme="tomorrow"
        onChange={this.handleChange}
        value={this.state.text}
        editorProps={{ $blockScrolling: true }}
        setOptions={{ showInvisibles: true }}
        style={{
          border: '1px solid #d9d9d9',
          borderRadius: '4px',
          ...this.props.style
        }}
      />
    );
  }
}

CodeEditor.propTypes = {
  name: PropTypes.string.isRequired
};

export default CodeEditor;
