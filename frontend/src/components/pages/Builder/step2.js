import fa from 'font-awesome/css/font-awesome.css';
import purecss from 'purecss/build/pure.css';
import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Panel from '../../elements/Panel';
import FlexContainer from '../../elements/FlexContainer';
import DashboardLayout from '../../layouts/DashboardLayout';
import BuilderActions from '../../../actions/BuilderActions';
import CRUDList from '../../elements/CRUDList';
import Form from '../../elements/Form';
import cx from 'classnames';

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

        if (this.refs.input_run_items) {
            var items = JSON.parse(JSON.stringify(this.refs.input_run_items.refs.child.getItems()));
            BuilderActions.changeRunItems(items);
        }

        if (this.refs.input_project_name) {
            BuilderActions.setProjectName(this.refs.input_project_name.state.value);
        }
    }

    render() {
        let dockerfile = this.props.imageParams.envInfo;
        let params = this.props.imageParams;

        return (
            <FlexContainer>
                {/* Maintainer, workdir and user */}
                <Panel heading="General" tooltip={tooltipGeneral}>
                    <Form className={cx(purecss['pure-form'], purecss['pure-form-stacked'])}>
                        <Input id="input_project_name" text={params.meta.name} label="Project Name" placeholder="Enter the name for the project" type="text" ref="input_project_name" />
                        <Input id="input_maintainer" text={dockerfile.maintainer} label="Maintainer" placeholder="Enter the maintainer for the project.." type="text" ref="input_maintainer" />
                        <Input id="input_workdir" text={dockerfile.workdir} label="Workdir" placeholder="Enter the directory where you will work from..." type="text" ref="input_workdir" />
                        <Input id="input_user" text={dockerfile.user} label="User" placeholder="Type a keyword..." type="text" ref="input_user" />
                    </Form>
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
};

Step2.propTypes = {
};

export default Step2;
