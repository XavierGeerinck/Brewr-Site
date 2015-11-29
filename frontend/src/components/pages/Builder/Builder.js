import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Wizard from '../../elements/Wizard';
import DashboardLayout from '../../layouts/DashboardLayout';
import BuilderStep1 from './step1';
import BuilderStep2 from './step2';
import BuilderStep3 from './step3';
import BuilderStep4 from './step4';
import BuilderStep5 from './step5';
import BuilderStep6 from './step6';
import BuilderStore from '../../../stores/BuilderStore';
import styles from './Builder.scss';
import BuilderActions from '../../../actions/BuilderActions';

class Builder extends React.Component {
    constructor(props) {
        super(props);

        this.state = this._getBuilderState();
    }

    _getBuilderState() {
        return {
            currentStep: BuilderStore.currentStep,
            dockerfile: BuilderStore.dockerfile
        }
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        BuilderStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
        BuilderStore.removeChangeListener(this.changeListener);
    }

    _onChange() {
        console.log('CHANGED');
        console.log(this._getBuilderState());
        this.setState(this._getBuilderState());
    }

    render() {
        var content = null;

        switch (BuilderStore.currentStep) {
            case 2:
                content = <BuilderStep2 imageParams={this.state.dockerfile} />;
                break;
            case 3:
                content = <BuilderStep3 imageParams={this.state.dockerfile} />;
                break;
            case 4:
                content = <BuilderStep4 imageParams={this.state.dockerfile} />;
                break;
            case 5:
                content = <BuilderStep5 imageParams={this.state.dockerfile} />;
                break;
            case 6:
                content = <BuilderStep6 dockerFileObject={this.state.dockerfile}/>;
                break;
            case 1:
            default:
                content = <BuilderStep1 imageParams={this.state.dockerfile} />;
        };

        return (
            <DashboardLayout title="Environment Builder">
                {/* Wizard */}
                <Wizard steps={BuilderStore.steps} currentStepIdx={BuilderStore.currentStep} />

                {/* Show content */}
                {content}
            </DashboardLayout>
        );
    }
}

Builder.defaultProps = {

};

Builder.propTypes = {

};

export default Builder;
