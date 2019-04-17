import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox } from 'antd';
import AceEditor from 'react-ace';

import 'brace/mode/plain_text';
import 'brace/theme/tomorrow';

import './TestCaseInput.scss';

class TestCaseInput extends Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      cmd: value.cmd || '',
      output: value.output || '',
      hidden: value.hidden || false
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || '')
      };
    }
    return null;
  }

  handleChange = ([key, value]) => {
    if (!('value' in this.props)) {
      this.setState({ [key]: value });
    }
    this.triggerChange({ [key]: value });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { cmdName, outputName, onRemove } = this.props;
    const { cmd, output, hidden } = this.state;
    return (
      <div className="testcase">
        <div className="header">Command:</div>
        <AceEditor
          mode="sh"
          theme="tomorrow"
          onChange={e => this.handleChange(['cmd', e])}
          value={cmd}
          name={cmdName}
          editorProps={{ $blockScrolling: true }}
          setOptions={{ showInvisibles: true }}
          className="cmd"
        />
        <div className="header">Expected Output:</div>
        <AceEditor
          mode="plain_text"
          theme="tomorrow"
          onChange={e => this.handleChange(['output', e])}
          value={output}
          name={outputName}
          editorProps={{ $blockScrolling: true }}
          setOptions={{ showInvisibles: true }}
          className="output"
        />
        <Button onClick={onRemove} icon="delete" type="danger">
          Delete Test Case
        </Button>
        <Checkbox
          checked={hidden}
          onChange={() => this.handleChange(['hidden', !hidden])}
        >
          Hidden Test Case
        </Checkbox>
      </div>
    );
  }
}

TestCaseInput.propTypes = {
  cmdName: PropTypes.string.isRequired,
  outputName: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default TestCaseInput;
