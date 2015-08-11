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
      <div className="BuilderStep4Page">
        {/* Add Expose */}
        <section className="sub-content flex-container">
          <div className="flex-container">
            <div id="pick-settings" className="flex-item">
              <label htmlFor="input_cmd">Add Expose Port</label>
              <input type="text" name="input_cmd" placeholder="Type a port in the format port_container:port_local..." />
            </div>
          </div>
        </section>

        {/* Current Expose */}
        <section className="sub-content flex-container">
          <div className="flex-container">
            <div id="pick-settings-filled" className="flex-item">
              <h2>Commands</h2>

              <ul>
                <li>
                  80 : 80
                  <a href="#" className="btn-square orange"><i className="fa fa-remove"></i></a>
                </li>
                <li>
                  3336 : 3336
                  <a href="#" className="btn-square orange"><i className="fa fa-remove"></i></a>
                </li>
                <li>
                  22 : 22
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
});
