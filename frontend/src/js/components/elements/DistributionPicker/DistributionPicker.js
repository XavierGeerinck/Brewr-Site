import React, { PropTypes } from 'react';
import DistributionItem from './DistributionItem';

var distributions = [
    {
        "distribution": "ubuntu",
        "logo_url": "http://summit.ubuntu.com/media/images/cof_orange_hex1.png",
        "versions": [{
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

class DistributionPicker extends React.Component {
    getInitialState () {
        return {
            selected_distribution: null,
            selected_version: null
        }
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
        this.setState({ selected_version: version.value });

        if (this.props.onChangeDistribution) {
            this.props.onChangeDistribution(this.state);
        }
    }

    render () {
        var distributionComponents = [];
        distributions.forEach(function (distributionItem) {
            if (this.state && this.state.selected_distribution === distributionItem.distribution) {
                distributionItem.is_selected = true;
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
    onChangeDistribution: PropTypes.func
}

DistributionPicker.defaultProps = {
    onChangeDistribution: function () {}
};

export default DistributionPicker;
