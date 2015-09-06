import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import CRUDList from '../../elements/CRUDList';
import {  Tooltip,  OverlayTrigger } from 'react-bootstrap';
import BuilderActions from '../../../actions/BuilderActions';

var files = [
  "/var/www:www", "/var/log:log"
];
class Step6 extends React.Component {
    handleSave () {
        if (this.refs.input_commands) {
            var items = JSON.parse(JSON.stringify(this.refs.input_commands.refs.child.state.items));
            BuilderActions.changeAddItems(items);
        }

        BuilderActions.nextPage();
    }

  render() {
      var tooltip = (
        <Tooltip>
          "Specify the files and where to copy them, format: src dest, example: config/nginx.conf /etc/nginx/nginx.conf"
        </Tooltip>
      );

    return (
      <div className="BuilderStep6Page">
        {/* Add Files */}
        <h1>
            Add Files
            <span className="BuilderPage-HelpIcon">
                <OverlayTrigger overlay={tooltip} placement='right'><i  className="fa fa-question-circle"/></OverlayTrigger>
            </span>
        </h1>
        <CRUDList items={files} ref="input_commands"/>

        {/* Next Button */}
        <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.handleSave.bind(this)}/>
        <div className="clear"></div>
      </div>
      );
  }
}


Step6.defaultProps = {
  onClickNextPage: PropTypes.func
};

Step6.propTypes = {
  onClickNextPage: function () {}
};

export default Step6;
