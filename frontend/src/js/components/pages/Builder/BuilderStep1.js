/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import DashboardLayout from '../../layouts/DashboardLayout';

class BuilderStep1Page extends React.Component {
  render() {
    return (
      <DashboardLayout>
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
      </DashboardLayout>
    );
  }
}

BuilderStep1Page.defaultProps = {

};

BuilderStep1Page.propTypes = {

};

export default BuilderStep1Page;
