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
import styles from './Builder.scss';

const builderSteps = [ "Distribution Picker", "Install Programs", "Manage Files & Src", "Startup Commands", "Ports & Env", "Finalize" ];


const featuredDistributions = [
    {
        "distribution": "ubuntu",
        "logo_url": "http://summit.ubuntu.com/media/images/cof_orange_hex1.png",
        "versions": [{
            "name": "v15.04 - Vilvid Vervet",
            "value": "15.04"
        },
        {
            "name": "v14.10 - Utopic Unicorn",
            "value": "14.10"
        },
        {
            "name": "v14.04 - LTS Trusty Tahr",
            "value": "14.04"
        },
        {
            "name": "v13.10 Saucy Salamander",
            "value": "13.10"
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

class Builder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            steps: builderSteps,
            currentStep: 1,
            numberOfSteps: 6,
            image: props.baseInfo
        };
    }

    _handleOnClickNext() {

    }

    _handleOnClickPrevious() {

    }

    // Accepts the changed params, we can change this with setState
    // The different steps propagate their changes up towards this class
    // The reason is that we do not need to keep states for every step
    _handleOnSave(updates) {
        this.setState({
            items: update(self.state.image, { $merge: updates })
        });
    }

    render() {
        var self = this;
        var content = null;

        switch (self.state.currentStep) {
            case 2:
                console.log(self.state.image);
                content = <BuilderStep2
                    imageParams={self.state.image}
                    onClickNext={self._handleOnClickNext.bind(self)}
                    onClickPrevious={self._handleOnClickPrevious.bind(self)}
                    onSave={self._handleOnSave.bind(self)}/>;
                break;
            case 3:
                content = <BuilderStep3 imageParams={self.state.image} />;
                break;
            case 4:
                content = <BuilderStep4 imageParams={self.state.image} />;
                break;
            case 5:
                content = <BuilderStep5 imageParams={self.state.image} />;
                break;
            case 6:
                content = <BuilderStep6 imageParams={self.state.image}/>;
                break;
            case 1:
            default:
                content = <BuilderStep1
                featuredDistributions={featuredDistributions}
                imageParams={self.state.image}
                onClickNext={self._handleOnClickNext.bind(self)}
                onClickPrevious={self._handleOnClickPrevious.bind(self)}
                onSave={self._handleOnSave.bind(self)}/>;
        };

        return (
            <DashboardLayout title="Environment Builder">
                {/* Wizard */}
                <Wizard
                    steps={self.state.steps} currentStepIdx={self.state.currentStep} />

                {/* Show content */}
                {content}
            </DashboardLayout>
        );
    }
}

Builder.defaultProps = {
    baseInfo: { meta: {}, envInfo: {}, files: [] }
};

Builder.propTypes = {
    baseInfo: PropTypes.object
};

export default Builder;
