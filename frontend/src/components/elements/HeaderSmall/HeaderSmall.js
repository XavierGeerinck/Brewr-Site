import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Logo from '../Logo';
import './HeaderSmall.scss';

class HeaderSmall extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.user ? this.renderLoggedIn() : this.renderNotLoggedIn();
    }

    renderLoggedIn() {
        return (
            <div className="HeaderSmall">
                <div className="HeaderSmall-container">
                    <Logo />

                    <div className="HeaderSmall-Navigation">
                        <Link to="/">Home</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/logout" className="button white">Logout</Link>
                    </div>

                    <div className="clear"></div>
                </div>
            </div>
        );
    }

    renderNotLoggedIn() {
        return (
            <div className="HeaderSmall">
                <div className="HeaderSmall-container">
                    <Logo align="left" />

                    <div className="HeaderSmall-Navigation">
                        <Link to="/">Home</Link>
                        <Link to="/tour">Tour</Link>
                        <Link to="/pricing">Pricing</Link>
                        <Link to="/login">Sign in</Link>
                        <Link to="/register" className="button white">Sign up</Link>
                    </div>

                    <div className="clear"></div>
                </div>
            </div>
        );
    }
}

HeaderSmall.defaultProps = {
    user: null
};

HeaderSmall.propTypes = {
    user: PropTypes.object
};

export default HeaderSmall;
