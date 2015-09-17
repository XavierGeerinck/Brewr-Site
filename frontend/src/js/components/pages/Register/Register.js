import React, { PropTypes } from 'react';
import MainLayout from '../../layouts/MainLayout';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import ValidateInput from '../../elements/ValidateInput/ValidateInput.js';
import BaseComponent from '../../BaseComponent';
import AuthActions from '../../../actions/AuthActions';
import AuthStore from '../../../stores/AuthStore';
import Validator from '../../../validators/Validator.js';
import LengthConstraint from '../../../validators/constraints/LengthConstraint.js';
import EmailConstraint from '../../../validators/constraints/EmailConstraint.js';
import ConfirmConstraint from '../../../validators/constraints/ConfirmConstraint.js';
import './Register.css';

export default class RegisterPage extends BaseComponent {

    constructor() {
        super();

        this.validate = {
            form: "register_form",
            validations: {
                email: {
                    constraints: [
                        {test: new LengthConstraint(6), message: "Must be longer than 6 characters"},
                        {test: new EmailConstraint, message: "E-mail must be a valid email adress"}
                    ]
                },
                password: {
                    constraints: [
                        {test: new LengthConstraint(6), message: "Password should be at least 6 characters long"}
                    ]
                },
                password_confirm: {
                    constraints: [
                        {test: new LengthConstraint(6), message: "Confirm Password should be at least 6 characters long"},
                        // {test: new ConfirmConstraint(this.state.password), message: "Passwords must match"}
                    ]
                }
            }
        };

        // bind the method to a component instance
        this._bind('register');
    };

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        AuthStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.changeListener);
    }

    _onChange() {
        this.setState(this._getAuthState());
    }

    register(e) {
        e.preventDefault();

        var self = this;

        //TODO:  Find a way that registerUser is not executed until after validation!
        // var valid = Validator.validate(
        //     self,
        //      RegisterService.registerUser(
        //       self.refs["email"].state.value,
        //       self.refs["password"].state.value
        //     )
        // );

        AuthActions.register(this.refs.email.state.value, this.refs.password.state.value);
    }

    render() {
        var isInline = false;
        return (
            <MainLayout>
                <div className="RegisterPage">
                    <form ref="register_form">
                        <ValidateInput type="email" ref="email" name="email" placeholder="youremail@example.com" label="Email*" id="user_email" />
                        <ValidateInput type="password" ref="password" name="password" placeholder="password" label="Password*" id="user_password" />
                        <ValidateInput type="password" ref="password_confirm" name="password_confirm" placeholder="Confirm password" label="Confirm Password*" id="user_password_confirm" />

                        <Button text="Register" isInline={isInline} onClick={this.register} />
                    </form>
                </div>
            </MainLayout>
        );
    }
}
