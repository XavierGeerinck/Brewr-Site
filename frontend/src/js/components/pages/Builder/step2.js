import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';

class Step2 extends React.Component {
  handleSave () {
    var data = {
        instructions: {
            $merge: {
                maintainer: this.refs.input_maintainer.state.value,
                workdir: this.refs.input_workdir.state.value,
                user: this.refs.input_user.state.value,
                label: this.refs.input_label.state.value
            }
        }
    }

    this.props.onClickNextPage(data);
  }

  render() {
    return (
      <div className="BuilderStep2Page">
        {/* Search docker */}
        <section className="BuilderStep2Page-Content">
          <form>
            <div className="flex-item" id="pick-settings">
              <Input id="input_maintainer" label="Maintainer" placeholder="Enter the maintainer for the project.." type="text" ref="input_maintainer" />
              <Input id="input_workdir" label="Workdir" placeholder="Enter the directory where you will work from..." type="text" ref="input_workdir" />
              <Input id="input_user" label="User" placeholder="Type a keyword..." type="text" ref="input_user" />
              <Input id="input_label" label="Label" placeholder="Type a keyword..." type="text" ref="input_label" />
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
  onClickNextPage: PropTypes.func
};

Step2.propTypes = {
  onClickNextPage: function () {}
};

export default Step2;
