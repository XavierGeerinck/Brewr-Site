import React, { PropTypes } from 'react';
import DistributionItem from './DistributionItem';
import './DistributionPicker.css';

class DistributionPicker extends React.Component {
    constructor(props) {
        super(props);

        // Set initial state of the picker
        this.state = {
            selected_distribution: props.selectedDistribution,
            selected_version: props.selectedVersion
        };

        this._distributions = JSON.parse(JSON.stringify(props.distributions));
    }

    handleClick (distribution) {
        this.setState({
            selected_distribution: distribution.distribution,
            selected_version: distribution.versions[0].value
        });

        if (this.props.onChangeDistribution) {
            this.props.onChangeDistribution(this.state);
        }
    }

    handleVersionChange (version) {
        this.setState({ selected_version: version });

        if (this.props.onChangeDistribution) {
            this.props.onChangeDistribution(this.state);
        }
    }

    render () {
        var distributionComponents = [];
        this._distributions.forEach(di => {
            // Set selected for the item
            if (this.state && this.state.selected_distribution === di.distribution) {
                di.is_selected = true;

                // For the selected item, set the selected version
                di.versions.forEach(v => {
                    if (v.value === this.state.selected_version) {
                        v.is_selected = true;
                    } else {
                        v.is_selected = false;
                    }
                });
            } else {
                di.is_selected = false;
            }

            distributionComponents.push(
                <DistributionItem
                    onClick={this.handleClick.bind(this)}
                    onVersionChange={this.handleVersionChange.bind(this)}
                    distribution={di}
                    key={di.distribution} />
            );
        }.bind(this));

        return (
            <div className="DistributionPicker-FlexContainer">
                {distributionComponents}
            </div>
        );
    }
};

DistributionPicker.propTypes = {
    onChangeDistribution: PropTypes.func,
    distributions: PropTypes.array.isRequired,
    selectedVersion: PropTypes.string,
    selectedDistribution: PropTypes.string
}

DistributionPicker.defaultProps = {
    onChangeDistribution: function () {},
    distributions: [],
    selectedVersion: null,
    selectedDistribution: null
};

export default DistributionPicker;
