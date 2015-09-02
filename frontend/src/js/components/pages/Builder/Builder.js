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

class Builder extends React.Component {
    constructor(props) {
        super(props);

        this.stepCount = 9;

        this.state = {
            config: {
                distribution: null, // FROM (base)
                distribution_version: null, // FROM (version)
                instructions: {
                    maintainer: null, // The MAINTAINER instruction allows you to set the Author field of the generated images.
                    label: [], // The LABEL instruction adds metadata to an image. A LABEL is a key-value pair. (LABEL <key>=<value> <key>=<value> <key>=<value>)
                    workdir: null, // The WORKDIR instruction sets the working directory
                    user: null, // The USER instruction sets the user name or UID to use when running the image

                    // TODO
                    cmd: null,
                    run: null,
                    expose: null,
                    env: null,
                    add: null,
                    copy: null,
                    entrypoint: null,
                    volume: null,
                    onbuild: null
                },
            },
            hub_search: '',
            step: 1
        };
    }

    handleDistributionChange (distribution) {
        this.setState({
            distribution: distribution.selected_distribution,
            distribution_version: distribution.selected_version
        });
    }

    handleNextPageClick (update) {
        var newStep = (this.state.step + 1) % (this.stepCount + 1);

        var updateState = React.addons.update(this.state, {
            step: { $set: newStep },
            config: update
        });

        this.setState(updateState, function () {
            console.log(this.state);
        });
    }

    render() {
        var content = null;

        switch (this.state.step) {
            case 2:
                content = <BuilderStep2
                    onClickNextPage={this.handleNextPageClick.bind(this)} />;
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
            case 8:
                content = <BuilderStep8 onClickNextPage={this.handleNextPageClick.bind(this)} />;
                break;
            case 9:
                content = <BuilderStep9 onClickNextPage={this.handleNextPageClick.bind(this)} dockerFileObject={this.state.config} />;
                break;
            case 1:
            default:
                content = <BuilderStep1
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
