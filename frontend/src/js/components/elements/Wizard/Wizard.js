import "./Wizard.css";
import React, { PropTypes } from 'react';
import WizardItem from './WizardItem';

class Wizard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { steps, currentStepIdx } = this.props;

        var wizardItems = [];
        steps.forEach((i, idx) => {
            if ((idx + 1) == currentStepIdx) {
                wizardItems.push(<WizardItem value={i} isSelected={true} />);
            } else {
                wizardItems.push(<WizardItem value={i} isSelected={false} />);
            }
        });

        return (
            <div className="Wizard">
                <hr />
                <ul className="Wizard-Items">
                    {wizardItems}
                </ul>
            </div>

        );
    }
};

Wizard.propTypes = {
    currentStepIdx: PropTypes.number,
    steps: PropTypes.array
};

Wizard.defaultProps = {
    currentStepIdx: 1,
    steps: []
};

export default Wizard;
