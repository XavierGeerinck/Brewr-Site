import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class SideMenuContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showItems: false
        }
    }

    showItems(e) {
        e.preventDefault();

        this.setState({
            showItems: !this.state.showItems
        })
    }

    render() {
        const { title } = this.props;
        const { showItems } = this.state;

        return (
            <li className="SideMenuContainer SideMenuContainer-Second-Level">
                <a href="#" onClick={this.showItems.bind(this)}>
                    {title}
                    <i className="fa fa-caret-down item-dropdown"></i>
                </a>

                <div className="clear"></div>

                {
                    showItems ?
                    <ul>{this.props.children}</ul>
                    : undefined
                }
            </li>
        );
    }
};

SideMenuContainer.propTypes = {
    title: PropTypes.any.isRequired
};

SideMenuContainer.defaultProps = {
    title: ""
};

export default SideMenuContainer;
