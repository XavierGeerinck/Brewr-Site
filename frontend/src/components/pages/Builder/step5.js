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
 * Step 5: Ports to forward & Environment variables & Metadata
 *
 * - Allow for forwarding ports <localport>:<remoteport>
 * - Allow for environment variables <envvariable>=value
 * - Allow for metadata (see docker label, user, workdir, ...)
 */
//const tooltipLabels = "Set labels to identify your container <labelname>=<value>, example: com.brewr.io=somevalue";
//const tooltipEnvItems = "Specify environment variables that will be installed in the environment, format: key:value, example: ENVIRONMENT:production";
//const tooltipPorts = "Pick the ports to be forwarded to the local environment: <local_port>:<remote_port>, example: 80:80";

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
            var items = JSON.parse(JSON.stringify(this.refs.input_labels.refs.child.getItems()));
            BuilderActions.changeLabelItems(items);
        }

        if (this.refs.input_expose_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_expose_items.refs.child.getItems()));
            BuilderActions.changeExposeItems(items);
        }

        if (this.refs.input_env_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_env_items.refs.child.getItems()));
            BuilderActions.changeEnvItems(items);
        }
    }

    render() {
        let dockerfile = this.props.imageParams.envInfo;

        return (
            <FlexContainer>
                {/* Labels */}
                <Panel heading="Labels">
                    <CRUDList items={dockerfile.label} ref="input_labels"/>
                </Panel>

                {/* Expose Items (Ports) */}
                <Panel heading="Forward Ports">
                    <CRUDList items={dockerfile.expose} ref="input_expose_items"/>
                </Panel>

                {/* Environment Variables Items */}
                <Panel heading="Environment Variables">
                    <CRUDList items={dockerfile.env} ref="input_env_items"/>
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

export default Step5;
