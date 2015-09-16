import MainLayout from '../../layouts/MainLayout';
import React from 'react/addons';
import ReactMixin from 'react-mixin';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Auth from '../../../services/AuthService'
import BaseComponent from '../../BaseComponent';
import './Login.css';

export default class LoginPage extends BaseComponent {
    constructor() {
        super();
        this._bind('_login');
    }

    _login(e) {
        e.preventDefault();

        Auth.login(this.refs["email"].state.value, this.refs["password"].state.value)
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
                        <Input type="email" ref="email" placeholder="Email" label="Email" id="user_email" />
                        <Input type="password"  ref="password" label="Password" id="user_password" />

                        <Button type="submit" text="Login" isInline={isInline} onClick={this._login} />
                    </form>
                </div>
            </MainLayout>
        );
    }
}

//LinkStateMixin -> provides 2-way databinding
ReactMixin(LoginPage.prototype, React.addons.LinkedStateMixin);
