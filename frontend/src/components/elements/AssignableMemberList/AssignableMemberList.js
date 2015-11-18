import React from 'react';
import BaseComponent from '../../BaseComponent';
import ProjectActions from '../../../actions/ProjectActions';

export default class AssignableMemberList extends BaseComponent {

  constructor() {
    super();
    this.state = {
      members: [], //members of organisation
      project: {},
      organisation: {},
      filteredMembers: []
    };
  }

  componentDidMount() {

    this.state.project = this.props.project;
    this.state.organisation = this.props.organisation;

    // merge the project members array with members array
    for(let i = 0; i < this.props.members.length; i++) {
      this.state.members.push(this.props.members[i]);
      for(let j = 0; j < this.state.project.members.length; j++) {
        if(this.state.project.members[j].id == this.state.members[i].id) {
          this.state.members[i].assigned = true;
        }
      }
    }

    this.state.filteredMembers = this.state.members; //for initial declaration
  }

  assignChange() {
    var self = this;
    this.state.filteredMembers = this.state.members.filter(function(member){
      return member.name.toLowerCase().indexOf(self.refs.assignUserName.value.toLowerCase()) >= 0;
    });
    self.forceUpdate();
  }

  assign(id) {
    ProjectActions.assignMember(this.state.organisation, this.state.project.id, id);
  }

  render() {

    const members = this.state.filteredMembers;

    return (
      <form>
        <input ref="assignUserName" onChange={this.assignChange.bind(this)}/>
        <ul ref="assignUsers" ref="assignMember" className="assignable_list">
          {
            members.map(m => {
                return (

                  <li key={m.id} onClick={this.assign.bind(this, m.id)}>
                    {m.name}
                    {m.assigned ? 'Assigned': ''}
                  </li>
                )
              }
            )}
        </ul>
      </form>
    )
  }

}
