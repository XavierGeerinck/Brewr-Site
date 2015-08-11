import React, { PropTypes } from 'react';
import Router from 'react-router';
import Footer from '../Footer';
import SideMenu from '../SideMenu';
var RouteHandler = Router.RouteHandler;

export default React.createClass({
  propTypes: {
  },

  getDefaultProps() {
    return {
    }
  },

  render() {
    return (
      <div id="app" className="App-Container">
        <SideMenu />

        <div className="App-Content">
          <div className="App-Page-Title">
            <h1>PAGE TITLE</h1>
          </div>

          <div className="App-Page-Container">
            <div className="App-Page-Content">
              <RouteHandler />
            </div>
          </div>
        </div>
      </div>
    );
  }
});
