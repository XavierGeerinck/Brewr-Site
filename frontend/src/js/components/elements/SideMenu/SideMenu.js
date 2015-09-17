import React from 'react';
import BaseComponent from '../../BaseComponent';
import { Link } from 'react-router';
import './SideMenu.css';

export default class SideMenu extends BaseComponent {
    render() {
        return (
            <div className="SideMenu">
                <h1>
                    <Link to="/"><i className="fa fa-bars"></i><span>Brewr</span></Link>
                </h1>

                <ul>
                    <li>
                        <Link to="/dashboard"><i className="fa fa-home"></i><span>Dashboard</span></Link>
                    </li>

                    <li>
                        <Link to="/teams"><i className="fa fa-group"></i><span>Teams</span></Link>
                    </li>

                    <li className="second-level">
                        <Link to="/projects">
                            <i className="fa fa-folder"></i><span>Projects</span>
                            <i className="fa fa-caret-down item-dropdown"></i>
                        </Link>

                        <div className="clear"></div>

                        <ul>
                            <li><a href="#"><span>Google Inbox</span></a></li>
                            <li><a href="#"><span>Google Analytics</span></a></li>
                            <li><a href="#"><span>Google Drive</span></a></li>
                        </ul>
                    </li>
                    <li className="active">
                        <Link to="/builder"><i className="fa fa-gears"></i><span>Image Creator</span></Link>
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-lock"></i><span>Admin</span></a>
                    </li>
                </ul>
            </div>
        );
    }
}
