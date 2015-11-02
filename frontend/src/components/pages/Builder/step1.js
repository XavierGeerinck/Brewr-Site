import fa from 'font-awesome/css/font-awesome.css';
import styles from './Builder.scss';
import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import DistributionPicker from '../../elements/DistributionPicker';
import DockerHubSearch from '../../elements/DockerHubSearch';
import Divider from '../../elements/Divider';
import BuilderActions from '../../../actions/BuilderActions';
import BuilderStore from '../../../stores/BuilderStore';
import cx from 'classnames';

/**
 * Step 1: Distribution picker
 *
 * The user should be able to pick from several predefined distributions (featured)
 * but should also be able to search on the docker hub for already existing ones.
 */
class Step1 extends React.Component {
    handleNextPage () {
        this._save();
        BuilderActions.nextPage();
    }

    _save() {
        BuilderActions.changeDistribution(this.refs.distribution_picker.state.selected_distribution , this.refs.distribution_picker.state.selected_version);
    }

    render() {
        return (
            <div className={styles.BuilderStep1Page}>
                {/* Pick Predefined Docker Image */}
                <h1>Pick your base image</h1>
                <DistributionPicker distributions={BuilderStore.featuredDistributions} selectedDistribution={BuilderStore.dockerfile.distribution} selectedVersion={BuilderStore.dockerfile.distribution_version} ref="distribution_picker"/>

                <Divider text="Or"/>

                {/* Search docker */}
                <h1>Search Docker Hub</h1>
                <DockerHubSearch/>

                {/* Next Button */}
                <Button text=<span>Next <i  className={cx(fa.fa, fa['fa-angle-right'])}/></span> color="Orange" onClick={this.handleNextPage.bind(this)}/>
                <div className="clear"></div>
            </div>
        );
    }
}

Step1.defaultProps = {
};

Step1.propTypes = {
};

export default Step1;
