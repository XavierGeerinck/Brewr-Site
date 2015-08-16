import React, { PropTypes } from 'react';
import DistributionItem from './DistributionItem';

class DistributionPicker extends React.Component {
    render () {
        var distributions = [];

        this.props.distributions.forEach(function (distributionItem) {
            distributions.push(<DistributionItem distribution={distributionItem} key={distributionItem.distribution} />);
        });

        return (
            <div className="DistributionPicker-FlexContainer">
                {distributions}
            </div>
        );
    }
};

DistributionPicker.propTypes = {
    distributions: PropTypes.array
}

DistributionPicker.defaultProps = {
    distributions: []
};

export default DistributionPicker;
