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

var images = [
    {
        "distribution": "ubuntu",
        "logo_url": "http://summit.ubuntu.com/media/images/cof_orange_hex1.png",
        "versions": [{
            name: "v15.04 - Vilvid Vervet",
            value: "15.04"
        }]
    },
    {
        "distribution": "fedora",
        "logo_url": "http://summit.ubuntu.com/media/images/cof_orange_hex1.png",
        "versions": [{
            name: "v15.04 - Vilvid Vervet",
            value: "15.04"
        }]
    },
    {
        "distribution": "coreos",
        "logo_url": "http://summit.ubuntu.com/media/images/cof_orange_hex1.png",
        "versions": [{
            name: "v15.04 - Vilvid Vervet",
            value: "15.04"
        }]
    },
    {
        "distribution": "mint",
        "logo_url": "http://summit.ubuntu.com/media/images/cof_orange_hex1.png",
        "versions": [{
            name: "v15.04 - Vilvid Vervet",
            value: "15.04"
        }]
    }
];

class BuilderStep1Page extends React.Component {
    getInitialState() {
        return {
            distribution: 'ubuntu',
            distribution_version: '15.04',
            hub_search: ''
        }
    }

    render() {
        return (
            <DashboardLayout>
                <div className="BuilderStep1Page">

                    {/* Pick Predefined Docker Image */}
                    <h1>Pick your base image</h1>
                    <DistributionPicker distributions={images} />

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
