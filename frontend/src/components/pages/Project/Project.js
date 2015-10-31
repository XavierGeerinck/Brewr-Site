import React, { PropTypes } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import BaseComponent from '../../BaseComponent';
import ProjectActions from '../../../actions/ProjectActions';
import AuthStore from '../../../stores/AuthStore';
import ProjectStore from '../../../stores/ProjectStore';

//import { Card, CardHeader, CardTitle, CardText, CardActions, FlatButton, Avatar } from 'material-ui';

export default class Project extends BaseComponent {
    constructor(props) {
        super(props);
        this._getState();
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        ProjectStore.addChangeListener(this.changeListener);
        ProjectActions.getProject(AuthStore.token, this.props.params.organisationId, this.props.params.projectId);
    }

    componentWillUnmount() {
        ProjectStore.removeChangeListener(this.changeListener);
    }

    componentWillMount() {
    }

    _getState() {
        return {
            selectedProject: ProjectStore.selectedProject
        }
    }

    _onChange() {
        this.setState(this._getState());
    }

    render() {
        if (!this.state || !this.state.selectedProject) {
            return (<div></div>);
        }

        const { selectedProject } = this.state;

        return (
            <DashboardLayout>
                <Card>
                    <CardTitle title={selectedProject.name} />
                    <CardText>{selectedProject.description}</CardText>
                    <CardActions>
                        <FlatButton label="Edit"/>
                        <FlatButton label="Delete"/>
                    </CardActions>
                </Card>
            </DashboardLayout>
        )
    }

}
