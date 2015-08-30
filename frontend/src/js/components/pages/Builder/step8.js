import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import DashboardLayout from '../../layouts/DashboardLayout';
import DockerfileViewer from '../../elements/DockerfileViewer';

class Step8 extends React.Component {
    handleSave () {
        var data = {};

        this.props.onClickNextPage(data);
    }

  render() {
    return (
      <div className="BuilderStep8Page">
        {/* Current Volumes */}
        <h1>Finalize</h1>
        <DockerfileViewer dockerFileObject={this.props.dockerFileObject} />

        {/* Next Button */}
        <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.handleSave.bind(this)}/>
        <div className="clear"></div>
      </div>
    );
  }
}

Step8.defaultProps = {
  onClickNextPage: function () {},
  dockerFileObject: {}
};

Step8.propTypes = {
  onClickNextPage: PropTypes.func,
  dockerFileObject: PropTypes.object
};

export default Step8;
