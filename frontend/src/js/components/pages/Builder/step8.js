import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import CRUDList from '../../elements/CRUDList';
import {  Tooltip,  OverlayTrigger } from 'react-bootstrap';

var startupCmd = [
  "nginx -g daemon off;"
];

class Step8 extends React.Component {
    handleSave () {
        var items = JSON.parse(JSON.stringify(this.refs.input_commands.refs.child.state.items));

        var data = {
            instructions: {
                $merge: {
                    cmd: items
                }
            }
        }

        this.props.onClickNextPage(data);
    }

  render() {
      var tooltip = (
        <Tooltip>
          "Add the commands to be executed on the startup of the environment, example: first build the files, then run nginx as long running command"
        </Tooltip>
      );

    return (
      <div className="BuilderStep8Page">
        {/* Current Volumes */}
        <h1>
            Environment Startup Commands
            <span className="BuilderPage-HelpIcon">
                <OverlayTrigger overlay={tooltip} placement='right'><i  className="fa fa-question-circle"/></OverlayTrigger>
            </span>
        </h1>
        <CRUDList items={startupCmd} ref="input_commands"/>

        {/* Next Button */}
        <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.handleSave.bind(this)}/>
        <div className="clear"></div>
      </div>
    );
  }
}

Step8.defaultProps = {
  onClickNextPage: PropTypes.func
};

Step8.propTypes = {
  onClickNextPage: function () {}
};

export default Step8;
