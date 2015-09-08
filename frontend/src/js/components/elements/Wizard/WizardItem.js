import React, { PropTypes } from 'react';

class WizardItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var cx = React.addons.classSet;

        var className = cx({
            'WizardItem': true,
            'WizardItem-Selected': this.props.isSelected
        });

        return (
            <li className={className}>
                {this.props.value}
            </li>
        );
    }
};

WizardItem.propTypes = {
    value: PropTypes.string,
    isSelected: PropTypes.boolean
};

WizardItem.defaultProps = {
    value: "",
    isSelected: false
};

export default WizardItem;
