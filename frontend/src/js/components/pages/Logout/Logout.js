import React from 'react/addons';
import AuthActions from '../../../actions/AuthActions';
import AuthStore from '../../../stores/AuthStore';

class LogoutPage extends React.Component {
    constructor(props) {
        super(props);

        AuthActions.logout(AuthStore.token);
        props.history.pushState(null, '/');
    }
}

export default LogoutPage;
