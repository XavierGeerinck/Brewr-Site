import React, { PropTypes } from 'react';
import Router from 'react-router';
import Footer from '../Footer';
import SideMenu from '../SideMenu';
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