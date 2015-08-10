/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './BuilderStep2Page.css';
import withStyles from '../../decorators/withStyles';
import SideMenu from '../SideMenu';
import Button from '../Button';
import Link from '../../utils/Link';
import Input from '../Input';

@withStyles(styles)
class BuilderStep2Page {

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
      <div className="BuilderStep2Page">
        {/* Search docker */}
        <section className="BuilderStep2Page-Content">
          <form>
            <div id="pick-settings" className="flex-item">
              <Input type="text" id="input_maintainer" label="Maintainer" placeholder="Enter the maintainer for the project.." />
              <Input type="text" id="input_workdir" label="Workdir" placeholder="Enter the directory where you will work from..." />
              <Input type="text" id="input_user" label="User" placeholder="Type a keyword..." />
              <Input type="text" id="input_label" label="Label" placeholder="Type a keyword..." />
            </div>
          </form>
        </section>

  			{/* Next Button */}
        <Button text="Next >" color="Orange" onClick={Link.handleClick} />
        <div className="clear"></div>
      </div>
    );
  }
}

export default BuilderStep2Page;
