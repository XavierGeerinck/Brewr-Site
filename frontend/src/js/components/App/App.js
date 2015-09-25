import React, { PropTypes } from 'react';
import Router from 'react-router';
import Footer from '../elements/Footer';
import SideMenu from '../elements/SideMenu';
import AuthStore from '../../stores/AuthStore';
import AuthActions from '../../actions/AuthActions';
import './App.css';
var RouteHandler = Router.RouteHandler;

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Automatically login if possible
        if (!AuthStore.user && AuthStore.token) {
            AuthActions.getUser(AuthStore.token);
        }
    }

    render() {
        return (
            <div id="app" className="App-Container">
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
