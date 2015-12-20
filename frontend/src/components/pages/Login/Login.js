import MainLayout from '../../layouts/MainLayout';
import React from 'react';
import ReactMixin from 'react-mixin';
import History from 'history';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import AuthActions from '../../../actions/AuthActions';
import AuthStore from '../../../stores/AuthStore';
import styles from './Login.scss';
import cx from 'classnames';
import purecss from 'purecss/build/pure.css';
import forms from 'newforms';

var SigninForm = forms.Form.extend({
    email: forms.EmailField(),
    password: forms.CharField({ widget: forms.PasswordInput })
});

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this._getAuthState();
    }

    _getAuthState() {
        return {
            isLoggedIn: AuthStore.isLoggedIn,
            token: AuthStore.token
        }
    }

    componentWillMount() {
        this._autoLogin(AuthStore.token, AuthStore.isLoggedIn);
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        AuthStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.changeListener);
    }

    _onChange() {
        var self = this;

        // Change state, on callback redirect
        var newState = this._getAuthState();
        this.setState(newState, function () {
            // If logged in, redirect
            if (newState.isLoggedIn) {
                if (this.props.location.state) {
                    // If we got old state, go to that path
                    self.props.history.replaceState(null, self.props.location.state.nextPathname);
                } else {
                    this.props.history.replaceState(null, '/dashboard');
                }
            }
        });
    }

    _autoLogin(token, isLoggedIn) {
        if (token && !isLoggedIn) {
            AuthActions.getUser(token);
        }
    }

    _onSubmit(e) {
        e.preventDefault();

        var form = this.refs.signinForm.getForm();
        AuthActions.login(form.data.email, form.data.password);
    }

    render() {
        var isInline = false;
        return (
            <MainLayout>
                <div className="LoginPage">
                    <form role="form" onSubmit={this._onSubmit.bind(this)}>
                        <forms.RenderForm form={SigninForm} ref="signinForm" />
                        <Button type="submit" text="Login" isInline={isInline} />
                    </form>
                </div>
            </MainLayout>
        );
    }
}

export default LoginPage;
