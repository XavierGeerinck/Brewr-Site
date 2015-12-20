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
        this.props.onClickNext();
    }

    handlePreviousPage() {
        this._save();
        this.props.onClickPrevious();
    }

    _save() {
        var stateChanges = {
            projectEnvInfo: {
                label: JSON.parse(JSON.stringify(this.refs.input_labels.refs.child.getItems())),
                expose: JSON.parse(JSON.stringify(this.refs.input_expose_items.refs.child.getItems())),
                env: JSON.parse(JSON.stringify(this.refs.input_env_items.refs.child.getItems()))
            }
        };

        this.props.onSave(stateChanges);
    }

    render() {
        let dockerfile = this.props.imageParams.projectEnvInfo;

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

Step5.defaultProps = {
    imageParams: {},
    onClickNext: function () {},
    onClickPrevious: function () {},
    onSave: function () {}
};

Step5.propTypes = {
    imageParams: PropTypes.object,
    onClickNext: PropTypes.func,
    onClickPrevious: PropTypes.func,
    onSave: PropTypes.func
};

export default Step5;
