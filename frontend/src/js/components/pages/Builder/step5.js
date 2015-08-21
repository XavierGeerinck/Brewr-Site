import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import ListVolume from '../../elements/ListVolume';

var volumes = [
  "/data", "/logs"
];

class Step5 extends React.Component {
  handleNextPageClick () {
    var newStep = (this.state.step + 1) % (this.stepCount + 1);

    this.setState({
      step: newStep
    });
  }

  render() {
    return (
      <div className="BuilderStep5Page">
        {/* Add Volumes */}
        <InlineContainer>
          <Input  label="Add Volumes" name="input_cmd" placeholder="Type a volume, format: /data..." type="text"/>
          <Button  isForm="true" text="Add"/>
        </InlineContainer>

        {/* Current Volumes */}
        <h1>Volumes</h1>
        <ListVolume  items={volumes}/>

        {/* Next Button */}
        <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.props.onClickNextPage.bind(this)}/>
        <div className="clear"></div>
      </div>
    );
  }
}

Step5.defaultProps = {
  onClickNextPage: PropTypes.func
};

Step5.propTypes = {
  onClickNextPage: function () {}
};

export default Step5;
