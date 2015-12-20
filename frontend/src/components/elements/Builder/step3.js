import fa from 'font-awesome/css/font-awesome.css';
import React, { PropTypes } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import DockerfileViewer from '../../elements/DockerfileViewer';
import FlexContainer from '../../elements/FlexContainer';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Panel from '../../elements/Panel';
//import {  Tooltip,  OverlayTrigger } from 'react-bootstrap';
import CRUDList from '../../elements/CRUDList';
import cx from 'classnames';

/**
 * Step 3: Upload files & Run commands for repository download & Directory syncing
 *
 * Allow the user to do several things:
 *      - Specify the files to add to it's environment + where to copy them: (pick file and type in a destination directory)
 *      - Specify the commands to download the repository (example: git clone http://.... <destinationfolder>)
 *      - Specify the directories local to sync to the fileserver (<local_dir>:<remote_dir>)
 */
//const tooltipRunItems = "Specify the commands to run and get the source code of your project, example: `git clone http://<giturl> <target_dir>`";
//const tooltipVolumeItems = "Specify the paths to synchronize in the format: `<local_dir>:<remote_dir>`, example: `/c/my_nginx.conf:/etc/nginx/nginx.conf`";
//const tooltipAddItems = "Upload files or specify existing files and choose where to copy them too (replace existing by default)";

class Step3 extends React.Component {
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
                sourceCode: JSON.parse(JSON.stringify(this.refs.input_run_items.refs.child.getItems())),
                volume: JSON.parse(JSON.stringify(this.refs.input_volume_items.refs.child.getItems())),
                add:  JSON.parse(JSON.stringify(this.refs.input_add_items.refs.child.getItems()))
            }
        };

        this.props.onSave(stateChanges);
    }

    render() {
        let dockerfile = this.props.imageParams.projectEnvInfo;

        return (
            <FlexContainer>
                {/* Specify the files to add to it's environment + where to copy them: (pick file and type in a destination directory) */}
                <Panel heading="Add Files">
                    <CRUDList items={dockerfile.add}
                        canUploadFile={true}
                        canPickLocalFile={true} t
                        extAddValue="Source Path"
                        addItemText="Copy local file"
                        ref="input_add_items" />
                </Panel>

                {/* Specify the commands to download the repository (example: git clone http://.... <destinationfolder>) */}
                <Panel heading="Download Source Code">
                    <CRUDList items={dockerfile.source_code} textAddValue="Command" ref="input_run_items"/>
                </Panel>

                {/* Specify the directories local to sync to the fileserver (<local_dir>:<remote_dir>) */}
                <Panel heading="Synchronise Directories">
                    <CRUDList items={dockerfile.volume} textAddValue="Directory" ref="input_volume_items"/>
                </Panel>

                {/* Buttons */}
                <Panel size="full">
                    {/* Previous Button */}
                    <Button align="left" text=<span><i  className={cx(fa.fa, fa['fa-angle-left'])}/> Previous</span> color="Orange" isInline={true} onClick={this.handlePreviousPage.bind(this)}/>

                    {/* Next Button */}
                    <Button align="right" text=<span>Next <i  className={cx(fa.fa, fa['fa-angle-right'])}/></span> color="Orange" isInline={true} onClick={this.handleNextPage.bind(this)}/>
                </Panel>
            </FlexContainer>
        );
    }
}

Step3.defaultProps = {
    imageParams: {},
    onClickNext: function () {},
    onClickPrevious: function () {},
    onSave: function () {}
};

Step3.propTypes = {
    imageParams: PropTypes.object,
    onClickNext: PropTypes.func,
    onClickPrevious: PropTypes.func,
    onSave: PropTypes.func
};

export default Step3;
