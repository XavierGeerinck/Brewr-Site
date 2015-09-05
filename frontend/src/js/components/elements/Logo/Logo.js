import React, { PropTypes } from 'react';
import './Logo.css';

class Logo extends React.Component {
  render() {
    return (
      <a className="Logo" href="/">
        <img className="Logo-img" src="images/logo.png" width="38" height="38" alt="Logo" />
        <span className="Logo-txt">{this.props.name}</span>
      </a>
    );
  }

}

Logo.defaultProps = {
  name: "Brewr"
};

Logo.propTypes = {
  name: PropTypes.string
};

export default Logo;
