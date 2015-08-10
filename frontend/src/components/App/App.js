/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import HeaderSmall from '../HeaderSmall';
import Footer from '../Footer';
import SideMenu from '../SideMenu';

@withContext
@withStyles(styles)
class App {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  };

  render() {
    var title = this.props.children.props.title;

    return !this.props.error ? (
      <div className="App-Container">
        <SideMenu />

        <div className="App-Content">
          <div className="App-Page-Title">
            <h1>{title}</h1>
          </div>

          <div className="App-Page-Container">
            <div className="App-Page-Content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    ) : this.props.children;
  }
}

export default App;
