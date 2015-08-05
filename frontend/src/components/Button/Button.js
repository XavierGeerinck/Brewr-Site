/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Button.css';

@withStyles(styles)
class Button {

  static propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    location: PropTypes.string,
    isBig: PropTypes.bool
  };

  static defaultProps = {
    text: "",
    color: "",
    location: undefined,
    isBig: false
  };

  render() {
    var classString = 'button';

    if (this.props.color) {
      classString += ' ' + this.props.color;
    }

    if (this.props.isBig) {
      classString += ' big';
    }

    return (
      <div className="Button">
      {this.props.location ?
          <a href={this.props.location} className={classString}>{this.props.text}</a> :
          <input type="submit" value={this.props.text} className={classString} />
        }
      </div>
    );
  }

}

export default Button;
