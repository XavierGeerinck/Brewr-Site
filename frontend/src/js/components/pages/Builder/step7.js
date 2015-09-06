import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import CRUDList from '../../elements/CRUDList';
import {  Tooltip,  OverlayTrigger } from 'react-bootstrap';
import BuilderActions from '../../../actions/BuilderActions';
import BuilderStore from '../../../stores/BuilderStore';

class Step7 extends React.Component {
    handleSave () {
        if (this.refs.input_commands) {
            var items = JSON.parse(JSON.stringify(this.refs.input_commands.refs.child.state.items));
            BuilderActions.changeEnvItems(items);
        }

        BuilderActions.nextPage();
    }

    render() {
        let dockerfile = BuilderStore.dockerfile.instructions;
        var tooltip = (
            <Tooltip>
                "Specify environment variables that will be installed in the environment, format: key:value, example: ENVIRONMENT:production"
            </Tooltip>
        );

        return (
            <div className="BuilderStep7Page">
                {/* Current Volumes */}
                <h1>
                    Environment Variables
                    <span className="BuilderPage-HelpIcon">
                        <OverlayTrigger overlay={tooltip} placement='right'><i  className="fa fa-question-circle"/></OverlayTrigger>
                    </span>
                </h1>
                <CRUDList items={dockerfile.env} ref="input_commands"/>

                {/* Next Button */}
                <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.handleSave.bind(this)}/>
                <div className="clear"></div>
            </div>
        );
    }
}

Step7.defaultProps = {
    onClickNextPage: PropTypes.func
};

Step7.propTypes = {
    onClickNextPage: function () {}
};

export default Step7;
