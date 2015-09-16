import React, { PropTypes } from 'react';
import './Logo.css';

class Logo extends React.Component {
    render() {
        var cx = React.addons.classSet;

        var classes = cx({
            'Logo': true,
            'Logo-Align-Right': this.props.align === 'right',
            'Logo-Align-Left': this.props.align === 'left',
        });

        return (
            <a className={classes} href="/">
                <img className="Logo-img" src={require('./logo.png')} width="38" height="38" alt="Logo" />
                <span className="Logo-txt">{this.props.name}</span>
            </a>
        );
    }

}

Logo.defaultProps = {
    name: "Brewr",
    align: ""
};

Logo.propTypes = {
    name: PropTypes.string,
    align: PropTypes.string
};

export default Logo;
