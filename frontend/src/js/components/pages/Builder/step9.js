import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import DashboardLayout from '../../layouts/DashboardLayout';
import DockerfileViewer from '../../elements/DockerfileViewer';
import BuilderActions from '../../../actions/BuilderActions';
import BuilderStore from '../../../stores/BuilderStore';

class Step9 extends React.Component {
    handleSave () {
        BuilderActions.nextPage();
    }

    render() {
        return (
            <div className="BuilderStep9Page">
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

Step9.defaultProps = {
    dockerFileObject: {}
};

Step9.propTypes = {
    dockerFileObject: PropTypes.object
};

export default Step9;
