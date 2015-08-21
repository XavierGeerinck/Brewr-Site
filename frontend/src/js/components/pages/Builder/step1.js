import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import DistributionPicker from '../../elements/DistributionPicker';
import DockerHubSearch from '../../elements/DockerHubSearch';
import Divider from '../../elements/Divider';

class Step1 extends React.Component {
  render() {
    return (
      <div className="BuilderStep1Page">
        {/* Pick Predefined Docker Image */}
        <h1>Pick your base image</h1>
        <DistributionPicker onChangeDistribution={this.props.onChangeDistribution.bind(this)}/>

        <Divider  text="Or"/>

        {/* Search docker */}
        <h1>Search Docker Hub</h1>
        <DockerHubSearch/>

        {/* Next Button */}
        <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.props.onClickNextPage.bind(this)}/>
        <div className="clear"></div>
      </div>
    );
  }
}

Step1.defaultProps = {
  onChangeDistribution: PropTypes.func,
  onClickNextPage: PropTypes.func
};

Step1.propTypes = {
  onChangeDistribution: function() {},
  onClickNextPage: function () {}
};

export default Step1;