import styles from './MemberList.scss';
import React, { PropTypes } from 'react';
import BaseComponent from '../../BaseComponent';
import cx from 'classnames';
import fa from 'font-awesome/css/font-awesome.css';
import ProjectActions from '../../../actions/ProjectActions';
import Image from '../../elements/Image';

export default class MemberList extends BaseComponent {

  //TODO: make project revision table component

  constructor() {
    super();
  }

  _removeMember(id) {
    ProjectActions.removeMember(this.props.organisation, this.props.project.id, id);
  }

  _promoteToManager(id) {
    ProjectActions.promoteToManager(this.props.organisation, this.props.project.id, id);
  }

  render() {

    const { members } = this.props;

    console.log(members);

    return (
      <ul id={styles.members}>
        {
          members.map((m, key) => {
            return (
              <li key={key}>
                <Image src={m.avatar_url} defaultSrc={require('./avatar.png')}/>
                <div>
                  <div className={styles.member_scope}>{m.scope}</div>
                  <div className={styles.member_name}>{m.name}</div>

                  <div className={styles.member_actions}>
                    <button onClick={this._promoteToManager.bind(this, m.id)} className={styles.member_action}><i className={cx(fa.fa, fa['fa-star-o'])}></i></button>
                    <button onClick={this._removeMember.bind(this, m.id)} className={styles.member_action}><i className={cx(fa.fa, fa['fa-remove'])}></i></button>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
    );
  }
}
