import fa from 'font-awesome/css/font-awesome.css';
import React, { PropTypes } from 'react';
import BuilderActions from '../../../actions/BuilderActions';
import FlexContainer from '../../elements/FlexContainer';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Panel from '../../elements/Panel';
//import {  Tooltip,  OverlayTrigger } from 'react-bootstrap';
import CRUDList from '../../elements/CRUDList';
import cx from 'classnames';

/**
 * Step 4: Startup commands
 *
 * The commands to start the environment.
 * We will automatically migrate these to supervisord! so they should be by path and not by service.
 * Example: nginx -t and node /var/www/test/node.js (We will automatically pick the logging dirs, probably /var/log)
 */
//const tooltipStartupCommandItems = "Add the commands to be executed on the startup of the environment, example: first build the files, then run nginx as long running command";

class Step4 extends React.Component {
    handleNextPage () {
        this._save();
        BuilderActions.nextPage();
    }

    handlePreviousPage() {
        this._save();
        BuilderActions.previousPage();
    }

    _save() {
        if (this.refs.input_start_command_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_start_command_items.refs.child.getItems()));
            BuilderActions.changeCmdItems(items);
        }
    }

    render() {
        let dockerfile = this.props.imageParams.envInfo;

        return (
            <FlexContainer>
                {/* Startup Command Items */}
                <Panel heading="Environment Startup Commands">
                    <CRUDList items={dockerfile.cmd} textAddValue="Startup Command" ref="input_startup_command_items"/>
                </Panel>


                {/* Buttons */}
                <Panel size="full">
                    {/* Previous Button */}
                    <Button align="left" text=<span><i  className={cx(fa.fa, fa['fa-angle-left'])}/> Previous</span> color="Orange" isInline={true} onClick={this.handlePreviousPage.bind(this)}/>

                    {/* Next Button */}
                    <Button align="right" text=<span>Next <i  className={cx(fa.fa, fa['fa-angle-right'])}/></span> color="Orange" isInline={true} onClick={this.handleNextPage.bind(this)}/>
                </Panel>
            </FlexContainer>
        )
    }
}

Step4.defaultProps = {
    imageParams: {}
};

Step4.propTypes = {
    imageParams: PropTypes.object
};

export default Step4;
