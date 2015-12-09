import React from 'react';
import BaseComponent from '../../BaseComponent';
import ProjectActions from '../../../actions/ProjectActions';
import styles from './AssignableMemberList.scss';
import Image from '../../elements/Image';
import cx from 'classnames';
import fa from 'font-awesome/css/font-awesome.css';

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
    var filteredMembers = this.state.members.filter(function (member) {
      return member.name.toLowerCase().indexOf(self.refs.assignUserName.value.toLowerCase()) >= 0;
    });
    this.setState({filteredMembers: filteredMembers});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({members: nextProps.members});
  }

  assign(id) {
    if (!this.isAssigned(id)) {
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
      <div id={styles.assignable_member_list}>
        <form>
          <input ref="assignUserName" onChange={this.assignChange.bind(this)}/>
        </form>
        <ul ref="assignUsers" ref="assignMember" className="assignable_list">
          {
            members.map(m => {
                return (
                  <li key={m.id} onClick={this.assign.bind(this, m.id)}>
                    <div>
                      {this.isAssigned(m.id) ? <span className={styles.user_assigned_overlay}><i className={cx(fa.fa, fa['fa-users'])}></i></span> : ''}
                      <Image src={m.avatar_url} defaultSrc={require('./avatar.png')}/>
                    </div>
                    <span className={styles.user_name}>{m.name}</span>
                  </li>
                )
              }
            )}
        </ul>
      </div>
    )
  }

}
