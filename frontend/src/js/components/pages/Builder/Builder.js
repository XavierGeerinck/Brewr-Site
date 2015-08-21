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

class Builder extends React.Component {
    constructor(props) {
        super(props);

        this.stepCount = 7;

        this.state = {
            selected_distribution: null,
            hub_search: '',
            step: 1
        };
    }

    handleDistributionChange (distribution) {
        this.setState({
            selected_distribution: distribution
        });
    }

    handleNextPageClick () {
        console.log(this.state);
        var newStep = (this.state.step + 1) % (this.stepCount + 1);

        this.setState({
            step: newStep
        });
    }

    render() {
        var content = null;

        switch (this.state.step) {
            case 2:
                content = <BuilderStep2 onClickNextPage={this.handleNextPageClick.bind(this)} />;
                break;
            case 3:
                content = <BuilderStep3 onClickNextPage={this.handleNextPageClick.bind(this)} />;
                break;
            case 4:
                content = <BuilderStep4 onClickNextPage={this.handleNextPageClick.bind(this)} />;
                break;
            case 5:
                content = <BuilderStep5 onClickNextPage={this.handleNextPageClick.bind(this)} />;
                break;
            case 6:
                content = <BuilderStep6 onClickNextPage={this.handleNextPageClick.bind(this)} />;
                break;
            case 7:
                content = <BuilderStep7 onClickNextPage={this.handleNextPageClick.bind(this)} />;
                break;
            case 1:
            default:
                content = <BuilderStep1
                           onChangeDistribution={this.handleDistributionChange.bind(this)}
                           onClickNextPage={this.handleNextPageClick.bind(this)}/>;
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
