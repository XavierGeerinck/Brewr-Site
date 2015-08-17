import React, { PropTypes } from 'react';
import Router from 'react-router';
import Footer from '../elements/Footer';
import SideMenu from '../elements/SideMenu';
var RouteHandler = Router.RouteHandler;

class App extends React.Component {
  render() {
    return (
      <div id="app" className="App-Container">
        <RouteHandler />
      </div>
    );
  }
}

App.defaultProps = {

};

App.propTypes = {

};

export default App;
