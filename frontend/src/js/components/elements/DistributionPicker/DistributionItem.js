import React, { PropTypes } from 'react';

class DistributionItem extends React.Component {
    render () {
        return (
            <div className="DistributionPicker-PickDistribution">
              <img src={this.props.distribution.logo_url} />
              <h1>{this.props.distribution.distribution}</h1>
              <select>
                <option value="">v15.04 - Vilvid Vervet</option>
              </select>
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
