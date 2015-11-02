import React, { PropTypes } from 'react';
import HeaderSmall from '../../elements/HeaderSmall';
import Footer from '../../elements/Footer';
import AuthStore from '../../../stores/AuthStore';
import './MainLayout.scss';

/**
 * The main layout has the header, content and a footer.
 * It will be bound to the authstore to change the header upon login and logout
 */
class MainLayout extends React.Component {
    constructor() {
        super();

        this.state = this._getAuthState();
    }

    _getAuthState() {
        return {
            user: AuthStore.user
        }
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        AuthStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.changeListener);
    }

    _onChange() {
        this.setState(this._getAuthState());
    }

    render() {
        return (
            <div className="MainLayout">
                <HeaderSmall user={this.state.user} />

                <div className="MainLayout-Content">
                    {this.props.children}
                </div>

                <Footer />
            </div>
        );
    }
}

MainLayout.defaultProps = {

};

MainLayout.propTypes = {

};

export default MainLayout;
