import styles from './Register.scss';
import React, { PropTypes } from 'react';
import MainLayout from '../../layouts/MainLayout';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import ValidateInput from '../../elements/ValidateInput/ValidateInput.js';
import BaseComponent from '../../BaseComponent';
import AuthActions from '../../../actions/AuthActions';
import AuthStore from '../../../stores/AuthStore';
import forms from 'newforms';

var SignupForm = forms.Form.extend({
    username: forms.CharField(),
    email: forms.EmailField(),
    password: forms.CharField({widget: forms.PasswordInput}),
    firstName: forms.CharField(),
    lastName: forms.CharField(),
    confirmPassword: forms.CharField({widget: forms.PasswordInput})
});

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        AuthStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.changeListener);
    }

    _getState() {
        return {
            token: AuthStore.token
        }
    }

    _onChange() {
        var state = this._getState();
        this.setState(state);

        if (state.token) {
            this.props.history.pushState(null, '/');
        }
    }

    _register(e) {
        e.preventDefault();

        var form = this.refs.registerForm.getForm();
        AuthActions.register(form.data.email, form.data.password, form.data.firstName, form.data.lastName);
    }

    render() {
        var isInline = false;
        return (
            <MainLayout>
                <div className="RegisterPage">
                    <form role="form" onSubmit={this._register.bind(this)}>
                        <forms.RenderForm form={SignupForm} ref="registerForm" />
                        <Button type="submit" text="Register" isInline={isInline} />
                    </form>
                </div>
            </MainLayout>
        );
    }
}

export default RegisterPage;
