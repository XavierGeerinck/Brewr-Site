import fa from 'font-awesome/css/font-awesome.css';
import React, { PropTypes } from 'react';
import FlexContainer from '../../elements/FlexContainer';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Panel from '../../elements/Panel';
import DashboardLayout from '../../layouts/DashboardLayout';
import DockerfileViewer from '../../elements/DockerfileViewer';
import cx from 'classnames';

class Step6 extends React.Component {
    handleFinish () {
        //this._save();
        this.props.onClickFinish();
    }

    handlePreviousPage() {
        this._save();
        this.props.onClickPrevious();
    }

    _save() {
        this.props.onSave();
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
                    <Button align="right" text=<span>Finish <i  className={cx(fa.fa, fa['fa-angle-right'])}/></span> color="Orange" isInline={true} onClick={this.handleFinish.bind(this)}/>
                </Panel>
            </FlexContainer>
        );
    }
}

Step6.defaultProps = {
    imageParams: {},
    onClickFinish: function () {},
    onClickPrevious: function () {},
    onSave: function () {}
};

Step6.propTypes = {
    imageParams: PropTypes.object,
    onClickFinish: PropTypes.func,
    onClickPrevious: PropTypes.func,
    onSave: PropTypes.func
};

export default Step6;
