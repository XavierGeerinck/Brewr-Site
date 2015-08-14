/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../SideMenu';
import Button from '../Button';
import Input from '../Input';
import MainLayout from '../MainLayout';

class LoginPage extends React.Component {
  render() {
    return (
      <MainLayout>
        <form>
          <Input type="email" placeholder="Email" label="Email" id="user_email" />
          <Input type="password" label="Password" id="user_password" />

          <Button text="Login" />
        </form>
      </MainLayout>
    );
  }
}

LoginPage.defaultProps = {

};

LoginPage.propTypes = {

};

export default LoginPage;
