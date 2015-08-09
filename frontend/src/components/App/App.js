/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import HeaderSmall from '../HeaderSmall';
import Footer from '../Footer';

@withContext
@withStyles(styles)
class App {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  };

  render() {
    return !this.props.error ? (
      <div>
        <div className="app-container">
        {this.props.children}
        </div>
      </div>
    ) : this.props.children;
  }

}

export default App;
