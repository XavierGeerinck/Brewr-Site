/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './BuilderStep6Page.css';
import withStyles from '../../decorators/withStyles';
import SideMenu from '../SideMenu';
import Button from '../Button';
import Link from '../../utils/Link';

@withStyles(styles)
class BuilderStep6Page {

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
      <div className="BuilderStep6Page">
        {/* Add Volumes */}
        <section class="sub-content flex-container">
          <div class="flex-container">
            <div id="pick-settings" class="flex-item">
              <label for="input_cmd">Add Files</label>
              <input type="text" name="input_cmd" placeholder="Type a volume, format: <host>:<container>..." />
            </div>
          </div>
        </section>

        {/* Current Volumes */}
        <section class="sub-content flex-container">
          <div class="flex-container">
            <div id="pick-settings-filled" class="flex-item">
              <h2>Files</h2>

              <ul>
                <li>
                  /var/www:www
                  <a href="#" class="btn-square orange"><i class="fa fa-remove"></i></a>
                </li>
                <li>
                  /var/log:log
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

export default BuilderStep6Page;
