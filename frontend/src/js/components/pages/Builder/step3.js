import React, { PropTypes } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import DockerfileViewer from '../../elements/DockerfileViewer';
import BuilderActions from '../../../actions/BuilderActions';
import BuilderStore from '../../../stores/BuilderStore';
import FlexContainer from '../../elements/FlexContainer';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Panel from '../../elements/Panel';
import {  Tooltip,  OverlayTrigger } from 'react-bootstrap';
import CRUDList from '../../elements/CRUDList';

/**
 * Step 3: Upload files & Run commands for repository download & Directory syncing
 *
 * Allow the user to do several things:
 *      - Specify the files to add to it's environment + where to copy them: (pick file and type in a destination directory)
 *      - Specify the commands to download the repository (example: git clone http://.... <destinationfolder>)
 *      - Specify the directories local to sync to the fileserver (<local_dir>:<remote_dir>)
 */
class Step3 extends React.Component {
    handleNextPage () {
        BuilderActions.nextPage();
    }

    handlePreviousPage() {
        BuilderActions.previousPage();
    }

    _save() {
        if (this.refs.input_run_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_run_items.refs.child.state.items));
            BuilderActions.changeRunItems(items);
        }

        if (this.refs.input_volume_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_volume_items.refs.child.state.items));
            BuilderActions.changeVolumeItems(items);
        }

        if (this.refs.input_add_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_add_items.refs.child.state.items));
            BuilderActions.changeAddItems(items);
        }
    }

    render() {
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

        let dockerfile = BuilderStore.dockerfile.instructions;

        return (
            <FlexContainer>
                {/* Specify the files to add to it's environment + where to copy them: (pick file and type in a destination directory) */}
                <Panel heading="Add Files" overlay={tooltipAddItems}>
                    <CRUDList items={dockerfile.add} ref="input_add_items"/>
                </Panel>

                {/* Specify the commands to download the repository (example: git clone http://.... <destinationfolder>) */}
                <Panel heading="Commands" tooltip={tooltipRunItems}>
                    <CRUDList items={dockerfile.run} ref="input_run_items"/>
                </Panel>

                {/* Specify the directories local to sync to the fileserver (<local_dir>:<remote_dir>) */}
                <Panel heading="Volumes" tooltip={tooltipVolumeItems}>
                    <CRUDList items={dockerfile.volume} ref="input_volume_items"/>
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

export default Step3;
