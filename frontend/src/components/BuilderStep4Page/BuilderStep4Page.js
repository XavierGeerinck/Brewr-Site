/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './BuilderStep4Page.css';
import withStyles from '../../decorators/withStyles';
import SideMenu from '../SideMenu';
import Button from '../Button';
import Link from '../../utils/Link';

@withStyles(styles)
class BuilderStep4Page {

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
      <div className="BuilderStep4Page">
        {/* Add Expose */}
        <section class="sub-content flex-container">
          <div class="flex-container">
            <div id="pick-settings" class="flex-item">
              <label for="input_cmd">Add Expose Port</label>
              <input type="text" name="input_cmd" placeholder="Type a port in the format port_container:port_local..." />
            </div>
          </div>
        </section>

        {/* Current Expose */}
        <section class="sub-content flex-container">
          <div class="flex-container">
            <div id="pick-settings-filled" class="flex-item">
              <h2>Commands</h2>

              <ul>
                <li>
                  80 : 80
                  <a href="#" class="btn-square orange"><i class="fa fa-remove"></i></a>
                </li>
                <li>
                  3336 : 3336
                  <a href="#" class="btn-square orange"><i class="fa fa-remove"></i></a>
                </li>
                <li>
                  22 : 22
                  <a href="#" class="btn-square orange"><i class="fa fa-remove"></i></a>
                </li>
              </ul>
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

export default BuilderStep4Page;
