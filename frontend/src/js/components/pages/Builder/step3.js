import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import InlineContainer from '../../elements/InlineContainer';
import {
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap';
import DashboardLayout from '../../layouts/DashboardLayout';
import ListCommand from '../../elements/ListCommand';

var commands = [
  "sudo apt-get install nodejs", "sudo apt-get install nodejs", "sudo apt-get install nodejs", "sudo apt-get install nodejs", "sudo apt-get install nodejs"
];
class Step3 extends React.Component {
  handleNextPageClick () {
    var newStep = (this.state.step + 1) % (this.stepCount + 1);

    this.setState({
      step: newStep
    });
  }

  render() {
    var tooltip = (
      <Tooltip>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Tooltip>
    );

    return (
      <div className="BuilderStep3Page">
        {/* Add Command */}
        <InlineContainer>
          <Input  label="Add Command" name="input_cmd" placeholder="Type a command..." type="text"/>
          <Button  isForm="true" text="Add"/>
        </InlineContainer>

        {/* Current Command */}
        <h2>
          Commands
          <span className="BuilderPage-HelpIcon">
            <OverlayTrigger overlay={tooltip} placement='right'><i  className="fa fa-question-circle"/></OverlayTrigger>
          </span>
        </h2>
        <ListCommand  items={commands}/>

        {/* Next Button */}
        <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.props.onClickNextPage.bind(this)}/>
        <div className="clear"></div>
      </div>
    );
  }
}

Step3.defaultProps = {
  onClickNextPage: PropTypes.func
};

Step3.propTypes = {
  onClickNextPage: function () {}
};

export default Step3;
