import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Panel from '../../elements/Panel';
import FlexContainer from '../../elements/FlexContainer';
import DashboardLayout from '../../layouts/DashboardLayout';
import BuilderActions from '../../../actions/BuilderActions';
import CRUDList from '../../elements/CRUDList';
import {  Tooltip,  OverlayTrigger } from 'react-bootstrap';
import BuilderStore from '../../../stores/BuilderStore';

/**
 * Step 2: Install programs (example: git, gulp, nginx, MySQL, ...)
 *
 * The user should be able to specify RUN commands to install it's favorite tools
 */
class Step2 extends React.Component {
    handleNextPage () {
        this._save();
        BuilderActions.nextPage();
    }

    handlePreviousPage() {
        this._save();
        BuilderActions.previousPage();
    }

    _save() {
        if (this.refs.input_maintainer) {
            BuilderActions.changeMaintainer(this.refs.input_maintainer.state.value);
        }

        if (this.refs.input_workdir) {
            BuilderActions.changeWorkdir(this.refs.input_workdir.state.value);
        }

        if (this.refs.input_user) {
            BuilderActions.changeUser(this.refs.input_user.state.value);
        }

        if (this.refs.input_labels) {
            var items = JSON.parse(JSON.stringify(this.refs.input_labels.refs.child.state.items));
            BuilderActions.changeLabelItems(items);
        }

        if (this.refs.input_run_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_run_items.refs.child.state.items));
            BuilderActions.changeRunItems(items);
        }

        if (this.refs.input_expose_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_expose_items.refs.child.state.items));
            BuilderActions.changeExposeItems(items);
        }

        if (this.refs.input_volume_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_volume_items.refs.child.state.items));
            BuilderActions.changeVolumeItems(items);
        }

        if (this.refs.input_add_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_add_items.refs.child.state.items));
            BuilderActions.changeAddItems(items);
        }

        if (this.refs.input_env_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_env_items.refs.child.state.items));
            BuilderActions.changeEnvItems(items);
        }

        if (this.refs.input_start_command_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_start_command_items.refs.child.state.items));
            BuilderActions.changeCmdItems(items);
        }
    }

    render() {
        var tooltipLabels = (
            <Tooltip>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Tooltip>
        );

        var tooltipRunItems = (
            <Tooltip>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Tooltip>
        );

        var tooltipVolumeItems = (
            <Tooltip>
                Specify the volumes where the data will be stored, you can use /path to let us choose a destination on the host and /hostpath:/containerpath to use an existing one.
            </Tooltip>
        );

        var tooltipAddItems = (
            <Tooltip>
                "Specify the files and where to copy them, format: src dest, example: config/nginx.conf /etc/nginx/nginx.conf"
            </Tooltip>
        );

        var tooltipEnvItems = (
            <Tooltip>
                "Specify environment variables that will be installed in the environment, format: key:value, example: ENVIRONMENT:production"
            </Tooltip>
        );

        var tooltipStartupCommandItems = (
            <Tooltip>
                "Add the commands to be executed on the startup of the environment, example: first build the files, then run nginx as long running command"
            </Tooltip>
        );

        let dockerfile = BuilderStore.dockerfile.instructions;

        return (
            <FlexContainer>
                {/* Maintainer, workdir and user */}
                <Panel heading="General">
                    <Input id="input_maintainer" text={dockerfile.maintainer} label="Maintainer" placeholder="Enter the maintainer for the project.." type="text" ref="input_maintainer" />
                    <Input id="input_workdir" text={dockerfile.workdir} label="Workdir" placeholder="Enter the directory where you will work from..." type="text" ref="input_workdir" />
                    <Input id="input_user" text={dockerfile.user} label="User" placeholder="Type a keyword..." type="text" ref="input_user" />
                </Panel>

                {/* Labels */}
                <Panel heading="Labels" tooltip={tooltipLabels}>
                    <CRUDList items={dockerfile.label} ref="input_labels"/>
                </Panel>

                {/* Run Items */}
                <Panel heading="Commands" tooltip={tooltipRunItems}>
                    <CRUDList items={dockerfile.run} ref="input_run_items"/>
                </Panel>

                {/* Expose Items (Ports) */}
                <Panel heading="Ports">
                    <CRUDList items={dockerfile.expose} ref="input_expose_items"/>
                </Panel>

                {/* Volume Items */}
                <Panel heading="Volumes" tooltip={tooltipVolumeItems}>
                    <CRUDList items={dockerfile.volume} ref="input_volume_items"/>
                </Panel>

                {/* Add Items */}
                <Panel heading="Add Files" overlay={tooltipAddItems}>
                    <CRUDList items={dockerfile.add} ref="input_add_items"/>
                </Panel>

                {/* Environment Variables Items */}
                <Panel heading="Environment Variables" tooltip={tooltipEnvItems}>
                    <CRUDList items={dockerfile.env} ref="input_env_items"/>
                </Panel>

                {/* Startup Command Items */}
                <Panel heading="Environment Startup Commands" tooltip={tooltipStartupCommandItems}>
                    <CRUDList items={dockerfile.cmd} ref="input_startup_command_items"/>
                </Panel>

                {/* Buttons */}
                <Panel size="full">
                    {/* Previous Button */}
                    <Button align="left" text=<span><i  className="fa fa-angle-left"/> Previous</span> color="Orange" isInline={true} onClick={this.handlePreviousPage.bind(this)}/>

                    {/* Next Button */}
                    <Button align="right" text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" isInline={true} onClick={this.handleNextPage.bind(this)}/>
                </Panel>
            </FlexContainer>
        );
    }
}

Step2.defaultProps = {
};

Step2.propTypes = {
};

export default Step2;
