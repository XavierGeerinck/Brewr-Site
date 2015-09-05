import React, { PropTypes } from 'react';
import HeaderSmall from '../../elements/HeaderSmall';
import Footer from '../../elements/Footer';
import './MainLayout.css';

class MainLayout extends React.Component {
  render() {
    return (
      <div className="MainLayout">
        <HeaderSmall />

        <div className="MainLayout-Content">
          {this.props.children}
        </div>

        <Footer />
      </div>
    );
  }
}

MainLayout.defaultProps = {

};

MainLayout.propTypes = {

};

export default MainLayout;
