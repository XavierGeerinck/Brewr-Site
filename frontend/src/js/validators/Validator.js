/**
 * Created by Maxim on 18/08/2015.
 */
import React from 'react';


class Validator {

    constructor() {
        this.isValid = true;
        this.errors = [];
    }

    invalidate() {
        this.isValid = false;
    }

    addError(field, key, message) {
        if(!Array.isArray(this.errors[key])) {
            this.errors[key] = [];
        }

        this.errors[key].push(message);

        // can assume that form is invalid
        this.invalidate();

        // add class
        field.classList.add('validation-error');
    }

    removeErrors(field) {
        field.classList.remove('validation-error');
    }

    validate(component) {
        var self = this;
        var fields = component.validations;

        this.errors = [];
        this.isValid = true;

        for(var key in fields) {

            if(!fields[key].hasOwnProperty("constraints")) {
                break;
            }

            // find input field
            var field = React.findDOMNode(component.refs[key]).getElementsByTagName('input')[key];

            // apply constraints
            fields[key]["constraints"].forEach(constraint =>  {

                //named or anonymous function predefined or not
                if(constraint.test.toString() == null) {
                    !constraint.test(component.state[key]) ? self.addError(field, key, constraint.message) : self.removeErrors(field);
                } else {
                    !constraint.test.validate(component.state[key]) ? self.addError(field, key, constraint.message) : self.removeErrors(field);
                }

            });
        }

        return new Promise(function(resolve, reject){
            if(self.isValid) {
                resolve();
            } else {
                reject(self.errors);
            }
        })
    }


}

export default new Validator();