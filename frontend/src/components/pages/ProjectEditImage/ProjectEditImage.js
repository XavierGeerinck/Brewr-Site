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
	}
	componentDidMount() {
		AuthStore.addChangeListener(this._onChange);
		ProjectEditImageStore.addChangeListener(this._onChange);

        ProjectActions.editProjectImage(AuthStore.token, this.state.currentOrganisation, this.state.selectedProject.id, this.state.selectedProject.revisions[0].revision_number);
	}

	componentWillUnmount() {
		AuthStore.removeChangeListener(this._onChange);
		ProjectEditImageStore.removeChangeListener(this._onChange);
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

		console.log(image);

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
