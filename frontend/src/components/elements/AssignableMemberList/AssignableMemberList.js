import React from 'react';
import BaseComponent from '../../BaseComponent';
import ProjectActions from '../../../actions/ProjectActions';

export default class AssignableMemberList extends BaseComponent {

  constructor() {
    super();
    this.state = {
      members: [], //members of organisation
      filteredMembers: []
    };
  }

  componentDidMount() {
    this.state.members = this.props.members;
    this.state.filteredMembers = this.props.members;
  }

  assignChange() {
    var self = this;
    var filteredMembers = this.state.members.filter(function(member){
      return member.name.toLowerCase().indexOf(self.refs.assignUserName.value.toLowerCase()) >= 0;
    });
    this.setState({filteredMembers: filteredMembers});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({members: nextProps.members});
  }

  assign(id) {
    if(!this.isAssigned(id)) {
      ProjectActions.assignMember(this.props.organisation, this.props.project.id, id);
    }
  }

  isAssigned(id) {
    return this.props.project.members.find((element, index, array) => {
      return element.id == id;
    });
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
                    {this.isAssigned(m.id) ? 'Assigned': ''}
                  </li>
                )
              }
            )}
        </ul>
      </form>
    )
  }

}
