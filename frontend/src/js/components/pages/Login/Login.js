import MainLayout from '../../layouts/MainLayout';
import React from 'react/addons';
import ReactMixin from 'react-mixin';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import AuthActions from '../../../actions/AuthActions';
import AuthStore from '../../../stores/AuthStore';
import BaseComponent from '../../BaseComponent';
import './Login.css';

export default class LoginPage extends React.Component {
    constructor() {
        super();
    }

    login(e) {
        e.preventDefault();
        AuthActions.login(this.refs.email.state.value, this.refs.password.value);
    }

    render() {
        var isInline = false;
        return (
            <MainLayout>
                <div className="LoginPage">
                    <form role="form">
                        <Input type="email" ref="email" placeholder="Email" label="Email" id="user_email" />
                        <Input type="password"  ref="password" label="Password" id="user_password" />

                        <Button type="submit" text="Login" isInline={isInline} onClick={this.login.bind(this)} />
                    </form>
                </div>
            </MainLayout>
        );
    }
}

//LinkStateMixin -> provides 2-way databinding
ReactMixin(LoginPage.prototype, React.addons.LinkedStateMixin);
