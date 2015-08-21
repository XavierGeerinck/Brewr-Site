import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import ListFile from '../../elements/ListFile';

var files = [
  "/var/www:www", "/var/log:log"
];
class Step6 extends React.Component {
  handleNextPageClick () {
    var newStep = (this.state.step + 1) % (this.stepCount + 1);

    this.setState({
      step: newStep
    });
  }

  render() {
    return (
      <div className="BuilderStep6Page">
        {/* Add Volumes */}
        <InlineContainer>
          <Input  label="Add Files" name="input_cmd" placeholder="Type a volume, format: <host>:<container>..." type="text"/>
          <Button  isForm="true" text="Add"/>
        </InlineContainer>

        {/* Current Volumes */}
        <h1>Files</h1>
        <ListFile  items={files}/>

        {/* Next Button */}
        <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.props.onClickNextPage.bind(this)}/>
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
