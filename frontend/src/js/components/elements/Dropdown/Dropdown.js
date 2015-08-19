import React, {PropTypes } from 'react';

class Dropdown extends React.Component {
    handleChange (el) {
        this.props.onChange(this.refs.dropdownOption.getDOMNode().value);
    }

    render() {
        var self = this;
        var cx = React.addons.classSet;

        var options = [];

        this.props.items.forEach(function (item) {
            options.push(<option value={item.value} selected={item.isSelected}>{item.name}</option>);
        });

        var className = cx({
            'Dropdown': true,
            'Dropdown-Selected': this.props.isSelected
        });

        return (
            <div className={className}>
                <select onChange={self.handleChange.bind(self)} ref="dropdownOption">
                  {options}
                </select>
            </div>
        );
    }
};

Dropdown.propTypes = {
    items: PropTypes.array,
    isSelected: PropTypes.bool, // Is the current selectdown box selected (different color)
    onChange: PropTypes.func
};

Dropdown.defaultProps = {
    items: [],
    isSelected: false
};

export default Dropdown;
