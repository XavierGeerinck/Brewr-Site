import styles from './Input.scss';
import purecss from 'purecss/build/pure.css';
import React, { PropTypes } from 'react';
import cx from 'classnames';

class Input extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            value: props.text
        };
    }

    handleChange (event) {
        if (this.props.type === 'file') {
            if (this.props.onChange) {
                this.props.onChange(event);
            }

            this.setState({ value: event });
        } else {
            if (this.props.onChange) {
                this.props.onChange(event.target.value);
            }

            this.setState({ value: event.target.value });
        }
    }

    render () {
        let children = this.renderChildren();
        return this.renderFormGroup(children);
    }

    renderFormGroup (children) {
        var classes = cx(
            'Input',
            this.props.isInline ? styles['Input-Inline'] : null
        );

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
        if (this.props.type === 'file') {
            return <input
            type={this.props.type}
            name={this.props.name}
            valueLink={this.props.valueLink}
            placeholder={this.props.placeholder}
            onChange={this.handleChange.bind(this)}
            key="input"/>
        } else {
            return <input
            type={this.props.type}
            name={this.props.name}
            valueLink={this.props.valueLink}
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.handleChange.bind(this)}
            key="input"
            className={purecss['pure-input-1']}/>
        }
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
