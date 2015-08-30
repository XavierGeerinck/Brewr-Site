import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import CRUDList from '../../elements/CRUDList';

var volumes = [
  "/data", "/logs"
];

class Step5 extends React.Component {
    handleSave () {
        var items = JSON.parse(JSON.stringify(this.refs.input_commands.refs.child.state.items));

        var data = {
            instructions: {
                $merge: {
                    volume: items
                }
            }
        }

        this.props.onClickNextPage(data);
    }

  render() {
    return (
      <div className="BuilderStep5Page">
        {/* Current Volumes */}
        <h1>Volumes</h1>
        <CRUDList items={volumes} ref="input_commands"/>

        {/* Next Button */}
        <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.handleSave.bind(this)}/>
        <div className="clear"></div>
      </div>
    );
  }
}

Step5.defaultProps = {
  onClickNextPage: PropTypes.func
};

Step5.propTypes = {
  onClickNextPage: function () {}
};

export default Step5;
