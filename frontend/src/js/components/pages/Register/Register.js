/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import MainLayout from '../../layouts/MainLayout';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import BaseComponent from '../../BaseComponent';
import RegisterService from '../../../services/RegisterService';
import React from 'react';
import Validator from '../../../validators/Validator.js';
import LengthConstraint from '../../../validators/constraints/LengthConstraint.js';
import EmailConstraint from '../../../validators/constraints/EmailConstraint.js';
import ConfirmConstraint from '../../../validators/constraints/ConfirmConstraint.js';

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
    this._bind('_register');
  };

  _register(e) {
    e.preventDefault();

    var self = this;

    var email = self.refs["email"].state.value
      , password = self.refs["password"].state.value;

    //TODO:  Find a way that registerUser is not executed until after validation!
    var valid = Validator.validate(
        self,
         RegisterService.registerUser(
          self.refs["email"].state.value,
          self.refs["password"].state.value
        )
    );
    console.log(valid);
  }

  render() {
    var isInline = false;
    return (
      <MainLayout>
        <div className="RegisterPage">
          <form ref="register_form">
            <Input type="email" ref="email" name="email" placeholder="youremail@example.com" label="Email*" id="user_email" />
            <Input type="password" ref="password" name="password" placeholder="password" label="Password*" id="user_password" />
            <Input type="password" ref="password_confirm" name="password_confirm" placeholder="Confirm password" label="Confirm Password*" id="user_password_confirm" />

            <Button text="Register" isInline={isInline} onClick={this._register} />
          </form>
        </div>
      </MainLayout>
    );
  }
}
