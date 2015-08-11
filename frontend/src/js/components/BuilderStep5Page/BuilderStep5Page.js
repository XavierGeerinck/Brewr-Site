/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../SideMenu';
import Button from '../Button';

export default React.createClass({
  propTypes: {
  },

  getDefaultProps() {
    return {
    }
  },

  render() {
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
        <Button text="Next >" color="Orange" />
        <div className="clear"></div>
      </div>
    );
  }
});
