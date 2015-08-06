/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import styles from './SideMenu.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class SideMenu {

  render() {
    return (
      <div className="SideMenu">
  			<h1><a href="#"><i className="fa fa-bars"></i><span>Brewr</span></a></h1>

  			<ul>
  				<li>
  					<a href="#"><i className="fa fa-home"></i><span>Dashboard</span></a>
  				</li>

  				<li>
  					<a href="#"><i className="fa fa-group"></i><span>Teams</span></a>
  				</li>

  				<li className="second-level">
  					<a href="#">
  						<i className="fa fa-folder"></i><span>Projects</span>
  						<i className="fa fa-caret-down item-dropdown"></i>
  					</a>

  					<div className="clear"></div>

  					<ul>
  						<li><a href="#"><span>Google Inbox</span></a></li>
  						<li><a href="#"><span>Google Analytics</span></a></li>
  						<li><a href="#"><span>Google Drive</span></a></li>
  					</ul>
  				</li>
  				<li className="active">
  					<a href="#"><i className="fa fa-gears"></i><span>Image Creator</span></a>
  				</li>
  				<li>
  					<a href="#"><i className="fa fa-lock"></i><span>Admin</span></a>
  				</li>
  			</ul>
      </div>
    );
  }

}

export default SideMenu;
