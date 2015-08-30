import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import CRUDList from '../../elements/CRUDList';

var files = [
  "/var/www:www", "/var/log:log"
];
class Step6 extends React.Component {
    handleSave () {
        var items = JSON.parse(JSON.stringify(this.refs.input_commands.refs.child.state.items));

        var data = {
            instructions: {
                $merge: {
                    add: items
                }
            }
        }

        this.props.onClickNextPage(data);
    }

  render() {
    return (
      <div className="BuilderStep6Page">
        {/* Current Volumes */}
        <h1>Files</h1>
        <CRUDList items={files} ref="input_commands"/>

        {/* Next Button */}
        <Button text=<span>Next <i  className="fa fa-angle-right"/></span> color="Orange" onClick={this.handleSave.bind(this)}/>
        <div className="clear"></div>
      </div>
      );
  }
}


Step6.defaultProps = {
  onClickNextPage: PropTypes.func
};

Step6.propTypes = {
  onClickNextPage: function () {}
};

export default Step6;
