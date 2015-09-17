import './Dashboard.css';
import React, { PropTypes } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DashboardLayout>
                HELLO WORLD
            </DashboardLayout>
        );
    }
};

Dashboard.propTypes = {

};

Dashboard.defaultProps = {

};

export default Dashboard;
