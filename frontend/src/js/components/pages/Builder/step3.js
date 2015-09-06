import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import InlineContainer from '../../elements/InlineContainer';
import {  Tooltip,  OverlayTrigger } from 'react-bootstrap';
import DashboardLayout from '../../layouts/DashboardLayout';
import CRUDList from '../../elements/CRUDList';
import BuilderActions from '../../../actions/BuilderActions';
import BuilderStore from '../../../stores/BuilderStore';

export default class Step3 extends React.Component {
    handleSave () {
        if (this.refs.input_commands) {
            var items = JSON.parse(JSON.stringify(this.refs.input_commands.refs.child.state.items));
            BuilderActions.changeRunItems(items);
        }

        BuilderActions.nextPage();
    }

    render() {
        var tooltip = (
            <Tooltip>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Tooltip>
        );

        let dockerfile = BuilderStore.dockerfile.instructions;

        return (
            <div className="BuilderStep3Page">
                <h2>
                    Commands
                    <span className="BuilderPage-HelpIcon">
                        <OverlayTrigger overlay={tooltip} placement='right'><i  className="fa fa-question-circle"/></OverlayTrigger>
                    </span>
                </h2>
                <CRUDList items={dockerfile.run} ref="input_commands"/>

                {/* Next Button */}
                <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.handleSave.bind(this)}/>
                <div className="clear"></div>
            </div>
        );
    }
}

Step3.defaultProps = {
    onClickNextPage: PropTypes.func
};

Step3.propTypes = {
    onClickNextPage: function () {}
};
