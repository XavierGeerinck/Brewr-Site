import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import DashboardLayout from '../../layouts/DashboardLayout';
import DockerfileViewer from '../../elements/DockerfileViewer';
import BuilderActions from '../../../actions/BuilderActions';
import BuilderStore from '../../../stores/BuilderStore';

class Step3 extends React.Component {
    handleNextPage () {
        BuilderActions.finishDockerfile();
    }

    handlePreviousPage() {
        BuilderActions.previousPage();
    }

    render() {
        return (
            <div className="BuilderStep3Page">
                {/* Current Volumes */}
                <h1>Finalize</h1>
                <DockerfileViewer dockerFileObject={this.props.dockerFileObject} />

                {/* Previous Button */}
                <Button text=<span><i  className="fa fa-angle-left"/> Previous</span> color="Orange" onClick={this.handlePreviousPage.bind(this)}/>
                <div className="clear"></div>

                {/* Finish Button */}
                <Button text="Finish" color="Orange" onClick={this.handleNextPage.bind(this)}/>
                <div className="clear"></div>
            </div>
        );
    }
}

Step3.defaultProps = {
    dockerFileObject: {}
};

Step3.propTypes = {
    dockerFileObject: PropTypes.object
};

export default Step3;
