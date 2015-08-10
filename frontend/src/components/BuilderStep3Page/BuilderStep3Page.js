/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './BuilderStep3Page.css';
import withStyles from '../../decorators/withStyles';
import SideMenu from '../SideMenu';
import Button from '../Button';
import Link from '../../utils/Link';

@withStyles(styles)
class BuilderStep3Page {

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
      <div className="BuilderStep3Page">
        {/* Add Command */}
        <section class="sub-content flex-container">
          <div class="flex-container">
            <div id="pick-settings" class="flex-item">
              <label for="input_cmd">Add Command</label>
              <input type="text" name="input_cmd" placeholder="Type a command..." />
            </div>
          </div>
        </section>

        {/* Current Command */}
        <section class="sub-content flex-container">
          <div class="flex-container">
            <div class="help_block"> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>

            <div id="pick-settings-filled" class="flex-item">
              <h2>
                Commands
                <span class="help_popup">[?]</span>
              </h2>

              <ul>
                <li>
                  <a href="#" class="btn-square orange"><i class="fa fa-align-justify"></i></a> sudo apt-get install nodejs
                  <a href="#" class="btn-square orange"><i class="fa fa-remove"></i></a>
                </li>
                <li>
                  <a href="#" class="btn-square orange"><i class="fa fa-align-justify"></i></a> sudo apt-get install nodejs
                  <a href="#" class="btn-square orange"><i class="fa fa-remove"></i></a>
                </li>
                <li>
                  <a href="#" class="btn-square orange"><i class="fa fa-align-justify"></i></a> sudo apt-get install nodejs
                  <a href="#" class="btn-square orange"><i class="fa fa-remove"></i></a>
                </li>
                <li>
                  <a href="#" class="btn-square orange"><i class="fa fa-align-justify"></i></a> sudo apt-get install nodejs
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

export default BuilderStep3Page;
