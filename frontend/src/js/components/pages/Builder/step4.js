import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import ListPort from '../../elements/ListPort';

var ports = [
  "80:80", "3306:3306", "8000:8000"
];
class Step4 extends React.Component {
  handleNextPageClick () {
    var newStep = (this.state.step + 1) % (this.stepCount + 1);

    this.setState({
      step: newStep
    });
  }

  render() {
    return (
      <div className="BuilderStep4Page">
        {/* Add Expose */}
        <InlineContainer>
          <Input  label="Add Expose Port" name="input_cmd" placeholder="Type a port in the format port_container:port_local..." type="text"/>
          <Button  isForm="true" text="Add"/>
        </InlineContainer>

        {/* Current Expose */}
        <h1>Ports</h1>
        <ListPort  items={ports}/>

        {/* Next Button */}
        <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.props.onClickNextPage.bind(this)}/>
        <div className="clear"></div>
      </div>
    );
  }
}

Step4.defaultProps = {
  onClickNextPage: PropTypes.func
};

Step4.propTypes = {
  onClickNextPage: function () {}
};

export default Step4;
