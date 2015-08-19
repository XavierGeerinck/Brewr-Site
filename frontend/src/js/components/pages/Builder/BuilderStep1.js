/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, {
    PropTypes
}
from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import DashboardLayout from '../../layouts/DashboardLayout';
import DistributionPicker from '../../elements/DistributionPicker';
import DockerHubSearch from '../../elements/DockerHubSearch';
import Divider from '../../elements/Divider';

class BuilderStep1Page extends React.Component {
    getInitialState() {
        return {
            selected_distribution: null,
            hub_search: ''
        }
    }

    onChangeDistribution (distribution) {
        this.setState({
            selected_distribution: distribution
        });

        console.log(this.state);
    }

    render() {
        return (
            <DashboardLayout>
                <div className="BuilderStep1Page">

                    {/* Pick Predefined Docker Image */}
                    <h1>Pick your base image</h1>
                    <DistributionPicker onChangeDistribution={this.onChangeDistribution.bind(this)}/>

                    <Divider text="Or" />

                    {/* Search docker */}
            		<h1>Search Docker Hub</h1>
                    <DockerHubSearch />

                	{/* Next Button */}
                    <Button text="Next >" color="Orange" />
                    <div className="clear"></div>
                </div>
            </DashboardLayout>
        );
    }
}

BuilderStep1Page.defaultProps = {

};

BuilderStep1Page.propTypes = {

};

export default BuilderStep1Page;
