import React, { PropTypes } from 'react';
import Dropdown from '../Dropdown';

var dropdownItems = [
    {
        "name": "v15.04 - Vilvid Vervet",
        "value": "15.04",
        "isSelected": true
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
    }
];

class DistributionItem extends React.Component {
    render () {
        var isSelected = false;

        return (
            <div className="DistributionPicker-PickDistribution">
              <img src={this.props.distribution.logo_url} />
              <h1>{this.props.distribution.distribution}</h1>
              <Dropdown items={dropdownItems} isSelected={isSelected} />
            </div>
        )
    }
};

DistributionItem.propTypes = {
    distribution: PropTypes.object
};

DistributionItem.defaultProps = {
    distribution: {
        logo_url: '',
        distribution: ''
    }
};

export default DistributionItem;
