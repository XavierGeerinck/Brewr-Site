import styles from './Wizard.scss';
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
            let key = "wizard_item_" + idx;

            if ((idx + 1) == currentStepIdx) {
                wizardItems.push(<WizardItem key={key} value={i} isSelected={true} />);
            } else {
                wizardItems.push(<WizardItem key={key} value={i} />);
            }
        });

        return (
            <div className={styles.Wizard}>
                <hr />
                <ul className={styles['Wizard-Items']}>
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
