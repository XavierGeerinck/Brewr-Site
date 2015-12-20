import React from 'react';
import AuthActions from '../../../actions/AuthActions';
import AuthStore from '../../../stores/AuthStore';

class LogoutPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this._getAuthState();

        // Logout, once we are logged out, the _onChange will be called and we can redirect
        AuthActions.logout(AuthStore.token);
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        AuthStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.changeListener);
    }

    _getAuthState() {
        return {
            isLoggedIn: AuthStore.isLoggedIn
        }
    }

    _onChange() {
        var self = this;

        // Change state, on callback redirect
        var newState = this._getAuthState();
        this.setState(newState, function () {
            // If logged in, redirect
            if (!newState.isLoggedIn) {
                self.props.history.replaceState(null, '/');
            }
        });
    }

    render() {
        return (<div></div>);
    }
}

export default LogoutPage;
