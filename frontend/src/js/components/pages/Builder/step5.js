import React, { PropTypes } from 'react';
import BuilderStore from '../../../stores/BuilderStore';
import BuilderActions from '../../../actions/BuilderActions';
import FlexContainer from '../../elements/FlexContainer';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Panel from '../../elements/Panel';
import {  Tooltip,  OverlayTrigger } from 'react-bootstrap';
import CRUDList from '../../elements/CRUDList';

/**
 * Step 5: Ports to forward & Environment variables & Metadata
 *
 * - Allow for forwarding ports <localport>:<remoteport>
 * - Allow for environment variables <envvariable>=value
 * - Allow for metadata (see docker label, user, workdir, ...)
 */
class Step5 extends React.Component {
    handleNextPage () {
        this._save();
        BuilderActions.nextPage();
    }

    handlePreviousPage() {
        this._save();
        BuilderActions.previousPage();
    }

    _save() {
        if (this.refs.input_labels) {
            var items = JSON.parse(JSON.stringify(this.refs.input_labels.refs.child.state.items));
            BuilderActions.changeLabelItems(items);
        }

        if (this.refs.input_expose_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_expose_items.refs.child.state.items));
            BuilderActions.changeExposeItems(items);
        }

        if (this.refs.input_env_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_env_items.refs.child.state.items));
            BuilderActions.changeEnvItems(items);
        }
    }

    render() {
        var tooltipLabels = (
            <Tooltip>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Tooltip>
        );

        var tooltipEnvItems = (
            <Tooltip>
                "Specify environment variables that will be installed in the environment, format: key:value, example: ENVIRONMENT:production"
            </Tooltip>
        );

        let dockerfile = BuilderStore.dockerfile.instructions;

        return (
            <FlexContainer>
                {/* Labels */}
                <Panel heading="Labels" tooltip={tooltipLabels}>
                    <CRUDList items={dockerfile.label} ref="input_labels"/>
                </Panel>

                {/* Expose Items (Ports) */}
                <Panel heading="Ports">
                    <CRUDList items={dockerfile.expose} ref="input_expose_items"/>
                </Panel>

                {/* Environment Variables Items */}
                <Panel heading="Environment Variables" tooltip={tooltipEnvItems}>
                    <CRUDList items={dockerfile.env} ref="input_env_items"/>
                </Panel>

                {/* Buttons */}
                <Panel size="full">
                    {/* Previous Button */}
                    <Button align="left" text=<span><i  className="fa fa-angle-left"/> Previous</span> color="Orange" isInline={true} onClick={this.handlePreviousPage.bind(this)}/>

                    {/* Next Button */}
                    <Button align="right" text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" isInline={true} onClick={this.handleNextPage.bind(this)}/>
                </Panel>
            </FlexContainer>
        )
    }
}

export default Step5;
