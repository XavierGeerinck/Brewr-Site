import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import ListEnvironmentVariables from '../../elements/ListEnvironmentVariables';

var environmentVariables = [
  "ENVIRONMENT=staging", "TEST=test123"
];

class Step7 extends React.Component {
  render() {
    return (
      <div className="BuilderStep7Page">
        {/* Add Volumes */}
        <InlineContainer>
          <Input  label="Add Environment Variables" name="input_cmd" placeholder="Type a environment variable, format: ENV_VARIABLE=value" type="text"/>
          <Button  isForm="true" text="Add"/>
        </InlineContainer>

        {/* Current Volumes */}
        <h1>Environment Variables</h1>
        <ListEnvironmentVariables  items={environmentVariables}/>

        {/* Next Button */}
        <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.props.onClickNextPage.bind(this)}/>
        <div className="clear"></div>
      </div>
    );
  }
}

Step7.defaultProps = {
  onClickNextPage: PropTypes.func
};

Step7.propTypes = {
  onClickNextPage: function () {}
};

export default Step7;
