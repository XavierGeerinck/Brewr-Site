import styles from './ProjectEditImage.scss';
import React, { PropTypes } from 'react';
import cx from 'classnames';

import ProjectActions from '../../../actions/ProjectActions';
import AuthStore from '../../../stores/AuthStore';
import ProjectEditImageStore from '../../../stores/ProjectEditImageStore';

import BuilderComponent from '../../elements/Builder';

class ProjectEditImage extends React.Component {
    constructor(props) {
        super(props);
    }

	componentWillMount() {
		this.setState(this._getState());
        ProjectActions.editProjectImage(AuthStore.token, this.props.params.organisationUUID, this.props.params.projectId, this.props.params.revisionUUID);
	}

	componentDidMount() {
        this.changeListener = this._onChange.bind(this);
		ProjectEditImageStore.addChangeListener(this.changeListener);
	}

	componentWillUnmount() {
		ProjectEditImageStore.removeChangeListener(this.changeListener);
	}

	_getState() {
		return {
			image: ProjectEditImageStore.image
		}
	}

	_onChange() {
		this.setState(this._getState());
	}

	_handleOnClickFinish(image) {
		console.log('Need to update project');
	}

    render() {
		var self = this;

		const { image } = this.state;

        return (
            <div className="ProjectEditImage">
				<BuilderComponent
					baseInfo={image}
					onClickFinish={this._handleOnClickFinish.bind(this)} />
            </div>
        );
    }
};

ProjectEditImage.propTypes = {

};

ProjectEditImage.defaultProps = {

};

export default ProjectEditImage;
