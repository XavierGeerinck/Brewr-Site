import React from 'react';
import BaseComponent from '../../BaseComponent';


export default class AssignableMemberList extends BaseComponent {

  constructor() {
    super();
    this.state = {
      filteredMembers: this.props.members
    }
  }

  assignChange() {
    var self = this;
    this.state.filteredMembers = this.props.members.filter(function(member){
      return member.name.toLowerCase().indexOf(self.refs.assignUserName.value.toLowerCase()) >= 0;
    });
    self.forceUpdate();
  }

  render() {

    const members = this.state.filteredMembers;

    return (
      <form>
        <input ref="assignUserName" onChange={this.assignChange.bind(this)}/>
        <ul ref="assignUsers">
          {
            members.map(m => {
                return (
                  <li>
                    {m.name}
                  </li>
                )
              }
            )}
        </ul>
      </form>
    )
  }

}
