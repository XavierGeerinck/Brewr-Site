/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React from 'react/addons';
import ReactMixin from 'react-mixin';
import SideMenu from '../SideMenu';
import Button from '../Button';
import Input from '../Input';
import MainLayout from '../MainLayout';
import Auth from '../../services/AuthService'

export default class LoginPage extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  login(e) {
    e.preventDefault();

    Auth.login(this.state.email, this.state.password)
      .catch(function(err){
          console.log(err);
          alert("error logging in");
          console.log("Error logging in");
        })
  }

  render() {
    var isInline = false;
    return (
      <MainLayout>
        <div className="LoginPage">
          <form role="form">
            <Input type="email" valueLink={this.linkState('email')} placeholder="Email" label="Email" id="user_email" />
            <Input type="password" valueLink={this.linkState('password')} label="Password" id="user_password" />

            <Button type="submit" text="Login" isInline={isInline} onClick={this.login.bind(this)} />
          </form>
        </div>
      </MainLayout>
    );
  }
}

//LinkStateMixin -> provides 2-way databinding
ReactMixin(LoginPage.prototype, React.addons.LinkedStateMixin);