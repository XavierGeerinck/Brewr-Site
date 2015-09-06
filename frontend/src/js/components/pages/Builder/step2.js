import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import BuilderActions from '../../../actions/BuilderActions';
import CRUDList from '../../elements/CRUDList';
import {  Tooltip,  OverlayTrigger } from 'react-bootstrap';
import BuilderStore from '../../../stores/BuilderStore';

class Step2 extends React.Component {
    handleSave () {
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

        BuilderActions.nextPage();
    }

    render() {
        var tooltip = (
            <Tooltip>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Tooltip>
        );

        let dockerfile = BuilderStore.dockerfile.instructions;

        return (

            <div className="BuilderStep2Page">
                {/* Search docker */}
                <section className="BuilderStep2Page-Content">
                    <form>
                        <div className="flex-item" id="pick-settings">
                            <Input id="input_maintainer" text={dockerfile.maintainer} label="Maintainer" placeholder="Enter the maintainer for the project.." type="text" ref="input_maintainer" />
                            <Input id="input_workdir" text={dockerfile.workdir} label="Workdir" placeholder="Enter the directory where you will work from..." type="text" ref="input_workdir" />
                            <Input id="input_user" text={dockerfile.user} label="User" placeholder="Type a keyword..." type="text" ref="input_user" />
                            <h2>
                                Labels
                                <span className="BuilderPage-HelpIcon">
                                    <OverlayTrigger overlay={tooltip} placement='right'><i  className="fa fa-question-circle"/></OverlayTrigger>
                                </span>
                            </h2>
                            <CRUDList items={dockerfile.label} ref="input_labels"/>
                        </div>
                    </form>
                </section>

                {/* Next Button */}
                <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.handleSave.bind(this)}/>
                <div className="clear"></div>
            </div>
        );
    }
}

Step2.defaultProps = {
};

Step2.propTypes = {
};

export default Step2;
