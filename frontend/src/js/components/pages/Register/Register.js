/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import MainLayout from '../../layouts/MainLayout';

class RegisterPage extends React.Component {
  render() {
    var isInline = false;
    return (
      <MainLayout>
        <div className="LoginPage">
          <form>
            <Input type="email" placeholder="Email" label="Email*" id="user_email" />
            <Input type="password" label="Password*" id="user_password" />
            <Input type="password" label="Confirm Password*" id="user_password_confirm" />

            <Button text="Register" isInline={isInline} />
          </form>
        </div>
      </MainLayout>
    );
  }
}

RegisterPage.defaultProps = {

};

RegisterPage.propTypes = {

};

export default RegisterPage;
