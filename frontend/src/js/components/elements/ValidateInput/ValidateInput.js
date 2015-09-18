/**
 * Created by Maxim on 27/08/2015.
 */
import React, { PropTypes } from 'react';
import Input from '../Input/Input.js';


export default class ValidateInput extends Input {

    constructor(props) {
        super(props);

        this.state.error_messages = [];
    }

    renderFormGroup (children) {
        var cx = React.addons.classSet;


        var classes = cx({
            'Input': true,
            'Input-Inline': this.props.isInline
        });

        return (
            <div className={classes}>
                {children}
                {this.renderErrorMessages()}
            </div>
        );
    }

    /**
     * Renders the error messages
     * @returns {error messages}
     */
    renderErrorMessages() {
        var error_messages = this.state.error_messages;

        if(error_messages) {
            return (
                <ul className="validation-errors">
                    {error_messages.map((message) => {
                        return <li key={message.id}>{message.text}</li>;
                    })}
                </ul>
            )
        }
    }

    /**
     * Add an error message to the component
     * @param message
     */
    addErrorMessage(message) {
        this.state.error_messages.push({id: this.state.error_messages.length, text: message});
        this.forceUpdate();
    }

    /**
     * Remove all error messages from the component
     */
    removeErrorMessages() {
        this.state.error_messages = [];
        this.forceUpdate();
    }

}
