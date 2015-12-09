import React, { PropTypes } from 'react';
import BaseComponent from '../../BaseComponent';
import cx from 'classnames';
import fa from 'font-awesome/css/font-awesome.css';

export default class MemberList extends BaseComponent {

  //TODO: make project revision table component

  constructor() {
    super();
  }

  render() {

    const { members } = this.props;

    return (
      <ul>
        {
          members.map(m => {
            return (
              <li key={"img_" + m.id}>
                <Image src={m.avatar_url} defaultSrc={require('./avatar.png')}/>
                <div>
                  <div>{m.name}</div>
                  <div>{m.scope}</div>
                </div>
                <button onClick={this._removeMember.bind(this, m.id)}><i className={cx(fa.fa, fa['fa-remove'])}></i>
                </button>
                <button onClick={this._promoteToManager.bind(this, m.id)}><i
                  className={cx(fa.fa, fa['fa-promote'])}></i> Promote
                </button>
              </li>
            )
          })
        }
      </ul>
    );
  }
}
MemberList.propTypes = {
  organisation: PropTypes.Object
};
MemberList.defaultProps = {
  organisation: {}
};
