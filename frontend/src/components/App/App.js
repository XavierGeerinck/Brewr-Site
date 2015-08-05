/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import HeaderSmall from '../HeaderSmall';
import Feedback from '../Feedback';
import Footer from '../Footer';
import { Grid, Row, Col } from 'react-bootstrap';

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
        <HeaderSmall />
        {this.props.children}
        <Grid fluid={true}>
          <Row>
            <Col xs={12} md={8}>SubMenu</Col>
            <Col xs={6} md={4}>Content</Col>
          </Row>
        </Grid>
        <Feedback />
        <Footer />
      </div>
    ) : this.props.children;
  }

}

export default App;
