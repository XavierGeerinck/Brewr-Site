/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './BuilderStep1Page.css';
import withStyles from '../../decorators/withStyles';
import SideMenu from '../SideMenu';
import Button from '../Button';
import Link from '../../utils/Link';

@withStyles(styles)
class BuilderStep1Page {

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    this.context.onSetTitle(this.props.title);
    return (
      <div className="BuilderStep1Page">
        <SideMenu />

        <div className="App-Page">
          <div className="App-Page-Title">
            <h1>Image Builder</h1>
          </div>

          <div className="App-Page-Container">
            <div className="App-Page-Content">
              {/* Pick Predefined Docker Image */}
              <section className="sub-content">
                <h1>Pick your base image</h1>

                <div className="BuilderPage-FlexContainer">
                  <div className="BuilderPage-PickImageBlock">
                    <h1>Ubuntu</h1>
                    <img src="http://summit.ubuntu.com/media/images/cof_orange_hex1.png" />
                    <select>
                      <option value="">v15.04 - Vilvid Vervet</option>
                    </select>
                  </div>

                  <div className="BuilderPage-PickImageBlock">
                    <h1>Ubuntu</h1>
                    <img src="http://summit.ubuntu.com/media/images/cof_orange_hex1.png" />
                    <select>
                      <option value="">v15.04 - Vilvid Vervet</option>
                    </select>
                  </div>

                  <div className="BuilderPage-PickImageBlock">
                    <h1>Ubuntu</h1>
                    <img src="http://summit.ubuntu.com/media/images/cof_orange_hex1.png" />
                    <select>
                      <option value="">v15.04 - Vilvid Vervet</option>
                    </select>
                  </div>

                  <div className="BuilderPage-PickImageBlock">
                    <h1>Ubuntu</h1>
                    <img src="http://summit.ubuntu.com/media/images/cof_orange_hex1.png" />
                    <select>
                      <option value="">v15.04 - Vilvid Vervet</option>
                    </select>
                  </div>

                  <div className="BuilderPage-PickImageBlock">
                    <h1>Ubuntu</h1>
                    <img src="http://summit.ubuntu.com/media/images/cof_orange_hex1.png" />
                    <select>
                      <option value="">v15.04 - Vilvid Vervet</option>
                    </select>
                  </div>

                  <div className="BuilderPage-PickImageBlock">
                    <h1>Ubuntu</h1>
                    <img src="http://summit.ubuntu.com/media/images/cof_orange_hex1.png" />
                    <select>
                      <option value="">v15.04 - Vilvid Vervet</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Search docker */}
      				<section className="sub-content">
      					<h1>Or search Docker Hub</h1>

      					<div className="BuilderPage-FlexContainer">
      						<div className="BuilderPage-PickImageSearch">
      							<input type="text" placeholder="Type a keyword..." />
      						</div>
      					</div>
      				</section>

      				{/* Next Button */}
              <Button text="Next >" color="Orange" onClick={Link.handleClick} />
              <div className="clear"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BuilderStep1Page;
