import fa from 'font-awesome/css/font-awesome.css';
import React, { PropTypes } from 'react';
import FlexContainer from '../../elements/FlexContainer';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Panel from '../../elements/Panel';
import DashboardLayout from '../../layouts/DashboardLayout';
import DockerfileViewer from '../../elements/DockerfileViewer';
import BuilderActions from '../../../actions/BuilderActions';
import AuthStore from '../../../stores/AuthStore';
import cx from 'classnames';

class Step6 extends React.Component {
    handleNextPage () {
        BuilderActions.saveProject(AuthStore.token, AuthStore.selected_organisation.uuid, this.props.imageParams);
    }

    handlePreviousPage() {
        BuilderActions.previousPage();
    }

    render() {
        return (
            <FlexContainer>
                {/* Current Volumes */}
                <Panel heading="Finalize">
                    <DockerfileViewer dockerFileObject={this.props.imageParams} />
                </Panel>

                {/* Buttons */}
                <Panel size="full">
                    {/* Previous Button */}
                    <Button align="left" text=<span><i  className={cx(fa.fa, fa['fa-angle-left'])}/> Previous</span> color="Orange" isInline={true} onClick={this.handlePreviousPage.bind(this)}/>

                    {/* Next Button */}
                    <Button align="right" text=<span>Finish <i  className={cx(fa.fa, fa['fa-angle-right'])}/></span> color="Orange" isInline={true} onClick={this.handleNextPage.bind(this)}/>
                </Panel>
            </FlexContainer>
        );
    }
}

Step6.defaultProps = {
    imageParams: {}
};

Step6.propTypes = {
    imageParams: PropTypes.object
};

export default Step6;
