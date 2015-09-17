import './DropdownMenu.css';
import React, { PropTypes } from 'react';
import DropdownMenuItem from './DropdownMenuItem';

class DropdownMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    componentDidMount() {
        document.addEventListener("click", this.documentClickHandler.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.documentClickHandler.bind(this));
    }

    dropdownClickHandler(e) {
        e.nativeEvent.stopImmediatePropagation();
    }

    documentClickHandler() {
        this.setState({
            isOpen: false
        });
    }

    handleClickActivator(e) {
        let isOpen = this.state.isOpen;

        this.setState({
            isOpen: !isOpen
        });

        // Don't propogate further, else we will close it instantly
        e.nativeEvent.stopImmediatePropagation();
    }

    render() {
        const { isOpen } = this.state;
        const { title, children } = this.props;

        var cx = React.addons.classSet;

        var classNameItems = cx({
            'DropdownMenu-Items': true,
            'DropdownMenu-Items-Visible': isOpen
        });

        return (
            <div className="DropdownMenu">
                <div className="DropdownMenu-Activator" onClick={this.handleClickActivator.bind(this)}>
                    {title}
                </div>

                <div className={classNameItems} onClick={this.dropdownClickHandler.bind(this)}>
                    {children}
                </div>
            </div>
        );
    }
};

DropdownMenu.propTypes = {
    title: PropTypes.any.isRequired
};

DropdownMenu.defaultProps = {
    title: ""
};

// Allow access to dropdownmenuitem
DropdownMenu.DropdownMenuItem = DropdownMenuItem;

export default DropdownMenu;
