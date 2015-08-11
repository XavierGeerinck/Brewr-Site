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
      <div className="BuilderStep1Page">
        {/* Pick Predefined Docker Image */}
        <section className="sub-content">
          <h1>Pick your base image</h1>

          <div className="BuilderPage-FlexContainer">
            <div className="BuilderPage-PickImageBlock">
              <img src="http://summit.ubuntu.com/media/images/cof_orange_hex1.png" />
              <h1>Ubuntu</h1>
              <select>
                <option value="">v15.04 - Vilvid Vervet</option>
              </select>
            </div>

            <div className="BuilderPage-PickImageBlock">
              <img src="http://summit.ubuntu.com/media/images/cof_orange_hex1.png" />
              <h1>Ubuntu</h1>
              <select>
                <option value="">v15.04 - Vilvid Vervet</option>
              </select>
            </div>

            <div className="BuilderPage-PickImageBlock">
              <img src="http://summit.ubuntu.com/media/images/cof_orange_hex1.png" />
              <h1>Ubuntu</h1>
              <select>
                <option value="">v15.04 - Vilvid Vervet</option>
              </select>
            </div>

            <div className="BuilderPage-PickImageBlock">
              <img src="http://summit.ubuntu.com/media/images/cof_orange_hex1.png" />
              <h1>Ubuntu</h1>
              <select>
                <option value="">v15.04 - Vilvid Vervet</option>
              </select>
            </div>

            <div className="BuilderPage-PickImageBlock">
              <img src="http://summit.ubuntu.com/media/images/cof_orange_hex1.png" />
              <h1>Ubuntu</h1>
              <select>
                <option value="">v15.04 - Vilvid Vervet</option>
              </select>
            </div>

            <div className="BuilderPage-PickImageBlock BuilderPage-PickImageBlock-Selected">
              <img src="http://summit.ubuntu.com/media/images/cof_orange_hex1.png" />
              <h1>Ubuntu</h1>
              <select>
                <option value="">v15.04 - Vilvid Vervet</option>
              </select>
            </div>
          </div>
        </section>

        <div className="BuilderPage-Divider">
          <span>Or</span>
        </div>

        {/* Search docker */}
  			<section className="sub-content">
  				<h1>Search Docker Hub</h1>

  				<div className="BuilderPage-FlexContainer">
  					<div className="BuilderPage-PickImageSearch">
  						<input type="text" placeholder="Type a keyword..." />
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
