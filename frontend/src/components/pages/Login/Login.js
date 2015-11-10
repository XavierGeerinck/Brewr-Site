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
