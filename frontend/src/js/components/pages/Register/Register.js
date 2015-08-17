/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import SideMenu from '../SideMenu';
import Button from '../Button';
import Input from '../Input';
import MainLayout from '../MainLayout';
import BaseComponent from '../BaseComponent';
import RegisterService from '../../services/RegisterService';
import React from 'react';


export default class RegisterPage extends BaseComponent {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      password_confirm: ''
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

    RegisterService.registerUser(this.state.email, this.state.password)
        .catch(function(err){
          console.log(err);
          //TODO: Show user that something went wrong
        });
  }

  render() {
    var isInline = false;
    return (
      <MainLayout>
        <div className="LoginPage">
          <form>
            <Input type="email" name="email" value={this.state.email} onChange={this._onChange} placeholder="youremail@example.com" label="Email*" id="user_email" />
            <Input type="password" name="password" value={this.state.password} onChange={this._onChange} placeholder="password" label="Password*" id="user_password" />
            <Input type="password" name="password_confirm" value={this.state.password_confirm} onChange={this._onChange} placeholder="Confirm password" label="Confirm Password*" id="user_password_confirm" />

            <Button text="Register" isInline={isInline} onClick={this._register} />
          </form>
        </div>
      </MainLayout>
    );
  }
}
