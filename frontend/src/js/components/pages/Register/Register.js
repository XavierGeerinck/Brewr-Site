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

export default class RegisterPage extends BaseComponent {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      password_confirm: ''
    };

    this.validations = {
      email: {
        ref: 'email',
        constraints: [
          {test: new LengthConstraint(6), message: "Must be longer than 6 characters"}
        ]
      },
      password: {
        ref: 'password',
        constraints: [
          {test: new LengthConstraint(6), message: "Password should be at least 6 characters long"}
        ]
      },
      password_confirm: {
        ref: 'password_confirm',
        constraints: [
          {test: new LengthConstraint(6), message: "Confirm Password should be at least 6 characters long"}
        ]
      }
    };

    // bind the method to a component instance
    this._bind('_onChange', '_register');
  };

  _onChange(e) {
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  _register(e) {
    e.preventDefault();

    var self = this;

    Validator.validate(self)
      .then(function(response){

          RegisterService.registerUser(self.state.email.value, self.state.password.value)
              .catch(function(err){
                console.log(err);
                var response = JSON.parse(err.response);
                //TODO: Show user that something went wrong
                // validation error
                if(response.error == "E_VALIDATION") {
                  //show invalid attributes
                  for(var key in response.invalidAttributes) {
                    React.findDOMNode(self.refs.email).style.border = "1px solid red";
                  }
                }
              });

      })
      .catch(function(errors){
        console.log(errors);
      });
  }

  render() {
    var isInline = false;
    return (
      <MainLayout>
        <div className="RegisterPage">
          <form>
            <Input type="email" ref="email" name="email" value={this.state.email} onChange={this._onChange} placeholder="youremail@example.com" label="Email*" id="user_email" />
            <Input type="password" ref="password" name="password" value={this.state.password} onChange={this._onChange} placeholder="password" label="Password*" id="user_password" />
            <Input type="password" ref="password_confirm" name="password_confirm" value={this.state.password_confirm} onChange={this._onChange} placeholder="Confirm password" label="Confirm Password*" id="user_password_confirm" />

            <Button text="Register" isInline={isInline} onClick={this._register} />
          </form>
        </div>
      </MainLayout>
    );
  }
}
