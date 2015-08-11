/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './BuilderStep5Page.css';
import withStyles from '../../decorators/withStyles';
import SideMenu from '../SideMenu';
import Button from '../Button';
import Link from '../../utils/Link';

@withStyles(styles)
class BuilderStep5Page {

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
      <div className="BuilderStep5Page">
        {/* Add Volumes */}
        <section className="sub-content flex-container">
          <div className="flex-container">
            <div id="pick-settings" className="flex-item">
              <label htmlFor="input_cmd">Add Volumes</label>
              <input type="text" name="input_cmd" placeholder="Type a volume, format: /data..." />
            </div>
          </div>
        </section>

        {/* Current Volumes */}
        <section className="sub-content flex-container">
          <div className="flex-container">
            <div id="pick-settings-filled" className="flex-item">
              <h2>Volumes</h2>

              <ul>
                <li>
                  /data
                  <a href="#" className="btn-square orange"><i className="fa fa-remove"></i></a>
                </li>
                <li>
                  /logs
                  <a href="#" className="btn-square orange"><i className="fa fa-remove"></i></a>
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

export default BuilderStep5Page;
