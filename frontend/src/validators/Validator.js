/**
 * Created by Maxim on 18/08/2015.
 */
import React from 'react';


class Validator {

    constructor() {
        this.isValid = true;
        this.errors = [];
        this.component = null;
        this.validations = [];
        this.form = null;
    }

    /**
     * Invalidates the instance
     */
    invalidate() {
        this.isValid = false;
    }

    /**
     * Add an error to the instance
     * @param field, the input field on which the error is triggered
     * @param key, the reference key of the error
     * @param message, the error message
     */
    addError(field, key, message) {
        if(!Array.isArray(this.errors[key])) {
            this.errors[key] = [];
        }

        this.errors[key].push(message);

        // can assume that form is invalid
        this.invalidate();

        //TODO: Move to component
        // add class
        field.classList.add('validation-error');

        // add message
        this.component.refs[key].addErrorMessage(message);
    }

    /**
     * Removes an error from the field
     * @param field
     * @param key, the reference key of the error
     */
    removeErrors(field, key) {
        this.component.refs[key].removeErrorMessages();
        field.classList.remove('validation-error');
    }

    /**
     * Validates the backend part
     * @param backendCallback, the backend promise
     */
    validateBackend(backendCallback) {
        var self = this;

        backendCallback
            .catch(function(err){
                self.invalidate();

                var response = JSON.parse(err.response);

                if(response.error == "E_VALIDATION") {
                    //show invalid attributes
                    for(var key in response.invalidAttributes) {
                        var reference = self.component.refs[key];

                        var field = React.findDOMNode(reference).getElementsByTagName('input')[key];

                        // add the corresponding messages
                        response.invalidAttributes[key].forEach(object => {
                            self.addError(field, key, object.message);
                        });
                    }
                }


            });
    }

    /**
     * Validates the frontend
     */
    validateFrontend() {
        var self = this;

        for(var key in this.fields) {

            if(!this.fields.hasOwnProperty(key) || !this.fields[key].hasOwnProperty("constraints")) {
                break;
            }

            // find input field
            var reference = this.component.refs[key];
            var field = React.findDOMNode(reference).getElementsByTagName('input')[key];
            self.removeErrors(field, key);

            // apply constraints
            this.fields[key]["constraints"].forEach(constraint =>  {

                //named or anonymous function predefined or not
                if(constraint.test.toString() == null) {
                    !constraint.test(reference.state.value) ? self.addError(field, key, constraint.message) : null;
                } else {
                    !constraint.test.validate(reference.state.value) ? self.addError(field, key, constraint.message) : null;
                }

            });
        }
    }

    /**
     * Validate the form
     * @param component, the component that should be validated
     * @param backendCallback, the callback promise for the backend
     * @returns {*}, true or a list of errors (array)
     */
    validate(component, backendCallback) {

        // check if form is set
        if(!component.hasOwnProperty("validate")) {
            throw new Error("Validate must be defined");
        }

        this.component = component;

        var self = this;
        this.fields = this.component.validate.validations;
        this.form = this.component.validate.form; //form to validate

        this.errors = [];
        this.isValid = true;

        // Front-end validations
        this.validateFrontend();

        // Back-end validation, only when front-end is valid
        if(self.isValid) {
            this.validateBackend(backendCallback);
        }


        // return reject or resolved
        if(self.isValid) {
            return true;
        } else {
            return self.errors;
        }
    }
}

export default new Validator();