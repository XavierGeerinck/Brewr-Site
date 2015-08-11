/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../SideMenu';
import Button from '../Button';
import Input from '../Input';
import InlineContainer from '../InlineContainer';

export default React.createClass({
  propTypes: {
  },

  getDefaultProps() {
    return {
    }
  },

  render() {
    return (
      <div className="BuilderStep3Page">
        {/* Add Command */}
        <section className="sub-content flex-container">
          <div className="flex-container">
            <div id="pick-settings" className="flex-item">
              <InlineContainer>
                <Input type="text" name="input_cmd" label="Add Command" placeholder="Type a command..." />
                <Button text="Add" isForm="true"/>
              </InlineContainer>
            </div>
          </div>
        </section>

        {/* Current Command */}
        <section className="sub-content flex-container">
          <div className="flex-container">
            <div className="help_block"> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>

            <div id="pick-settings-filled" className="flex-item">
              <h2>
                Commands

                <span className="help_popup">[?]</span>
              </h2>

              <ul>
                <li>
                  <a href="#" className="btn-square orange"><i className="fa fa-align-justify"></i></a> sudo apt-get install nodejs
                  <a href="#" className="btn-square orange"><i className="fa fa-remove"></i></a>
                </li>
                <li>
                  <a href="#" className="btn-square orange"><i className="fa fa-align-justify"></i></a> sudo apt-get install nodejs
                  <a href="#" className="btn-square orange"><i className="fa fa-remove"></i></a>
                </li>
                <li>
                  <a href="#" className="btn-square orange"><i className="fa fa-align-justify"></i></a> sudo apt-get install nodejs
                  <a href="#" className="btn-square orange"><i className="fa fa-remove"></i></a>
                </li>
                <li>
                  <a href="#" className="btn-square orange"><i className="fa fa-align-justify"></i></a> sudo apt-get install nodejs
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
