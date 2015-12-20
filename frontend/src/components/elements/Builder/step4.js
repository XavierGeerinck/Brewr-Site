import fa from 'font-awesome/css/font-awesome.css';
import React, { PropTypes } from 'react';
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
        this.props.onClickNext();
    }

    handlePreviousPage() {
        this._save();
        this.props.onClickPrevious();
    }

    _save() {
        var stateChanges = {
            projectEnvInfo: {
                cmd: JSON.parse(JSON.stringify(this.refs.input_startup_command_items.refs.child.getItems()))
            }
        };

        this.props.onSave(stateChanges);
    }

    render() {
        let dockerfile = this.props.imageParams.projectEnvInfo;
console.log(dockerfile.cmd);
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
    imageParams: {},
    onClickNext: function () {},
    onClickPrevious: function () {},
    onSave: function () {}
};

Step4.propTypes = {
    imageParams: PropTypes.object,
    onClickNext: PropTypes.func,
    onClickPrevious: PropTypes.func,
    onSave: PropTypes.func
};

export default Step4;
