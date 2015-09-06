import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import CRUDList from '../../elements/CRUDList';
import BuilderActions from '../../../actions/BuilderActions';
import BuilderStore from '../../../stores/BuilderStore';

class Step4 extends React.Component {
    handleSave () {
        if (this.refs.input_commands) {
            var items = JSON.parse(JSON.stringify(this.refs.input_commands.refs.child.state.items));
            BuilderActions.changeExposeItems(items);
        }

        BuilderActions.nextPage();
    }

    render() {
        let dockerfile = BuilderStore.dockerfile.instructions;
        return (
            <div className="BuilderStep4Page">
                {/* Current Expose */}
                <h1>Ports</h1>
                <CRUDList items={dockerfile.expose} ref="input_commands"/>

                {/* Next Button */}
                <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.handleSave.bind(this)}/>
                <div className="clear"></div>
            </div>
        );
    }
}

Step4.defaultProps = {
    onClickNextPage: PropTypes.func
};

Step4.propTypes = {
    onClickNextPage: function () {}
};

export default Step4;
