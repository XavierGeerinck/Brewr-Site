import React, { PropTypes } from 'react';
import styles from './Input.css';

class Input {

  static propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    text: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string
  };

  static defaultProps = {
    type: "text"
  };

  render() {
    let children = this.renderChildren();
    return this.renderFormGroup(children);
  }

  renderFormGroup(children) {
    return (
       <div className="Input">{children}</div>
    );
  }

  renderChildren() {
    return [
      this.renderLabel(),
      this.renderInput()
    ];
  }

  renderInput() {
    return (
      <input type={this.props.type} placeholder={this.props.placeholder} value={this.props.text} name={this.props.id} key="input"/>
    )
  }

  renderLabel() {
    return this.props.label ? (
      <label htmlFor={this.props.id} key="label">
        {this.props.label}
      </label>
    ) : null;
  }
}

export default Input;
