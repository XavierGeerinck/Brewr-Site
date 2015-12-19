import fa from 'font-awesome/css/font-awesome.css';
import purecss from 'purecss/build/pure.css';
import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Panel from '../../elements/Panel';
import FlexContainer from '../../elements/FlexContainer';
import DashboardLayout from '../../layouts/DashboardLayout';
import CRUDList from '../../elements/CRUDList';
import cx from 'classnames';
import forms from 'newforms';

var FormObject = forms.Form.extend({
    input_project_name: forms.CharField({ label: "Project Name" }),
    input_maintainer: forms.CharField({ label: "Maintainer" }),
    input_workdir: forms.CharField({ label: "Workdir" }),
    input_user: forms.CharField({ label: "User" })
});

/**
 * Step 2: Install programs (example: git, gulp, nginx, MySQL, ...)
 *
 * The user should be able to specify RUN commands to install it's favorite tools
 */
const tooltipRunItems = "Specify the commands to install programs here, example: `sudo apt-get install git` or `sudo apt-get install nginx`";
const tooltipGeneral = "Here you can choose the general variables such as the maintainer, the working directory and the user to execute the environment.";

class Step2 extends React.Component {
    constructor(props) {
        super(props);
    }

    handleNextPage () {
        this._save();
        this.props.onClickNext();
    }

    handlePreviousPage() {
        this._save();
        this.props.onClickPrevious();
    }

    _save() {
        var form = this.refs.formObject.getForm();

        var stateChanges = {
            envInfo: {
                maintainer: form.data.input_maintainer,
                workdir: form.data.input_workdir,
                user: form.data.input_user,
                run: JSON.parse(JSON.stringify(this.refs.input_run_items.refs.child.getItems()))
            },
            meta: {
                name: form.data.input_project_name
            }
        };

        this.props.onSave(stateChanges);
    }

    render() {
        let dockerfile = this.props.imageParams.envInfo;
        let params = this.props.imageParams;

        let f = new FormObject({ initial: {
            input_project_name: this.props.imageParams.meta.name,
            input_maintainer: this.props.imageParams.envInfo.maintainer || "",
            input_workdir: this.props.imageParams.envInfo.workdir || "",
            input_user: this.props.imageParams.envInfo.user || ""
        }});

        return (
            <FlexContainer>
                {/* Maintainer, workdir and user */}
                <Panel heading="General" tooltip={tooltipGeneral}>
                    <form role="form">
                        <forms.RenderForm form={f} ref="formObject" />
                    </form>
                </Panel>

                {/* Run Items */}
                <Panel heading="Install Programs & Tools" tooltip={tooltipRunItems}>
                    <CRUDList items={dockerfile.run} ref="input_run_items"/>
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

Step2.defaultProps = {
    imageParams: {},
    onClickNext: function () {},
    onClickPrevious: function () {},
    onSave: function () {}
};

Step2.propTypes = {
    imageParams: PropTypes.object,
    onClickNext: PropTypes.func,
    onClickPrevious: PropTypes.func,
    onSave: PropTypes.func
};

export default Step2;
