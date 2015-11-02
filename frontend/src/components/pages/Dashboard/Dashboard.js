import './Dashboard.scss';
import React, { PropTypes } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import AuthStore from '../../../stores/AuthStore';

//import { List, ListItem } from 'material-ui';
import { Link } from 'react-router';
/**
 * The dashboard gives a quick overview of the projects that belong to a organisation
 * The detailed information about projects can be found under the projects tab.
 */
class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = this._getState();
    }

    _getState() {
        return {
            user: AuthStore.user,
            organisations: AuthStore.organisations || [],
            selected_organisation: AuthStore.selected_organisation
        }
    }

    // Listen on store changes
    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        AuthStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.changeListener);
    }

    _onChange() {
        this.setState(this._getState());
    }

    // Render
    render() {
        const { user, organisations, selected_organisation } = this.state;
        const projects = selected_organisation ? selected_organisation.projects : [];
        const { history } = this.props;

        return (
            <DashboardLayout>
              {
                  projects.map(p => {
                      return <Link to="/" key={p.id}>{p.name}</Link>;
                  })
              }
            </DashboardLayout>
        );
    }
};

Dashboard.propTypes = {

};

Dashboard.defaultProps = {

};

export default Dashboard;
