import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import DashboardLayout from '../../layouts/DashboardLayout';
import BuilderStep1 from './step1';
import BuilderStep2 from './step2';
import BuilderStep3 from './step3';
import BuilderStep4 from './step4';
import BuilderStep5 from './step5';
import BuilderStep6 from './step6';
import BuilderStep7 from './step7';
import BuilderStep8 from './step8';
import BuilderStep9 from './step9';
import BuilderStore from '../../../stores/BuilderStore';
import './Builder.css';
import BuilderActions from '../../../actions/BuilderActions';

class Builder extends React.Component {
    constructor(props) {
        super(props);

        this.state = this._getBuilderState();
    }

    _getBuilderState() {
        return {
            currentStep: BuilderStore.currentStep
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
        this.setState(this._getBuilderState());
    }

    render() {
        var content = null;

        switch (BuilderStore.currentStep) {
            case 2:
                content = <BuilderStep2 />;
                break;
            case 3:
                content = <BuilderStep3 />;
                break;
            case 4:
                content = <BuilderStep4 />;
                break;
            case 5:
                content = <BuilderStep5 />;
                break;
            case 6:
                content = <BuilderStep6 />;
                break;
            case 7:
                content = <BuilderStep7 />;
                break;
            case 8:
                content = <BuilderStep8 />;
                break;
            case 9:
                content = <BuilderStep9 dockerFileObject={this.state.config} />;
                break;
            case 1:
            default:
                content = <BuilderStep1 />;
        };

        return (
            <DashboardLayout>
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
