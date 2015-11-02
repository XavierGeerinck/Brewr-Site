import MainLayout from '../../layouts/MainLayout';
import React from 'react';
import ReactMixin from 'react-mixin';
import History from 'history';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import AuthActions from '../../../actions/AuthActions';
import AuthStore from '../../../stores/AuthStore';
import BaseComponent from '../../BaseComponent';
import styles from './Login.scss';
import cx from 'classnames';
import purecss from 'purecss/build/pure.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    _getAuthState() {
        return {
            isLoggedIn: AuthStore.token != ''
        }
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        AuthStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.changeListener);
    }

    _onChange() {
        // Change state
        var newState = this._getAuthState();
        this.setState(newState);

        // If logged in, redirect
        if (newState.isLoggedIn) {
            // If we got old state, go to that path
            if (this.props.location.state) {
                this.props.history.pushState(null, this.props.location.state.nextPathname);
            } else {
                this.props.history.pushState(null, '/');
            }
        }
    }

    login(e) {
        e.preventDefault();
        AuthActions.login(this.refs.email.state.value, this.refs.password.state.value);
    }

    render() {
        var isInline = false;
        return (
            <MainLayout>
                <div className="LoginPage">
                    <form className={cx(purecss['pure-form'], purecss['pure-form-stacked'])} role="form">
                        <Input type="email" ref="email" placeholder="Email" label="Email" id="user_email" />
                        <Input type="password"  ref="password" label="Password" id="user_password" />

                        <Button type="submit" text="Login" isInline={isInline} onClick={this.login.bind(this)} />
                    </form>
                </div>
            </MainLayout>
        );
    }
}

export default LoginPage;
