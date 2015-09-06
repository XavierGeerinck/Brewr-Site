import React, { PropTypes } from 'react';
import DistributionItem from './DistributionItem';
import './DistributionPicker.css';

class DistributionPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected_distribution: props.selectedDistribution,
            selected_version: props.selectedVersion
        };
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
        this.props.distributions.forEach(function (distributionItem) {
            // Set selected for the item
            if (this.state && this.state.selected_distribution === distributionItem.distribution) {
                distributionItem.isSelected = true;

                // For the selected item, set the selected version
                distributionItem.versions.forEach(i => {
                    if (i.value === this.state.selected_version) {
                        i.isSelected = true;
                    }
                });
            } else {
                distributionItem.is_selected = false;
            }

            distributionComponents.push(
                <DistributionItem
                    onClick={this.handleClick.bind(this)}
                    onVersionChange={this.handleVersionChange.bind(this)}
                    distribution={distributionItem}
                    key={distributionItem.distribution} />
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
