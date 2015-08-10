/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './BuilderStep2Page.css';
import withStyles from '../../decorators/withStyles';
import SideMenu from '../SideMenu';
import Button from '../Button';
import Link from '../../utils/Link';

@withStyles(styles)
class BuilderStep2Page {

  static propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    this.context.onSetTitle(this.props.title);

    return (
      <div className="BuilderStep2Page">
        {/* Search docker */}
        <section className="sub-content flex-container">
          <div className="BuilderPage-FlexContainer">
            <div id="pick-settings" className="flex-item">
              <label htmlFor="input_maintainer">Maintainer</label>
              <input type="text" name="input_maintainer" placeholder="Type a keyword..." />

              <label htmlFor="input_workdir">Workdir</label>
              <input type="text" name="input_workdir" placeholder="Type a keyword..." />

              <label htmlFor="input_user">User</label>
              <input type="text" name="input_user" placeholder="Type a keyword..." />

              <label htmlFor="input_label">Label</label>
              <input type="text" name="input_label" placeholder="Type a keyword..." />
            </div>
          </div>
        </section>

  			{/* Next Button */}
        <Button text="Next >" color="Orange" onClick={Link.handleClick} />
        <div className="clear"></div>
      </div>
    );
  }
}

export default BuilderStep2Page;
