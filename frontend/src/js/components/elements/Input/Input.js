import React, { PropTypes } from 'react';
import './Input.css';

class Input extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            value: props.text
        };
    }

    handleChange (event) {
        this.setState({ value: event.target.value })

        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }

    render () {
      let children = this.renderChildren();
      return this.renderFormGroup(children);
    }

    renderFormGroup (children) {
        var cx = React.addons.classSet;

        var classes = cx({
            'Input': true,
            'Input-Inline': this.props.isInline
        });

      return (
         <div className={classes}>{children}</div>
      );
    }

    renderChildren () {
      return [
        this.renderLabel(),
        this.renderInput()
      ];
    }

    renderInput () {
      return (
        <input
            type={this.props.type}
            name={this.props.name}
            //valueLink={this.props.valueLink}
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.handleChange.bind(this)}
            key="input"/>
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

Input.defaultProps = {
    type: "text",
    isInline: false
}

Input.propTyps = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    text: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    isInline: PropTypes.bool,
    onChange: PropTypes.func
}

export default Input;
