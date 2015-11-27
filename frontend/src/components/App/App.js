import React, { PropTypes } from 'react';
import Router from 'react-router';
import Footer from '../elements/Footer';
import SideMenu from '../elements/SideMenu';
import AuthStore from '../../stores/AuthStore';
import AuthActions from '../../actions/AuthActions';
import styles from './App.scss';
var RouteHandler = Router.RouteHandler;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = this._getAuthState();
    }

    _getAuthState() {
        return {
            user: AuthStore.user,
            isLoggedIn: AuthStore.isLoggedIn
        }
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        AuthStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.changeListener);
    }

    componentWillMount() {
        if (!AuthStore.user && AuthStore.token) {
            AuthActions.getUser(AuthStore.token);
        }
    }

    _onChange() {
        this.setState(this._getAuthState());
    }


    render() {
        return (
            <div id="app" className={styles.App}>
                {this.props.children}
            </div>
        );
    }
}

App.defaultProps = {

};

App.propTypes = {

};

export default App;
